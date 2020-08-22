import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MealPic from './images/EggToast.jpg';
import EditIcon from '@material-ui/icons/Edit';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({

    buttonStyle: {
        fontFamily: 'Karla, sans-serif',
        color: 'white',
        border: 'solid',
        borderColor: '#d9f495'
    },

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
      }

})

const textStyle = {
    color: "#59BF8E",
    fontFamily: 'Karla, sans-serif',
}

export default  withStyles(styles)(class MealBreakfast extends React.Component {

    state = {
        name: '',
      };
    
      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };


    // Displays the food and the serving amount for a given meal
    displayFood = (foodData) => {
    //     let output = '<p>';
    //     for (let foodType in foodData) {
    //         output +=  foodType + " : " + foodData[foodType] + "<br/>";
    //     }
    //     output += '</p>'
    //    // console.log(output);
    //     return output;
        let outputArray = [];
        for (let foodType in foodData) {
            outputArray.push(foodType + " : " + foodData[foodType]);
            outputArray.push(<br/>);
        }
        return outputArray;


    }
    
    


    // TODO: New row for every part of food array
    render () {
        const {classes} = this.props; // used for styling

        return (
            <div style = {textStyle}>
            <Grid container alignItems = "center">
                <Grid item>
                        <p>{this.props.mealName} </p>
                </Grid>
            </Grid>

            <Grid container spacing = {24}>
                <Grid item>
                        <p>Cals: {this.props.mealData[0].calories} | 
                        Protein: {this.props.mealData[0].protein}g | 
                        Carbs: {this.props.mealData[0].carbs}g | 
                        Fat: {this.props.mealData[0].fat}g </p>
                </Grid>
            </Grid>

            <Grid container spacing = {24}>
                <Grid item xs>
                    {this.displayFood(this.props.mealData[1])}
                </Grid>

                <Grid item xs>
                <img src={MealPic} width = "80" height = "80" alt="MealPic" />
                </Grid>
            </Grid>
            
            <Grid container spacing = {24}>

            </Grid>
            </div>

        );
    }
})

/* For the editable text field

                <Grid item xs>

            <TextField
            id=" Note"
            label="Note"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            variant="outlined"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
            
            
            />
            
                </Grid>


<form>
                        <label>
                            Name:
                            <input type="text" name="" />
                        </label>
                        <input type="submit" value="AddNote" />
                    </form>
                    <Button className={classes.buttonStyle} variant="contained" color="primary">Add Note</Button>

                                    <Line
               
                label=''
                onSave={(value, editable) => this.onSave(value, editable)}
                editLabel='Edit'
                saveLabel='Save'
                cancelLabel='Cancel'
                value='Add Note'
                needsSaveOnKeyPress = {(e) => this.needsSaveOnKeyPressInInputText(e)}
              />

*/