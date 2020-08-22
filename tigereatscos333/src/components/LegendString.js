import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {themecolors, nutrientcolors} from '../styles/color';

const styles = theme => ({
    root: {
        backgroundColor: `${themecolors.darkgray}`,
        // media queries
        [theme.breakpoints.only('sm')]: {
            height: "80px",
          },
        [theme.breakpoints.down('sm')]: {
            height: "20px",
        },
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing.unit,
        marginLeft: "1%",
        marginRight: "1%",
    },
    label: {
        flex: 1,
        flexWrap: "nowrap",
        overflow: "initial",
        textAlign: "center",
    }
});

// this stateless function component is a legend for small screens 
// because the screeen is too narrow to display the label axis 
// for the channel chart 

const LegendString = (props) => {

    const { classes } = props;
    return (
        <Paper 
            className={classes.root} 
            elevation={0}
        >
            <Typography 
                className={classes.label}
                variant="overline"
                style={{color: nutrientcolors.calories}}
                noWrap 
            >
                Calories
            </Typography>
            <Typography 
                className={classes.label}
                variant="overline"
                style={{color: nutrientcolors.carbs}}
                noWrap 
            >
                Carbs
            </Typography>
            <Typography 
                className={classes.label}
                variant="overline"
                style={{color: nutrientcolors.fat}}
                noWrap 
            >
                Fat
            </Typography>
            <Typography 
                className={classes.label}
                variant="overline"
                style={{color: nutrientcolors.protein}}
                noWrap 
            >
                Protein
            </Typography>
        </Paper>
    );
};

export default withStyles(styles, { withTheme: true })(LegendString); 