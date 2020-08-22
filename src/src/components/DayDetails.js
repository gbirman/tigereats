import React from 'react';

const textStyle = {
    color: "#59BF8E",
    fontFamily: 'Karla, sans-serif',
}

export default class DayDetails extends React.Component {

    // TODO: Add goals info (ex. daily cals out of how many cals)
    render () {

        return (
            <div style = {textStyle}>
            <hr/>
            <h3 align = 'center'>
             Date: {this.props.date.substring(5,7)} / {this.props.date.substring(8)} / {this.props.date.substring(0,4)} 
             </h3>
            
             <h3 align = 'center'> 
             Daily Nutrients: &#160;
            Cals =  {this.props.dayNutrients.calories} &#160;
            Protein = {this.props.dayNutrients.protein}g &#160;
            Carbs =   {this.props.dayNutrients.carbs}g &#160;
            Fat =  {this.props.dayNutrients.fat}g             
             </h3>

            
            </div>

        );
    }
}