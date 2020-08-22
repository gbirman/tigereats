import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {themecolors} from '../styles/color';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        //   paddingTop: theme.spacing.unit * 2,
        //   paddingBottom: theme.spacing.unit * 2,
        backgroundColor: `${themecolors.darkgray}`,
        height: "30px",
        //width: "100px",
        //flexGrow: 1,
        flexWrap: "wrap"
    },
    label: {
        color: 'white',
        height: "100%"
    }
});

// this statless component displays various strings
// for nutrional components. However, it has been
// DEPRECATED

const NutritionValues = (props) => {

    const { classes } = props;
    const {values, nutrient} = props;
    const minwidth = useMediaQuery(`(min-width:${props.theme.breakpoints.values.sm}px)`);

    let displaystring = null; 
    if (nutrient === "Calories") {
        if (minwidth) {
            displaystring = `Calories: ${values.calories}` 
                + ((values.calories === "--") ? "" : ' kcal');
        } else {
            displaystring = `Cal: ${values.calories}`
        }
    } else if (nutrient === "Carbs") {
        if (minwidth) {
            displaystring = `Carbs: ${values.carbs}`
                + ((values.carbs === "--") ? "" : ' g');
        } else {
            displaystring = `Car: ${values.carbs}`
        }
    } else if (nutrient === "Fat") {
        if (minwidth) {
            displaystring = `Fat: ${values.fat}`
             + ((values.fat === "--") ? "" : ' g');
        } else {
            displaystring = `Fat: ${values.fat}`
        }
    } else if (nutrient === "Protein") {
        if (minwidth) {
            displaystring = `Protein: ${values.protein}`
            + ((values.protein === "--") ? "" : ' g');
        } else {
            displaystring = `Pro: ${values.protein}`
        }
    }

    return (
        <Paper className={classes.root} elevation={0}>
            <Typography 
                className={classes.label}
                variant="overline"
                noWrap
                //style={{fontSize}}
            >
                {displaystring}
            </Typography>
        </Paper>
    );
};

export default withStyles(styles, { withTheme: true })(NutritionValues); 