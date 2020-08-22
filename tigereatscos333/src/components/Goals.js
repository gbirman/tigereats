import React from 'react';
import Button from '@material-ui/core/Button';
import CalBar from './images/CalBar.png';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {HorizontalBarSeries, XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, HorizontalBarSeriesCanvas, LabelSeries} from 'react-vis';
import './dist/style.css'; // this is for the bar graph


const styles = theme => ({

    buttonStyle: {
        fontFamily: 'Karla, sans-serif',
        color: 'white',
        border: 'solid',
        borderColor: '#d9f495'
    },

    textStyle: {
        color: "#59BF8E",
        fontFamily: 'Karla, sans-serif',
    }

})

const textStyle = {
    color: "#59BF8E",
    fontFamily: 'Karla, sans-serif',
}
const spaceStyle = {
    lineHeight: 1.35

}

let data1 = Math.random() * 50 + 50;
let data2 = Math.random() * 50 + 50;
let data3 = Math.random() * 50 + 50;
let data4 = Math.random() * 50 + 50;

export default withStyles(styles)(class Goals extends React.Component {

   



    // Add actual goal data and adjust bars accordingly
    render() {





        const {classes} = this.props;
        console.log(this.props.todayNutrients.calories + " " + this.props.cal_goal + " " + data1);
        console.log(this.props.todayNutrients.protein + " " + this.props.protein_goal + " " + data1);
        console.log(this.props.todayNutrients.carbs + " " + this.props.carbs_goal + " " + data1);
        console.log(this.props.todayNutrients.fat + " " + this.props.fats_goal + " " + data1);


        const barData = // this.props.todayNutrients.fat ?   

        //  [{x: (data1) , y: 10}, 
        //     {x: (data2), y: 5 }, 
        //     {x:  (data3), y: 15 }, 
        //     {x:  (data4), y: 20 }] 
        
        // : 
        [ // default values in case it hasn't loaded yet
            // {x: 75 , y: 10}, 
            // {x: 50, y: 5 }, 
            // {x:  90, y: 15 }, 
            // {x:  65, y: 20 }
            {x: (this.props.todayNutrients.fat * 100/this.props.fats_goal) ? (this.props.todayNutrients.fat * 100/this.props.fats_goal) : data1 , y: 10}, 
            {x: (this.props.todayNutrients.carbs * 100/this.props.carbs_goal) ? (this.props.todayNutrients.carbs * 100/this.props.carbs_goal) : data1, y: 5 }, 
            {x: (this.props.todayNutrients.protein * 100/this.props.protein_goal) ? (this.props.todayNutrients.protein * 100/this.props.protein_goal) : data1, y: 15 }, 
            {x: (this.props.todayNutrients.calories * 100/this.props.calorie_goal) ? (this.props.todayNutrients.calories * 100/this.props.calorie_goal) : data1, y: 20 }
        ];


            function myFormatterX(t, i) { // for the bar graph
                return (
                  <tspan x="0" dy="1em">{t}%</tspan>
);
              }

//               function myFormatterY(t, i) { // for the bar graph
               
//                if (i == 0) {
//                 return ( 
//                   <tspan x="0" dy="1em">Calories: {this.props.calIntake} / {this.props.calGoal}</tspan>
// );
//               }
//               else return (<tspan x="0" dy="1em"> Jim</tspan>);
//             }




        return(

            <div>
            
            <Grid 
            style = {textStyle}
            container
            justify="center"
            alignItems="center"
            spacing = {8}
            >
                <Grid item><h3 align = "center">Daily Goals</h3> </Grid>
            </Grid>
            
            <Grid 
            style = {textStyle}
            container
            justify="space-evenly"
            alignItems="center"
            spacing = {24}
            >
                <Grid item> 
                    <NavLink 
                        to={"/changeGoals/" + this.props._id + "/" + this.props.fullname + "/" + this.props.calorie_goal + "/" + this.props.protein_goal + "/" + this.props.fats_goal + "/" + this.props.carbs_goal}
                        style={{textDecoration: 'none'}}
                        >
                    <Button className={classes.buttonStyle} variant="contained" color="primary">Change Goals</Button> 
                    </NavLink>

                    </Grid>
                <Grid item>
                    <NavLink 
                    to= {"/progress/" + this.props._id} 
                    style={{textDecoration: 'none'}}><Button className={classes.buttonStyle} variant="contained" color="primary">See Progress</Button></NavLink>
                </Grid>
            </Grid>
            
            <Grid 
            container
            style = {textStyle}
            justify="center"
            alignItems="stretch"
            spacing = {8}
            >
                <Grid item style = {spaceStyle}>
                    <p>Calories: {this.props.todayNutrients.calories} / {this.props.calorie_goal} </p>
                    
                    <p align= "right">Protein: {this.props.todayNutrients.protein} / {this.props.protein_goal}g</p>
                    
                    <p align = "right">Carbs: {this.props.todayNutrients.carbs} / {this.props.carbs_goal}g</p>
                   
                    <p align = "right">Fat: {this.props.todayNutrients.fat} / {this.props.fats_goal}g</p>
                </Grid>
            
                <Grid item>
                    <XYPlot 
                        animation
                        xDomain = {[0,100]} 
                        dontCheckIfEmpty={true} 
                        width={200} height={200} 
                        xDistance={100}
                        color = "#C7F898" 
                        yType="ordinal"
                        >
                        <XAxis 
                            tickTotal = {6} 
                            tickValues = {[0, 20, 40, 60, 80, 100]} 
                            tickFormat = {myFormatterX}
                        />
                        
                        <VerticalGridLines/>
                        <HorizontalBarSeries  
                        animation
                        barWidth = {0.5} 
                        data={barData} 
                        />

                    </XYPlot>
                </Grid>

            </Grid>
            </div>
 
        );

    }


})


/* Abandoning the grid code attempt

            // Old data
             [{x: (this.props.todayNutrients.fat * 100/this.props.fats_goal) , y: 10}, 
            {x: (this.props.todayNutrients.carbs * 100/this.props.carbs_goal), y: 5 }, 
            {x:  (this.props.todayNutrients.protein * 100/ this.props.protein_goal), y: 15 }, 
            {x:  (this.props.todayNutrients.calories * 100/this.props.calorie_goal), y: 20 }]


        <LabelSeries data={barData}/> // other stuff

         tickValues = {["Cals", "Protein", "Carbs", "Fat"]}

           <div>
            
                <Grid 
                container
                direction = "column"
                justify="center"
                alignItems="center"
                spacing = {8}
                >

                <Grid item xs = {12}>
                    <h3>Daily Goals</h3>
                </Grid>

                <Grid item xs = {12}>
                    <Button className={classes.buttonStyle} variant="contained" color="primary">Change Goals</Button>
                    &nbsp; &nbsp;
                    <NavLink 
                    to= {"/progress/" + this.props.user_id} 
                    style={{textDecoration: 'none'}}><Button className={classes.buttonStyle} variant="contained" color="primary">See Progress</Button></NavLink>
                        
                </Grid>
 
            <Grid item xs = {6} sm = {3}> Calories: {this.props.calIntake} / {this.props.calGoal} </Grid>
            <Grid item xs = {6} sm = {3}> <img src={CalBar} width = "120" height = "20" alt="Calories" /></Grid>
            

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
    
    
            
            </Grid>
            </div>

*/

/* Gonna try grid again when putting in this bar graph, here's the old table code:


<div>
            
            <table style = {textStyle}>
                       
            <tr>
                <td><h3 align = "center">Daily Goals</h3></td>
            </tr>

            <tr>
                <td><Button className={classes.buttonStyle} variant="contained" color="primary">Change Goals</Button></td>
                <td>
                &nbsp; &nbsp; &nbsp; &nbsp; 
                <NavLink 
                to= {"/progress/" + this.props.user_id} 
                style={{textDecoration: 'none'}}><Button className={classes.buttonStyle} variant="contained" color="primary">See Progress</Button></NavLink></td>
            </tr>

            <tr align = "left">
                <td> Calories: {this.props.calIntake} / {this.props.calGoal} &nbsp; &nbsp;  &nbsp; &nbsp; </td>
            

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

            <br/>
            
            <XYPlot 
            xDomain = {[0,100]} 
            dontCheckIfEmpty={true} 
            width={200} height={200} 
            xDistance={100}
            color = "#C7F898" >

                <XAxis tickTotal = {6} tickValues = {[0, 20, 40, 60, 80, 100]} tickFormat = {myFormatter}/>
                <HorizontalGridLines/>
                <VerticalGridLines/>
                <HorizontalBarSeries  barWidth = {0.5} data={barData} />
            </XYPlot>


            </div>


*/