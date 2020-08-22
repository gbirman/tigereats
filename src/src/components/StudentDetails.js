import React from 'react';
import PersonTile from './PersonTile';
import Profile from './Profile';
import Traits from './Traits';
import Goals from './Goals';
import Grid from '@material-ui/core/Grid';

export default class StudentDetails extends React.Component {

    /* Old table code
          <div>
            <table border = "3" cellSpacing = "60">
                <td><PersonTile /> </td>
                <td><Profile 
                    name={this.props.fullName}
                    class={this.props.userInfo[12]} 
                    team={this.props.userInfo[13]} 
                /> </td>
                <td><Traits
                    height={this.props.userInfo[4]}
                    age="21"
                    weight= {this.props.userInfo[5]} 
                    goalWeight = {this.props.userInfo[10]} 
                /> </td>
                <td><Goals 
                    user_id = {this.props.user_id}
                    calIntake="1400" calGoal={this.props.userInfo[7]} 
                    proteinIntake="45" proteinGoal={this.props.userInfo[8]} 
                    carbIntake="100" carbGoal={this.props.userInfo[9]} 
                    fatIntake="30" fatGoal={this.props.userInfo[10]} 
                /> </td>
            </table>
            </div>

                                <Grid item>
                        <Traits
                        height={this.props.userInfo[4]}
                        age="21"
                        weight= {this.props.userInfo[5]} 
                        goalWeight = {this.props.userInfo[11]} 
                        /> 
                    </Grid>



    */
    


    render () {
        let defaultMeal = [ // fixes rerendering issue where certain meals weren't defined yet, addresses non-logged meals
        {
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0
        },
        {
            "MEAL NOT ": "LOGGED"
        }

    ];
      
    // console.log("Student details watchlist status: " + this.props.userInfo[14]); // Debugging
        // May not need td - they say I need div
        // TODO: Get actual Props from somewhere, including the image for PersonTile
        return (
            <div>

                <Grid 
                container
                direction="row"
                justify="space-evenly"
                alignItems="stretch"
                spacing = {32}
                >
                    <Grid item>
                        <PersonTile 
                        name={this.props.fullName}
                        email = {this.props.userInfo[0]}
                        _id = {this.props.user_id}
                        initial_watchlist_status = {this.props.userInfo[14]}
                        />
                    </Grid>

                    <Grid item>
                        <Profile 
                        
                        class={this.props.userInfo[12]} 
                        team={this.props.userInfo[13]} 
                        height={this.props.userInfo[4]}
                        age="21"
                        weight= {this.props.userInfo[5]} 
                        goalWeight = {this.props.userInfo[11]}
                        /> 
                    </Grid>

                    <Grid item>
                        <Goals 
                        fullname = {this.props.fullName}
                        _id = {this.props.user_id}
                        calIntake="1400"   calorie_goal={this.props.userInfo[7]} 
                        proteinIntake="45" protein_goal={this.props.userInfo[8]} 
                        fatIntake="30"     fats_goal={this.props.userInfo[9]}
                        carbIntake="100"  carbs_goal={this.props.userInfo[10]}
                        todayNutrients = {this.props.dayInfo[0] ? this.props.dayInfo[0] : defaultMeal}
                        /> 
                    </Grid>

                </Grid>

            </div>
        );
    }
}