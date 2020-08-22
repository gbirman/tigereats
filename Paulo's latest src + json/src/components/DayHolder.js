import React from 'react';
import DayDetails from './DayDetails';
import MealBreakfast from './MealBreakfast';
import MealLunch from './MealLunch';
import MealDinner from './MealDinner';

// How are servings stored?
export default class DayHolder extends React.Component {

    // TODO: Only display meals if they exist/were logged
    render () {
    
        return (
            <div>
                <table border = "3" align="center">
                    <tr>
                        <DayDetails 
                        date = {this.props.dayInfo.date} 
                        cals = {this.props.dayInfo.cals}
                        protein = {this.props.dayInfo.protein}
                        carbs = {this.props.dayInfo.carbs}
                        fat = {this.props.dayInfo.fat}
                        />
                    </tr>

                    <tr>
                        <td><MealBreakfast 
                        cals  = "400"
                        protein = "45"
                        carbs = "100"
                        fat = "10"
                        food = {this.props.dayInfo.breakfastFood}
                        /></td>
                        <td><MealLunch 
                        cals  = "650"
                        protein = "60"
                        carbs = "120"
                        fat = "15"
                        food = {this.props.dayInfo.lunchFood}

                        /></td>
                        <td><MealDinner 
                        cals  = "800"
                        protein = "14"
                        carbs = "40"
                        fat = "25"
                        food = {this.props.dayInfo.dinnerFood}

                        /></td>
                        
                    </tr>

                </table>
            </div>);
    }
}