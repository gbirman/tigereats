import React from 'react';
import FilterExpansionsModule from './FilterExpansionsModule';
import TableModule from './TableModule';
import axios from 'axios';
import {Router, Route, Link, NavLink } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SimpleModal from './SimpleModal';

export default class ChangeGoalsPage extends React.Component {

    // todo change order and add note about equation
    state = {
        calGoal: this.props.match.params.calorie_goal,
        proGoal: this.props.match.params.protein_goal,
        fatsGoal: this.props.match.params.fats_goal,
        carbsGoal: this.props.match.params.carbs_goal,
        id: this.props.match.params.id,
        verified: false,
        showError: false
    };

    validate = () => {
        console.log(this.state.calGoal + " " + this.state.proGoal + " " + this.state.fatsGoal + " " + this.state.carbsGoal);
        
        let result;

        axios.post(
            'http://127.0.0.1:5000/api/change_nutrition_goals',
            {
                user_id: this.state.id, 
                new_calorie_goal: this.state.calGoal,
                new_protein_goal: this.state.proGoal,
                new_carbs_goal: this.state.carbsGoal,
                new_fats_goal: this.state.fatsGoal
            },
            {
                headers: {'Content-type': 'application/json'}
            }
        ).then((data) => {
            console.log(data);
            result = data['data'];

            if (result) {
                this.setState({verified: result}, () => {
                    this.props.history.push("/verified/" + this.state.verified);
                    console.log("/verified/" + this.state.verified);
                })
            }
            else {
                alert('Valid values only!');
            }
        })        
    }

    handleCalChange = (e) => {
        this.setState({calGoal: e.target.value});
        console.log(e.target.value);
    }

    handleProChange = (e) => {
        this.setState({proGoal: e.target.value});
    }

    handleFatsChange = (e) => {
        this.setState({fatsGoal: e.target.value});
    }

    handleCarbsChange = (e) => {
        this.setState({carbsGoal: e.target.value});
    }

    render() {
        return (
            <div>
                
                <Paper style={{marginRight: '10%', marginLeft: '10%'}}>
                    <Grid container justify="center">
                        <h1>Change your goals below!</h1>
                    </Grid>
                </Paper>
                <Paper style={{marginRight: '30%', marginLeft: '30%', marginTop: '2%', marginBottom: '2%'}}>
                    <Grid container justify="center">
                        <p align="center">Totals must follow the following equality: <br />Calories = 4 * Protein + 4 * Carbs + 9 * Fat</p>
                    </Grid>
                </Paper>
                <Paper style={{marginRight: '5%', marginLeft: '5%'}}>
                    <Grid container justify="center" alignItems="center">
                        <h2>Current Goals:</h2>
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <Grid item style={{textAlign: "center"}} xs={3}><u>Calories / Day</u></Grid>
                        <Grid item style={{textAlign: "center"}} xs={3}><u>Protein / Day</u></Grid>
                        <Grid item style={{textAlign: "center"}} xs={3}><u>Carbs / Day</u></Grid>
                        <Grid item style={{textAlign: "center"}} xs={3}><u>Fats / Day</u></Grid>
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <Grid item style={{textAlign: "center"}} xs={3}>{this.props.match.params.calorie_goal}</Grid>
                        <Grid item style={{textAlign: "center"}} xs={3}>{this.props.match.params.protein_goal}</Grid>
                        <Grid item style={{textAlign: "center"}} xs={3}>{this.props.match.params.carbs_goal}</Grid>
                        <Grid item style={{textAlign: "center"}} xs={3}>{this.props.match.params.fats_goal}</Grid>
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <h2>New Goals:</h2>
                    </Grid>
                    <Grid container justify="space-around" alignItems="center">
                        <Grid item style={{textAlign: "center"}} xs={3}><u>Calories / Day</u></Grid>
                        <Grid item style={{textAlign: "center"}} xs={3}><u>Protein / Day</u></Grid>
                        <Grid item style={{textAlign: "center"}} xs={3}><u>Carbs / Day</u></Grid>
                        <Grid item style={{textAlign: "center"}} xs={3}><u>Fats / Day</u></Grid>
                    </Grid>
                    <Grid container justify="center" alignItems="center" style={{padding: 20}}>
                        <Grid item style={{textAlign: "center"}} xs={3}><Input placeholder={this.props.match.params.calorie_goal} onKeyUp={this.handleCalChange}/></Grid>
                        <Grid item style={{textAlign: "center"}} xs={3}><Input placeholder={this.props.match.params.protein_goal} onKeyUp={this.handleProChange}/></Grid>
                        <Grid item style={{textAlign: "center"}} xs={3}><Input placeholder={this.props.match.params.carbs_goal} onKeyUp={this.handleCarbsChange}/></Grid>
                        <Grid item style={{textAlign: "center"}} xs={3}><Input placeholder={this.props.match.params.fats_goal} onKeyUp={this.handleFatsChange}/></Grid>
                    </Grid>
                    <Grid container justify="center" style={{padding: 20}} alignItems="center">
                        <Button variant="contained" color="primary" onClick={() => this.validate()}>Submit Changes!</Button>
                    </Grid>
                </Paper>
            </div>
        );
    }
}
