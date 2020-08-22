import React from 'react';
import Grid from '@material-ui/core/Grid';
import ExpansionModule from './ExpansionModule';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    blurb: {
        color: "#59bf8e",
        fontFamily: 'Karla, sans-serif',
    }
    
})

export default withStyles(styles)(class FilterExpansionModule extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div >
                <Grid container item alignItems="center" className={classes.module}  >
                    <Grid container item xs={12} sm={4} justify="center" >
                        <h2 className={classes.blurb}>Filter on:</h2>
                    </Grid>
                    <Grid container xs={12} sm={8} item justify="space-around">
                        <Grid item style={{width:250}}>
                            <ExpansionModule 
                                criteria="gender"
                                onFilter={this.props.onFilter}
                                
                            />
                        </Grid>
                        <Grid item style={{width:250}}>
                            <ExpansionModule
                            criteria="team"
                            onFilter={this.props.onFilter}
                            />
                        </Grid>
                        <Grid item style={{width:250}}>
                            <ExpansionModule 
                            criteria="year"
                            onFilter={this.props.onFilter}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
})