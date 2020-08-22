import React from 'react';
import DayHolder from './DayHolder';


export default class DaysHolder extends React.Component {

    //let breakfastFood = ['Eggs', 'Hashbrowns'];

    render () {

        // Mock Data
        let days =  [

            {
            date: "10102018",
            cals: "400",
            protein: "40",
            carbs: "300",
            fat: "52",
            breakfastFood: ["cereal"], 
            lunchFood: ["ham sandwich"],
            dinnerFood: ["meatloaf"]
            },
            {
            date: "10112018",
            cals: "400",
            protein: "26",
            carbs: "430",
            fat: "34",
            breakfastFood: ["scrambled eggs"], 
            lunchFood: ["chicken caesar wrap"],
            dinnerFood: ["chicken wings"]
            }
        
            ];



        // TODO: Pass in Date
        /* 
         <DayHolder 
            breakfastFood = {['Eggs', 'Hash Browns']}
            lunchFood = {['Turkey Sandwich']}
            dinnerFood = {['Spaghetti and Meatballs']}
            />
            <DayHolder
            breakfastFood = {['Eggs Benedict']}
            lunchFood = {['Cheese Quesadilla']}
            dinnerFood = {['Teriyaki Chicken']}
            />

        */

        
        return (
            <div>
            {
            days.map((day) => 
            <DayHolder key={day.date} dayInfo={day}/>)    
            }

           
            </div>

        );
    }
}