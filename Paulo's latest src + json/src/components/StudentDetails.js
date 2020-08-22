import React from 'react';
import PersonTile from './PersonTile';
import Profile from './Profile';
import Traits from './Traits';
import Goals from './Goals';


export default class StudentDetails extends React.Component {

    //   <PersonTile />
    render () {

        // May not need td - they say I need div
        // TODO: Get actual Props from somewhere, including the image for PersonTile
        return (
            <div>
            <table border = "3" cellSpacing = "60">
                <td><PersonTile /> </td>
                <td><Profile 
                    name="Jamie Mercurio" 
                    class="2020" 
                    team="Boi's Basketball" 
                /> </td>
                <td><Traits
                    height="6'4"
                    age="21"
                    weight= "145"
                    goalWeight = "250"
                /> </td>
                <td><Goals 
                    calIntake="1400" calGoal="2000" 
                    proteinIntake="45" proteinGoal="140"
                    carbIntake="100" carbGoal="200"
                    fatIntake="30" fatGoal="100"
                /> </td>
            </table>
            </div>
        );
    }
}