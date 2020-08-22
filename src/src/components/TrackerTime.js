import React from 'react';
import moment from "moment";
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {themecolors} from '../styles/color';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        //   paddingTop: theme.spacing.unit * 2,
        //   paddingBottom: theme.spacing.unit * 2,
        backgroundColor: `${themecolors.darkgray}`,
        [theme.breakpoints.only('sm')]: {
            height: "80px",
          },
        [theme.breakpoints.down('sm')]: {
            height: "20px",
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        color: 'white',
        flexWrap: "nowrap",
        [theme.breakpoints.only('sm')]: {
            height: "100%",
          },
        height: "auto",
        overflow: "initial",
        color: theme.palette.primary.light
    }
});

// this statless component displays the date 
// as a day, week or month depending on 
// the parent components state

const TrackerTime = (props) => {

    const { classes } = props;
    const {tracker, rollupSize, timerange} = props;

    const trackertime = moment.utc(+tracker)

    // get tracker time in appropriate format
    let selectiondate = null; 
    let fontSize = null; 
    if (tracker >= timerange.begin() && tracker <= timerange.end()) {
        if (rollupSize === 'day') {
            selectiondate = trackertime.format('MM/DD/YY');
            fontSize = '2.5vw';
        } else if (rollupSize === 'week') {
            let weekstart = null;
            let weekend = null
            if (trackertime.isSameOrAfter(trackertime.clone().day(4))) {
                weekstart = trackertime.clone().day(4); 
                weekend = trackertime.clone().day(10); 
            } else {
                weekstart = trackertime.clone().day(-3); 
                weekend = trackertime.clone().day(3); 
            }
            selectiondate = 
                `${weekstart.format('ddd MM/DD/YY')} - ${weekend.format('ddd MM/DD/YY')}`;
                //`${weekstart.format('MM/DD/YY')} - ${weekend.format('MM/DD/YY')}`;
            fontSize = '2vw';
        } else if (rollupSize === 'month') {
            selectiondate = trackertime.format('MMM-YYYY');
            fontSize = '3vw';
        }
    } else {
        selectiondate = '--'
        fontSize = '4vw';
    }

    return (
        <Paper 
            className={classes.root} 
            elevation={props.smallScreen ? 0 : 1}
        >
            <Typography 
                className={classes.label}
                variant="overline"
                style={props.smallScreen ? {fontSize: 18} : {fontSize}}
                noWrap 
            >
                {selectiondate}
            </Typography>
        </Paper>
    );
};

export default withStyles(styles, { withTheme: true })(TrackerTime); 