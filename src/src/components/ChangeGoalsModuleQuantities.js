import React from 'react';
import FilterExpansionsModule from './FilterExpansionsModule';
import TableModule from './TableModule';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SimpleModal from './SimpleModal';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paperTitle: {
        color: "#3e8563",
        fontFamily: 'Karla, sans-serif',
        textAlign: 'center',
        paddingRight: '2vh',
        paddingLeft: '2vh'
    },
    labelContainer: {
        marginTop: '1vh',
        marginBottom: '1vh',
        paddingRight: '2vh',
        paddingLeft: '2vh'
    },
    valueContainer: {
        marginTop: '1vh',
        marginBottom: '1vh',
        paddingRight: '2vh',
        paddingLeft: '2vh'
    },
    paperLabel: {
        textAlign: "center",
        color: "#4CA279",
        fontFamily: 'Karla, sans-serif',
    },
    paperValue: {
        textAlign: "center",
        color: "#59bf8e",
        fontFamily: 'Karla, sans-serif',
    },
    searchField: {
        color: '#4CA279',
        fontFamily: 'Karla, sans-serif',
    },
    searchFieldLabel: {
        color: '#4CA279',
        fontFamily: 'Karla, sans-serif',
    },
    paperInput: {
        textAlign: 'center'
    }
    
});

export default withStyles(styles)(class ChangeGoalsModuleQuantities extends React.Component {
    state = {
        calGoal: this.props.calGoal,
        proGoal: this.props.proteinGoal,
        fatsGoal: this.props.fatsGoal,
        carbsGoal: this.props.carbsGoal,
        proValue: false,
        carbsValue: false,
        fatsValue: false,
        calValue: false,
        calShouldBeCalculated: false,
        newCalVal: undefined
    }

    handleCalChange = (e) => {
       /* let val;

        if (e.target.value === "")
            val = false;
        else
            val = true;
        
        this.setState({newCalGoal: e.target.value, calValue: val}); */

        if (e.target.value === "") this.setState()
    }

    handleProChange = (e) => {
        /*let val;

        if (e.target.value === "")
            val = false;
        else
            val = true;

        this.props.onProChange(e.target.value);
        
        this.setState({proValue: val, proGoal: e.target.value}); */

        let val, v;
        if (e.target.value === "") val = this.props.proteinGoal;
        else val = e.target.value;

        this.props.onProChange(val);

        this.setState({proGoal: val}, () => {console.log(this.state.proGoal + " " + this.state.calGoal); v = this.calcNewCals(); this.setState({calGoal: v}); this.props.onCalChange(v);});
        console.log(this.state.proGoal + " " + v);
        
    }

    handleFatsChange = (e) => {
        /*let val;

        if (e.target.value === "")
            val = false;
        else
            val = true;
        
        this.props.onFatsChange(e.target.value);

        this.setState({fatsValue: val, fatsGoal: e.target.value}); */

        let val, v;
        if (e.target.value === "") val = this.props.fatsGoal;
        else val = e.target.value;

        this.props.onFatsChange(val);

        
        this.setState({fatsGoal: val}, () => {console.log(this.state.fatsGoal + " " + this.state.calGoal); v = this.calcNewCals(); this.setState({calGoal: v}); this.props.onCalChange(v);});
        
    }

    handleCarbsChange = (e) => {
        /*let val;

        if (e.target.value === "")
            val = false;
        else
            val = true;

        this.props.onCarbsChange(e.target.value);
        
        this.setState({carbsValue: val, carbsGoal: e.target.value}); */

        let val, v;
        if (e.target.value === "") val = this.props.carbsGoal;
        else val = e.target.value;

        this.props.onCarbsChange(val);

        this.setState({carbsGoal: val}, () => {console.log(this.state.carbsGoal + " " + this.state.calGoal); v = this.calcNewCals(); this.setState({calGoal: v}); this.props.onCalChange(v); });
              

    }

    handleFocusOut = (e) => {
        /*let carbs = this.state.carbsValue;
        let fats = this.state.fatsValue;
        let pros = this.state.proValue;

        if (carbs && pros && fats) {
            let newCal = 4 * parseInt(this.state.carbsGoal) + 9 * parseInt(this.state.fatsGoal) + 4 * parseInt(this.state.proGoal);
            this.setState({calShouldBeCalculated: true, calGoal: newCal}, () => this.props.onCalChange(newCal));
        }
        else
            this.setState({calShouldBeCalculated: false}, () => {console.log('n')}) */
    }

    calcNewCals = () => {
        console.log(4 * parseInt(this.state.carbsGoal) + 9 * parseInt(this.state.fatsGoal) + 4 * parseInt(this.state.proGoal));
        return 4 * parseInt(this.state.carbsGoal) + 9 * parseInt(this.state.fatsGoal) + 4 * parseInt(this.state.proGoal);
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container justify="center" alignItems="center" className={classes.paperTitle}>
                    <h2>Current Goals:</h2>
                </Grid>
                <Grid container justify="center" className={classes.labelContainer} alignItems="center">
                    <Grid item className={classes.paperLabel} xs={3}><u>Protein / Day</u></Grid>
                    <Grid item className={classes.paperLabel} xs={3}><u>Carbs / Day</u></Grid>
                    <Grid item className={classes.paperLabel} xs={3}><u>Fats / Day</u></Grid>
                    <Grid item className={classes.paperLabel} xs={3}><u>Calories / Day</u></Grid>
                </Grid>
                <Grid container justify="center" className={classes.valueContainer} alignItems="center">
                    <Grid item className={classes.paperValue} xs={3}>{this.props.proteinGoal}</Grid>
                    <Grid item className={classes.paperValue} xs={3}>{this.props.carbsGoal}</Grid>
                    <Grid item className={classes.paperValue} xs={3}>{this.props.fatsGoal}</Grid>
                    <Grid item className={classes.paperValue} xs={3}>{this.props.calGoal}</Grid>
                </Grid>
                <Grid container justify="center" alignItems="center" className={classes.paperTitle}>
                    <h2>New Goals:</h2>
                </Grid>
                <Grid container justify="space-around" alignItems="center" className={classes.labelContainer}> 
                    <Grid item className={classes.paperLabel} xs={3}><u>Protein / Day</u></Grid>
                    <Grid item className={classes.paperLabel} xs={3}><u>Carbs / Day</u></Grid>
                    <Grid item className={classes.paperLabel} xs={3}><u>Fats / Day</u></Grid>
                    <Grid item className={classes.paperLabel} xs={3}><u>Calories / Day</u></Grid>
                </Grid>
                <Grid container justify="center" alignItems="center" style={{padding: 20}}>
                    <Grid item className={classes.paperInput} xs={3}><Input InputLabelProps={{classes: {root: classes.searchFieldLabel}}} InputProps={{classes: {input: classes.searchField, underline: classes.searchUnderline}}} className={classes.searchField} placeholder={this.props.proteinGoal} onKeyUp={this.handleProChange} onBlur={this.handleFocusOut}/></Grid>
                    <Grid item className={classes.paperInput} xs={3}><Input InputLabelProps={{classes: {root: classes.searchFieldLabel}}} InputProps={{classes: {input: classes.searchField, underline: classes.searchUnderline}}} className={classes.searchField} placeholder={this.props.carbsGoal} onKeyUp={this.handleCarbsChange} onBlur={this.handleFocusOut}/></Grid>
                    <Grid item className={classes.paperInput} xs={3}><Input InputLabelProps={{classes: {root: classes.searchFieldLabel}}} InputProps={{classes: {input: classes.searchField, underline: classes.searchUnderline}}} className={classes.searchField} placeholder={this.props.fatsGoal} onKeyUp={this.handleFatsChange} onBlur={this.handleFocusOut}/></Grid>
                    <Grid item className={classes.paperInput} xs={3}><Input InputLabelProps={{classes: {root: classes.searchFieldLabel}}} InputProps={{classes: {input: classes.searchField, underline: classes.searchUnderline}}} className={classes.searchField} placeholder={this.props.calGoal} onBlur={this.handleFocusOut} value={/*this.state.calShouldBeCalculated ? this.state.calGoal : ""*/ this.state.calGoal}></Input></Grid>
                </Grid>
            </div>
        );
    }

})