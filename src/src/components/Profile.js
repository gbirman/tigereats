import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Traits from './Traits';


const textStyle = {
        color: "#59BF8E",
        fontFamily: 'Karla, sans-serif',
    }


// export default withStyles(styles)(class Profile extends React.Component {
    export default class Profile extends React.Component {

    render() {
        // const {classes} = this.props;

        return(
            <div>
                <Grid
                 container
                 style = {textStyle} 
                 >
                    <Grid item xs = {12}><h3 align = "center"> Student Profile </h3></Grid>
                </Grid>

                <Grid 
            
                container 
                style = {textStyle}
                justify = "center"
                alignItems = "center"
                spacing = {8}
                >
                    <Grid item xs > <p>Class of {this.props.class}</p> </Grid>
                    <Grid item xs > <p> Height:   &nbsp;   {this.props.height} </p> </Grid>
                </Grid>

                <Grid 
                
                container 
                style = {textStyle}
                justify = "center"
                alignItems = "center"
                spacing = {8}
                >
                    <Grid item xs> <p>{this.props.team}  </p> </Grid>
                    <Grid item xs> <p>  Weight:  &nbsp; {this.props.weight}lbs </p> </Grid>
                </Grid>

                <Grid 
                container 
                style = {textStyle}
                justify = "center"
                alignItems = "center"
                spacing = {8}
                >
                    <Grid item xs = {6}> <p>Age:  &nbsp;  {this.props.age} </p> </Grid>
                    <Grid item xs = {6}> <p> Goal Weight: &nbsp; {this.props.goalWeight}lbs </p> </Grid>
                </Grid>
                        
                        
                        
                   



                
            </div>
        );

    }


}//)

/* Old grid code 

                    <Grid item xs = {6}>
                        <Traits
                        height={this.props.height}
                        weight= {this.props.weight} 
                        goalWeight = {this.props.goalWeight} 
                        /> 
                    </Grid>



*/