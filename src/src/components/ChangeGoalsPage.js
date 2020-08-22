import React from 'react';
import FilterExpansionsModule from './FilterExpansionsModule';
import TableModule from './TableModule';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SimpleModal from './SimpleModal';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ChangeGoalsModuleQuantities from './ChangeGoalsModuleQuantities'
import ChangeGoalsModulePercentages from './ChangeGoalsModulePercentages'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    header: {
        color: "#59bf8e",
        fontFamily: 'Karla, sans-serif',
        alignContent: 'center'
    },
    instructions: {
        color: '#3e8563',
        fontFamily: 'Karla, sans-serif',
        textAlign: 'center',
        paddingRight: '5vw',
        paddingLeft: '5vw'
    },
    formOp: {
    },
    formOpLabel: {
        textAlign: 'center',
        color: "#4CA279",
        fontFamily: 'Karla, sans-serif',
    },
    radio: {
        color: "#4CA279",
        textAlign: 'center'
    },
    instructionsPaper: {
        marginRight: '25vw', 
        marginLeft: '25vw',  
        marginBottom: '2%',
        paddingBottom: '2vh',
        border: 'solid',
        borderColor: '#59bf8e'
    },
    goalsPaper: {
        marginRight: '5vw',
        marginLeft: '5vw',
        border: 'solid',
        borderColor: '#59bf8e'
    },
    radioGroup: {
        alignItems: 'center',
        paddingLeft: '5vw',
        paddingRight: '2vw'
    },
    button: {
        marginBottom: 'vh',
        width: '20vw',
        fontFamily: 'Karla, sans-serif',
        fontSize: '1em',
        color: 'white',
        border: 'solid',
        borderStyle: 'solid',
        borderColor: '#d9f495',
    }
})

export default withStyles(styles)(class ChangeGoalsPage extends React.Component {

    // todo change order and add note about equation
    state = {
        calGoal: this.props.match.params.calorie_goal,
        proGoal: this.props.match.params.protein_goal,
        fatsGoal: this.props.match.params.fats_goal,
        carbsGoal: this.props.match.params.carbs_goal,
        id: this.props.match.params.id,
        verified: false,
        inputOption: "op1"
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

    validate = async () => {
        console.log(this.state.calGoal + " " + this.state.proGoal + " " + this.state.carbsGoal + " " + this.state.fatsGoal);
        
        // checks to see if there are percent signs tacked onto the values


        let result;

        await axios.post(
            '/api/change_nutrition_goals',
            {
                user_id: this.state.id, 
                new_calorie_goal: this.state.calGoal,
                new_protein_goal: this.state.proGoal,
                new_carbs_goal: this.state.carbsGoal,
                new_fats_goal: this.state.fatsGoal,
                input_option: this.state.inputOption
            },
            {
                headers: {'Content-type': 'application/json'}
            }
        ).then((data) => {
            console.log(data);
            result = data['data'];

            let success;
            if (result === true) success = true;
            else success = false;
            console.log(success)
            let msg;
            if (!success) msg = result[1];

            if (success) {
                this.setState({verified: success}, () => {
                    this.props.history.push("/verified/" + this.state.verified);
                    console.log("/verified/" + this.state.verified);
                })
            }
            else {
                alert('Valid values only! - ' + msg);
            }
        })        
    }

    handleProteinChange = (quantity) => {
        this.setState({proGoal: quantity});
    }

    handleFatsChange = (quantity) => {
        this.setState({fatsGoal: quantity});
    }

    handleCarbsChange = (quantity) => {
        this.setState({carbsGoal: quantity});
    }

    handleCalChange = (quantity) => {
        this.setState({calGoal: quantity});
    }

    handleFormChange = (e) => {
        this.setState({inputOption: e.target.value})
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container justify="center" alignContent="center" alignItems="center" className={classes.header}>
                    <h1 style={{alignItems: "center"}}>Change your goals below!</h1>
                </Grid>
                <Paper className={classes.instructionsPaper}>
                    <Grid container justify="center" >
                        <FormControl component="fieldset" >
                            <Grid item container alignItems="center">
                                <FormLabel component="legend" className={classes.instructions}><h3>Please select one of the following options for input:</h3></FormLabel>
                            </Grid>
                            <Grid item container alignItems="center">
                                <RadioGroup
                                    value={this.state.inputOption}
                                    onChange={this.handleFormChange}
                                    classes={{root: classes.radioGroup}}
                                >
                                    <FormControlLabel classes={{root: classes.formOp}} value="op1" control={<Radio color="secondary" classes={{root: classes.radio}}/> } label={<div className={classes.formOpLabel} >Input daily protein, carbohydrate, and fat goals</div>} />
                                    <FormControlLabel classes={{root: classes.formOp}} value="op2" control={<Radio classes={{root: classes.radio}}/>} label={<div className={classes.formOpLabel} >Input daily caloric goal and macronutrient breakdown</div>} />
                                </RadioGroup>
                            </Grid>
                        </FormControl>
                    </Grid>
                </Paper>
                <Paper className={classes.goalsPaper}>
                    {this.state.inputOption === "op1" && <ChangeGoalsModuleQuantities
                        proteinGoal={this.props.match.params.protein_goal}
                        carbsGoal={this.props.match.params.carbs_goal}
                        fatsGoal={this.props.match.params.fats_goal}
                        calGoal={this.props.match.params.calorie_goal}
                        onProChange={this.handleProteinChange}
                        onCarbsChange={this.handleCarbsChange}
                        onFatsChange={this.handleFatsChange}
                        onCalChange={this.handleCalChange}
                    />}
                    {this.state.inputOption === "op2" && <ChangeGoalsModulePercentages 
                        proteinGoal={this.props.match.params.protein_goal}
                        carbsGoal={this.props.match.params.carbs_goal}
                        fatsGoal={this.props.match.params.fats_goal}
                        calGoal={this.props.match.params.calorie_goal}
                        onProChange={this.handleProteinChange}
                        onCarbsChange={this.handleCarbsChange}
                        onFatsChange={this.handleFatsChange}
                        onCalChange={this.handleCalChange}
                    />}
                    <Grid container justify="center" style={{padding: 20}} alignItems="center">
                        <Button variant="contained" color="primary" className={classes.button} onClick={() => this.validate()}>Submit Changes!</Button>
                    </Grid>
                </Paper>
            </div>
        );
    }
})
