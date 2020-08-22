import React from 'react';
import FilterExpansionsModule from './FilterExpansionsModule';
import TableModule from './TableModule';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import logo from './images/tiger_eats_graphic.png'

const styles = theme => ({
    loginButton: {
        fontFamily: 'Karla, sans-serif',
        color: 'white',
        border: 'solid',
        borderColor: '#d9f495',
        fontSize: '1em',
        paddingTop: '1vh',
        paddingBottom: '1vh',
        textAlign: 'center'
    },
    welcomePaper: {
        fontFamily: 'Karla, sans-serif',
        width: '40vw',
        borderStyle: 'solid',
        color: "#3e8563",
        borderColor: '#59bf8e',
        paddingRight: '5vw',
        paddingLeft: '5vw',
        textAlign: 'center',
        marginTop: '30vh',
        marginBottom: '5vh',
    }
})



export default withStyles(styles)(class ErrorPage extends React.Component {

    state = {
        email: undefined,
        password: undefined,
        isClicked: false
    };

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
        console.log(e.target.value);
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <Paper className={classes.welcomePaper}>
                        <div><h1>We're sorry! You aren't authorized to view this page!</h1></div>
                    </Paper>
                    
                    <Grid item xs={3} >
                        <Button className={classes.loginButton} variant="contained" color="primary" component={Link} to={"/"}>Return to the login page</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
})