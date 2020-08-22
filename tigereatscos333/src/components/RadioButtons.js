import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {themecolors} from '../styles/color';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

// TODO: Fix radio button switch to daily when shortening screen width 

const styles = theme => ({
    root: {
        padding: 0,
    },
    daily: {
        color: theme.palette.primary.light,
        '&$checked': {
            color: theme.palette.primary.light
        }
    },
    weekly: {
        color: theme.palette.primary.light,
        '&$checked': {
            color: theme.palette.primary.light
        }
    },
    monthly: {
        color: theme.palette.primary.light,
        '&$checked': {
            color: theme.palette.primary.light
        }
    },
    checked: {}, 
    paper: {
        //...theme.mixins.gutters(),
        //paddingTop: theme.spacing.unit * 2,
        //paddingBottom: theme.spacing.unit * 2,
        backgroundColor: `${themecolors.darkgray}`,
        [theme.breakpoints.down('sm')]: {
            height: "50px",
        },
        height: "100%",
    },
    group: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
    }
});

// Radio Buttons to set the window
// to either day week or month 

const FormControlLabelPosition = (props) => {
    const {classes, rollupSize, smallScreen} =  props;
    const [value, setValue] = React.useState(rollupSize); // these are hooks supported in the react alpha version

    // change the display for >= sm (e.g. "Day" vs "D")
    const minwidth = useMediaQuery(`(min-width:${props.theme.breakpoints.values.sm}px)`);

    const handleChange = (event) => {
        setValue(event.target.value);
        if (event.target.value === "day") {
            props.setWindowDay();
        } else if (event.target.value === "week") {
            props.setWindowWeek();
        } else if (event.target.value === "month") {
            props.setWindowMonth();
        }
    }

  return (
    <Paper className={classes.paper} elevation={props.theme.breakpoints.down('md') ? 0 : 1}>
        <FormControl 
            component="fieldset"
            style={{width: "100%"}}
        >
            <RadioGroup 
                aria-label="position" 
                name="position" 
                value={value} 
                onChange={handleChange} 
                row={true}
                className={classes.group}
            >
                <FormControlLabel
                value="day"
                control={<Radio className={classnames(classes.root, classes.daily, classes.checked)}/>}
                label={minwidth ? "Daily" : "D"}
                labelPlacement="top"
                classes={{label: classes.daily}}
                />
                <FormControlLabel
                value="week"
                control={<Radio color="primary" className={classnames(classes.root, classes.weekly, classes.checked)} />}
                label={minwidth ? "Weekly" : "W"}
                labelPlacement="top"
                classes={{label: classes.weekly}}
                />
                <FormControlLabel
                value="month"
                control={<Radio color="primary" className={classnames(classes.root, classes.monthly, classes.checked)} />}
                label={minwidth ? "Monthly" : "M"}
                labelPlacement="top"
                classes={{label: classes.monthly}}
                />
            </RadioGroup>
        </FormControl>
    </Paper>
  );
}

export default withStyles(styles, { withTheme: true })(FormControlLabelPosition);