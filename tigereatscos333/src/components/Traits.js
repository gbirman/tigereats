import React from 'react';
import Grid from '@material-ui/core/Grid';

const textStyle = {
    color: "#59BF8E",
    fontFamily: 'Karla, sans-serif',
    lineHeight: 0.4
}

/* I'll take "Shit that doesn't work" for 1000 Alex

                   <p style="text-align:left;">
                    left
                    <span styles={{float: 'right'}}>right</span>
                    </p>

                    Old table code:
                        <div>
                <table align = "left">
                    <tr align = "left">
                        <td><h3>Physical Traits</h3></td>
                    </tr>
                    <tr align = "left"><td>Height: <span className = "rightStyle">{this.props.height}</span></td></tr>
                    <tr align = "left"><td>Age: {this.props.age}</td></tr>
                    <tr align = "left"><td>Weight: {this.props.weight}lbs</td></tr>
                    <tr align = "left"><td>Goal Weight: {this.props.goalWeight}lbs</td></tr>
                </table>
            </div>

            Old grid code (works)

            <div>
                <Grid 
                container
                direction="column"
                justify="space-between"
                alignItems="left"
                spacing = {8}
                style = {textStyle}
                >
                
                <Grid item>Height: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {this.props.height} </Grid>                 
                <Grid item>Age: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {this.props.age}</Grid>
                <Grid item>Weight: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {this.props.weight}lbs</Grid>
                <Grid item>Goal Weight: {this.props.goalWeight}lbs</Grid>

                </Grid>

            </div>

*/

export default class Traits extends React.Component {

    render() {

        return(
            <div>
                <Grid 
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
                spacing = {0}
                style = {textStyle}
                >
                
                <Grid item><p>Height:</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <p align = "center">{this.props.height}</p> </Grid>                 
                
                <Grid item><p>Weight:</p> <p align = "center">{this.props.weight}lbs</p></Grid>
                <Grid item><p>Goal Weight:</p> <p align = "center">{this.props.goalWeight}lbs</p></Grid>

                </Grid>

            </div>
        );

    }


}