import React from 'react';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';


const NavHeader = () => (
    <header>
        <Grid container alignItems="center" >
            <Grid container item xs={12} sm={6} justify="center">
                <h1>Hello, Paulo! Welcome to TigerEats.</h1>
            </Grid>
            <Grid container xs={12} sm={6} item justify="space-around" alignItems="center">
                <Grid item>
                    <NavLink to="/dash" style={{ textDecoration: 'none'}}><Button variant="contained" color="primary">My Students</Button></NavLink>
                </Grid>
                <Grid item>
                    <NavLink to="/" style={{ textDecoration: 'none'}}><Button variant="contained" color="primary">Logout</Button></NavLink>
                </Grid>
            </Grid>
        </Grid>
    </header>
);

export default NavHeader;