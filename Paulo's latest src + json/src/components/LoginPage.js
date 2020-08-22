import React from 'react';
import FilterExpansionsModule from './FilterExpansionsModule';
import TableModule from './TableModule';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';



export default class LoginPage extends React.Component {

    state = {
        email: undefined,
        password: undefined,
    };

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
        console.log(e.target.value);
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
        console.log(e.target.value);
    }

    render() {
        return (
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{minHeight: '100vh'}}
                >
                    <Paper style={{marginRight: '10%', marginLeft: '10%', marginBottom: '2%', paddingRight: 10, paddingLeft: 10}}>
                        <h1>Welcome to TigerEats!</h1>
                    </Paper>
                    <Paper style={{padding:20, marginBottom: '2%'}}>
                        <h3>Please enter your Princeton email and password:</h3>
                        <Grid item style={{marginBottom: '2%'}}>
                            <TextField fullWidth={true} label="Email" onKeyUp={this.handleEmailChange} placeholder='i.e. pfrazao@princeton.edu'></TextField>
                        </Grid>
                        <Grid item style={{marginBottom: '2%'}}>
                            <TextField label="Password" type="password" onKeyUp={this.handlePasswordChange} fullWidth={true}></TextField>
                        </Grid>
                    </Paper>
                    <Grid item xs={3} >
                        <NavLink to="/dash" justify="center"  style={{ textDecoration: 'none'}}><Button variant="contained" color="primary" onClick={() => {this.props.onLogin(); alert("You've been logged in!")}}>Login</Button></NavLink>
                    </Grid>
                </Grid>
            </div>
        )
    }
}