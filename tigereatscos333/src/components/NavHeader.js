import React from 'react';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';
import logo from './images/tiger_eats_logo.png'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    logo: {
        marginTop: '2vh',
        marginBottom: '2vh',
        width: '300px'
    },
    headerButton: {
        marginTop: '2vh',
        marginBottom: '2vh',
        width: '20vw',
        paddingRight: '50px',
        paddingLeft: '50px',
        fontFamily: 'Karla, sans-serif',
        fontSize: '1em',
        color: 'white',
        border: 'solid',
        borderStyle: 'solid',
        borderColor: '#d9f495',
    }
})

export default withStyles(styles)(class NavHeader extends React.Component {
    render() {
        const {classes} = this.props;
        console.log(window.location.pathname);
        if (window.location.pathname === '/' || window.location.pathname === '/error') return null;
        else {
            return (
            <header>
                <Grid container alignItems="center" >
                    <Grid container item xs={12} sm={5} justify="center">
                        <img className={classes.logo} src={logo} />
                    </Grid>
                    <Grid container xs={12} sm={7} item justify="space-around" >
                        <Grid item>
                            <NavLink to="/dash" style={{ textDecoration: 'none'}}><Button className={classes.headerButton} variant="contained" color="primary">Dashboard</Button></NavLink>
                        </Grid>
                        <Grid item>
                            <Button className={classes.headerButton} variant="contained" color="primary" href="https://fed.princeton.edu/cas/logout">Logout</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </header>
        );
        }
    }
})