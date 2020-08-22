import React from 'react';
import Button from '@material-ui/core/Button';

export default class MealBreakfast extends React.Component {


    // TODO: New row for every part of food array
    render () {

        return (
            <div>
            <p> Breakfast </p>
            <table>
                <tr>
                    <p>Cals: {this.props.cals} | 
                    Protein: {this.props.protein} | 
                    Carbs: {this.props.carbs} | 
                    Fat: {this.props.fat} </p>
                </tr>
            <tr>
            <p>{this.props.food}</p>
            </tr>

            </table>
            <Button variant="contained" color="primary">Add Note</Button>
            
            </div>

        );
    }
}
