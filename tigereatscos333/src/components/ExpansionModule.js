import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Chip from '@material-ui/core/Chip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// ON QUERY, SEND BACK LIST OF PARAMS FOR EACH FIELD THAT CAN BE INCLUDED, AS OPPOSED THAT CANT BE

const styles = theme => ({
    chip: {
        fontFamily: 'Karla, sans-serif',
        backgroundColor: '#59bf8e',
        color: 'white',
        border: 'solid', //#d9f495
        borderColor: '#d9f495',
        '&:hover': {
            background: "#3e8563"
        }
    },
    panel: {
        border: 'solid',
        borderColor: '#59bf8e',
        color: '#4CA279',
        fontFamily: 'Karla, sans-serif'
    },
    icon: {
        color: '#4CA279'
    }

})

export default withStyles(styles)(class ExpansionModule extends React.Component {
    state = {
        options: [],
        queryParams: [],
        clickedChips: [],
        label: undefined
    };

    componentDidMount() {
        let ops = [];
        let label;

        // take the prop giving the criteria, query the db for all the unique values of that variable, 
        // and put them in a sorted array
        if (this.props.criteria === 'gender') {
            ops = ['M', 'F'];
            label = "Gender";
            /* ops = axios.get(
                '/api/get_user_gender',
                {
                    userId: 'gender'
                },
                {
                    headers: {'Content-type': 'application/json'}
                }
            ).then((response) => {console.log(response)}).catch((response) => {console.log(response)}); */
        }
        else if (this.props.criteria === 'team') {
            ops = ['Soccer', 'Football', 'Basketball'];
            label = "Team";
            /*ops = axios.get(
                '/api/get_user_team',
                {
                    userId: 'team'
                },
                {
                    headers: {'Content-type': 'application/json'}
                }
            ).then((response) => {console.log(response)}).catch((response) => {console.log(response)}); */
        }
        else if (this.props.criteria === 'year') {
            ops = [2019, 2020, 2021, 2022];
            label = "Class Year";
            /*ops = axios.get(
                '/api/get_user_year',
                {
                    userId: 'year'
                },
                {
                    headers: {'Content-type': 'application/json'}
                }
            ).then((response) => {console.log(response)}).catch((response) => {console.log(response)}); */
        }

        // set clicked array
        let bools = [];
        let op;
        for (op in ops) bools.push(true);

        this.setState(() => ({
            options: ops,
            queryParams: ops,
            clickedChips: bools,
            label: label
        }));
    }

    handleChipClick = (option, criteria) => {
        const index = this.state.options.indexOf(option);

        const newBools = this.state.clickedChips.slice();
        newBools[index] = !this.state.clickedChips[index];

        this.setState(() => ({
            clickedChips: newBools
        }))

        console.log(criteria + " " + option);

        this.props.onFilter(criteria, option);
    };

    render() {
        const {classes} = this.props;

        return (
            <ExpansionPanel className={classes.panel} style={{borderRadius: '5px'}}>
                <ExpansionPanelSummary classes={{expandIcon: classes.icon}} expandIcon={<ExpandMoreIcon />}>
                    {this.state.label}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        {
                            this.state.options.map((option) => {
                                const index = this.state.options.indexOf(option);
                                const clicked = this.state.clickedChips[index];
                                 return <Chip className={classes.chip} label={option} color="primary" criteria={this.props.criteria} icon={clicked ? <DoneIcon /> : <CloseIcon />} clickable
                                            onClick={(e) => {this.handleChipClick(option, this.props.criteria)}} />;
                        })
                        }
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>  
        );
    }
})