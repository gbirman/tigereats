import React from 'react';
import Button from '@material-ui/core/Button';

export default class MealDinner extends React.Component {


    //TODO: Only display if it exists
    render () {

        return (
            <div>
                <p> Dinner</p>

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