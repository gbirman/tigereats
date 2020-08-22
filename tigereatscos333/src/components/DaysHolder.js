import React from 'react';
import DayHolder from './DayHolder';
import Grid from '@material-ui/core/Grid';


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



    




     

        // TODO: Use automated dates, looking at the last five days (or confirm that that have at least one meal logged (meaning dayInfo[0] exists))
        // 
        return (
            <div>
                <Grid 
                container
                direction = "column"
                alignItems= "center"
                spacing = {24}
                >

                    <Grid item>
                        <DayHolder key={this.props.dateArray[0]}
                            date = {this.props.dateArray[0]}
                            dayInfo={this.props.dayInfo0}
                        /> 
                    </Grid>
                    
                    <Grid item>
                        <DayHolder key={this.props.dateArray[1]}
                            date = {this.props.dateArray[1]}
                            dayInfo={this.props.dayInfo1}
                        />
                    </Grid>

                    <Grid item>
                        <DayHolder key={this.props.dateArray[2]}
                            date = {this.props.dateArray[2]}
                            dayInfo={this.props.dayInfo2}
                        />
                    </Grid>

                    <Grid item>
                        <DayHolder key={this.props.dateArray[3]}
                            date = {this.props.dateArray[3]}
                            dayInfo={this.props.dayInfo3}
                        />
                    </Grid>

                    <Grid item>
                    <DayHolder key={this.props.dateArray[4]}
                        date = {this.props.dateArray[4]}
                        dayInfo={this.props.dayInfo4}
                    />
                </Grid>

                </Grid>

            </div>

        );
    }
}