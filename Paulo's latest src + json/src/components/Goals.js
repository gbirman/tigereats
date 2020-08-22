import React from 'react';
import Button from '@material-ui/core/Button';
import CalBar from './images/CalBar.png';
import { NavLink } from 'react-router-dom';

export default class Goals extends React.Component {

    // Add actual goal data and adjust bars accordingly
    render() {

        return(
            <div>
            
            <table align = "left">
            <tr>
                <td><h3>Daily Goals</h3></td>
            </tr>

            <tr>
                <td><Button variant="contained" color="primary">Change Goals</Button></td>
                <td><NavLink to="/progress" style={{textDecoration: 'none'}}><Button variant="contained" color="primary">See Progress</Button></NavLink></td>
            </tr>

            <tr align = "left">
                <td> Calories: {this.props.calIntake} / {this.props.calGoal}</td>
                <td align="left"><img src={CalBar} width = "120" height = "20" alt="Calories" /></td>
            </tr>

            <tr align = "left">
                <td> Protein: {this.props.proteinIntake} / {this.props.proteinGoal}g</td>
                <td align="left"><img src={CalBar} width = "60" height = "20" alt="Protein" /></td>
            </tr>

            <tr align = "left">
                <td> Carbs: {this.props.carbIntake} / {this.props.carbGoal}g</td>
                <td align="left"><img src={CalBar} width = "100" height = "20" alt="Carbs" /></td>
            </tr>
            
            <tr align = "left">
                <td> Fat: {this.props.fatIntake} / {this.props.fatGoal}g</td>
                <td align="left"><img src={CalBar} width = "60" height = "20" alt="Fat" /></td>
            </tr>
    
    
            
            </table>
            </div>
        );

    }


}