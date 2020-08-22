import React from 'react';
import Grid from '@material-ui/core/Grid';
import ExpansionModule from './ExpansionModule';


export default class FilterExpansionModule extends React.Component {
    render() {
        return (
            <div>
                <Grid container item >
                    <Grid container item xs={12} sm={4} justify="center">
                        <h2>Filter on:</h2>
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
}