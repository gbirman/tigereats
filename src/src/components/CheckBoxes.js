import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {themecolors, nutrientcolors} from '../styles/color';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

const styles = (theme) => ({
    root: {
        padding: 0,
    },
    calories: {
        color: nutrientcolors.calories,
        '&$checked': {
            color: nutrientcolors.calories
        }
    },
    carbs: {
        color: nutrientcolors.carbs,
        '&$checked': {
            color: nutrientcolors.carbs
        }
    },
    fat: {
        color: nutrientcolors.fat,
        '&$checked': {
            color: nutrientcolors.fat
        },
    },
    protein: {
        color: nutrientcolors.protein,
        '&$checked': {
            color: nutrientcolors.protein
        },
    },
    checked: {}, 
    paper: {
        backgroundColor: `${themecolors.darkgray}`,
        [theme.breakpoints.down('sm')]: {
            height: "50px",
        },
        height: "100%",
    },
    group: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "100%"
    }
});

// statless function component for the 


const CheckboxLabels = (props) => {

  const minwidth = useMediaQuery(`(min-width:${props.theme.breakpoints.values.md}px)`);

  const {classes} =  props;
  const {channels, channelNames} = props;
  const [state, setState] = React.useState({ // these are hooks supported in the react alpha version
    calories: true,
    carbs: true,
    fat: true,
    protein: true,
  });

  // handles chart display (toggling individual channels)
  const handleChange = name => event => {

    // disable toggle when only one checkbox left  
    // Note: if channelNames becomes too big 
    // this will become an expensive operation 
    // it would be better to set displayChannels variable in state 
    // but since there's only four channels rn I didn't bother 
    if (channelNames.filter(channelName => {
        if (channels[channelName].show) {
            return true;
        } else {
            return false;
        }
    }).length === 1 && !event.target.checked) {
        setState({ ...state, [name]: !event.target.checked });
        return;
    } 

    setState({ ...state, [name]: event.target.checked });
    props.toggleChannelShow(name);
  };

  // the hardcoded names can be made more dynamic by replacing 
  // calories with channelNames[0] for instance -- I didn't 
  // feel this was necessary though 
  return (
    <Paper className={classes.paper} elevation={props.smallScreen ? 0 : 1}>
        <FormGroup row className={classes.group}>
            <FormControlLabel
                control={
                <Checkbox
                    checked={state.calories}
                    onChange={handleChange('calories')}
                    value="calories"
                    className={classnames(classes.root, classes.calories, classes.checked)}
                />
                }
                label={minwidth ? "Calories" : ""}
                labelPlacement="top"
                classes={{label: classnames(classes.calories, classes.root)}}
            />
            <FormControlLabel
                control={
                <Checkbox
                    checked={state.carbs}
                    onChange={handleChange('carbs')}
                    value="carbs"
                    className={classnames(classes.root, classes.carbs, classes.checked)}
                />
                }
                label={minwidth ? "Carbs" : ""}
                labelPlacement="top"
                classes={{label: classnames(classes.carbs, classes.root)}}
            />
            <FormControlLabel
                control={
                <Checkbox
                    checked={state.fat}
                    onChange={handleChange('fat')}
                    value="fat"
                    className={classnames(classes.root, classes.fat, classes.checked)}
                />
                }
                label={minwidth ? "Fat" : ""}
                labelPlacement="top"
                classes={{label: classnames(classes.fat, classes.root)}}
            />
            <FormControlLabel
                control={
                <Checkbox
                    checked={state.protein}
                    onChange={handleChange('protein')}
                    value="protein"
                    className={classnames(classes.root, classes.protein, classes.checked)}
                />
                }
                label={minwidth ? "Protein" : ""}
                labelPlacement="top"
                classes={{label: classnames(classes.protein, classes.root)}}
            />
        </FormGroup>
    </Paper>
  );
}

export default withStyles(styles, { withTheme: true })(CheckboxLabels);