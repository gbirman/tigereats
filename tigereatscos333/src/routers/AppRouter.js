import React from 'react';
import {BrowserRouter, Route, Switch, Redirect, withRouter} from 'react-router-dom';
import DashboardPage from '../components/DashboardPage';
import NavHeader from '../components/NavHeader';
import StudentGoalsPage from '../components/StudentGoalsPage';
import ChangeGoalsPage from '../components/ChangeGoalsPage';
import ProgressPage from '../components/ProgressPage';
import TestPage from '../components/TestPage';
import LoginPage from '../components/LoginPage';
import ErrorPage from '../components/ErrorPage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import createPalette from '@material-ui/core/styles';
import createTypography from '@material-ui/core/Typography';
import axios from 'axios';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#59BF8E",
            light: "#7acba4",
            dark: "#3e8563"
        },
        secondary: {
            main: "#d9f495",
            light: "#e0f6aa",
            dark: "#97aa68"
        }
    },
    typography: {
        fontFamily: [
        'Karla',
        'Raleway',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    }, 
      overrides: {
        MuiInput: {
          underline: {
            '&:before': { //underline color when textfield is inactive
                borderBottom: '#59BF8E 2px solid',
            },
            '&:after': {
                borderBottom: '#3e8563 2px solid',
            },
            "&&&&:hover:before": {
                borderBottom: '#59BF8E 2px solid'
              }
          },
        }}
});

class AppRouter extends React.Component {

    state = {
        renderHeader: false,
        test: true
    }

    verifyUser = (nextState, replace) => {
        axios.get(
            '/api/user_role',
            {
                headers: {'Content-type': 'application/json'}
            }
        ).then((data) => {
            const result = data['data'];
            console.log(result);
            if (result) {
                replace('/error');
                //this.props.history.push("/error");
            }
            /*else {
                this.props.history.push("/error")
            } */
        })
    }

    render() {
        console.log('test')
        
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <div> 
                        <NavHeader />
                        <Switch>
                            <Route path="/" component={LoginPage} exact={true} />
                            <Route path="/dash" component={DashboardPage} exact />
                            <Route path="/test/:id" component={StudentGoalsPage} exact={true} />
                            <Route path="/changeGoals/:id/:fullname/:calorie_goal/:protein_goal/:fats_goal/:carbs_goal" component={ChangeGoalsPage} />
                            <Route path={"/verified/true"} component={DashboardPage} exact/>
                            <Route path="/progress/:id" component={ProgressPage} exact={true} />
                            <Route path="/error" component={ErrorPage} exact={true} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    }

}

export default (AppRouter)