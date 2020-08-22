import React from 'react';
import FilterExpansionsModule from './FilterExpansionsModule';
import TableModule from './TableModule';
import {BrowserRouter, Route, Switch, Redirect, withRouter} from 'react-router-dom';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


const styles = theme => ({
    table: {
        overflowX: 'auto', 
        marginTop: '5vh',
        marginRight: '2vh',
        marginLeft: '2vh',
        border: 'solid',
        borderColor: '#59bf8e',
    },
    personIcon: {
        color: "#59BF8E",
        marginRight: '2vh'
    },
    searchField: {
        color: '#4CA279',
        fontFamily: 'Karla, sans-serif',
    },
    searchFieldLabel: {
        color: '#4CA279',
        fontFamily: 'Karla, sans-serif',
    },
    searchUnderline: {
        color: 'red !important'
    },
    blurb: {
        color: "#4CA279",
        fontFamily: 'Karla, sans-serif',
        marginRight: '2vw',
    //    marginTop: '30px'
    },
    radio: {
        color: "#4CA279",
    //    marginTop: '15px'
    },
    formOpLabel: {
        color: "#59bf8e",
        fontFamily: 'Karla, sans-serif',
    //    marginTop: '15px'
    },
    unit: {
        marginTop: '30px'
    }

})

export default withRouter(withStyles(styles)(class DashboardPage extends React.Component {

    state = {
        restrictions: {name: ""},
        data: [],
        valid: false
       // listOption: 'all'
    };

    componentWillMount() {
        axios.get(
            '/api/user_role',
            {
                headers: {'Content-type': 'application/json'}
            }
        ).then((data) => {
            const result = data['data'];
            if (!result) {
                this.props.history.push("/error");
            }
            /*else {
                this.props.history.push("/error")
            } */
        })
    }

    getUsers = async () => {
        await axios.get(
            '/api/getUsers',
            {
                params: {
                    restrictions: this.state.restrictions,
                }
            },
            {
                headers: {'Content-type': 'application/json'}
            }
        ).then((data) => {
            let details = data['data'];
            details.map((n) => {
                const full_name = n.firstname + " " + n.lastname;
                n['fullname'] = full_name;
            });
            this.setState({data: data['data']});
        })}
    
    handleWatchChange = (id, inList) => {
        console.log(id + " " + inList);
        axios.post(
            '/api/change_watchlist',
            {
                user_id: id, 
                watchlist_status: !inList // TODO: This is flipped!!!
            },
            {
                headers: {'Content-type': 'application/json'}
            }
        ).then((data) => {
            // console.log("Add to Watch List:" + data);
            const result = data['data'];
            console.log(result)

            if (!result) {
                console.log("It didn't work!");
            }
            else {
                /// alert("Added to Watch List"); // get rid of this later   
            }

            this.getUsers();
        })   
    }

    handleSearchChange = (e) => {
        let rest = this.state.restrictions;

        rest['name'] = e.target.value;

        this.setState({restrictions: rest});

        this.getUsers();
    }

    handleFilterRequest = (field, value) => {
        let rest = this.state.restrictions;
        

        // value is in restrictions, so removes it, and potentially field too
        if (field in rest && rest[field].includes(value)) {
            const index = rest[field].indexOf(value);
            rest[field].splice(index, 1);

            if (rest[field].length === 0) {
                delete rest[field];
            }
        }
        

        // value is not in restrictions, so adds it
        else if (field in rest && !rest[field].includes(value)) {
            rest[field].push(value);
        }

        // field isn't in restrictions, so adds it and value
        else {
            rest[field] = [value];
        }
        console.log(rest);

        this.setState({
            restrictions: rest
        });

        this.getUsers();
    } 

    handleListChange = (e) => {
        const val = e.target.value;
        console.log(val);
        let rest = this.state.restrictions;

        if (val === 'watchlist') {
            rest['watchlist'] = true;
        }

        else {
            delete rest['watchlist'];
        }
        this.setState({restrictions: rest});

        this.getUsers();
    }


    render() {
        const {classes} = this.props;
        return (
            <div>
                <FilterExpansionsModule 
                    onFilter={this.handleFilterRequest}
                />
                <Paper className={classes.table}>
                    <Toolbar>
                        <Grid container xs={12} sm={6} item alignItems="center" className={classes.unit}>
                            <h3 className={classes.blurb}>Select user list:</h3>
                            <RadioGroup 
                                row={true} 
                                style={{display: 'flex', flexDirection: 'row'}}
                                value={this.state.restrictions['watchlist'] ? 'watchlist' : 'all'}
                                onChange={this.handleListChange}
                                >
                                <FormControlLabel value="all" label={<div className={classes.formOpLabel}>All Users</div>} control={<Radio color="secondary" classes={{root: classes.radio}}/>}/>
                                <FormControlLabel value="watchlist" label={<div className={classes.formOpLabel}>Watchlist</div>} control={<Radio color="secondary" classes={{root: classes.radio}}/>}/>
                            </RadioGroup>
                        </Grid>
                        <Grid container xs={12} sm={6} item justify="flex-end" alignItems="flex-end">
                            <Grid item><AccountCircle className={classes.personIcon}/></Grid>
                            <Grid item><TextField InputLabelProps={{classes: {root: classes.searchFieldLabel}}} InputProps={{classes: {input: classes.searchField, underline: classes.searchUnderline}}} className={classes.searchField} id="input-with-icon-grid" label="Search for students..." onKeyUp={this.handleSearchChange}/></Grid>
                        </Grid>
                        
                    </Toolbar>
                    <TableModule 
                        restrictions={this.state.restrictions}
                        getUsers={this.getUsers}
                        data={this.state.data}
                        onWatchChange={this.handleWatchChange}
                    />
                </Paper>
            </div>
        );
    }
}))