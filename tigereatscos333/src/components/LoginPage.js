import React from 'react';
import FilterExpansionsModule from './FilterExpansionsModule';
import TableModule from './TableModule';
import axios from 'axios';
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
    icon: {
        height: '50vh', // responsive height is 30vh, 180px
        marginTop: '10vh',
        marginBottom: '5vh'
    },
    welcomePaper: {
        fontFamily: 'Karla, sans-serif',
        width: '40vw',
        borderStyle: 'solid',
        backgroundColor: "#59bf8e",
        color: "white",
        borderColor: '#d9f495',
        paddingRight: '5vw',
        paddingLeft: '5vw',
        textAlign: 'center',
        marginBottom: '5vh',
    },
    inputPaper: {
        border: 'solid',
        borderColor: '#59bf8e',
        color: '#3e8563',
        fontFamily: 'Karla, sans-serif',
        paddingRight: '3vw',
        paddingLeft: '3vw',
        paddingBottom: '3vh',
        marginBottom: '3vh',
        width: '40vw'
    },
    searchField: {
        color: '#3e8563',
        fontFamily: 'Karla, sans-serif',
    },
    searchFieldLabel: {
        color: '#3e8563',
        fontFamily: 'Karla, sans-serif',
    },
    searchUnderline: {
        color: 'red !important'
    }

})



export default withStyles(styles)(class LoginPage extends React.Component {

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
                    <img className={classes.icon} src={logo} />
                    <Paper color="primary" className={classes.welcomePaper}>
                        <div><h1>Welcome to <span style={{padding: 0, margin: 0, color: "#d9f495"}}>Tiger</span>Eats!</h1></div>
                    </Paper>
                    
                    <Grid item xs={3} >
                        <Button className={classes.loginButton} variant="contained" color="primary" href='/api/login_casclient'>Login with CAS</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
})