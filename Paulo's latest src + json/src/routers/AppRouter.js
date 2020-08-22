import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import DashboardPage from '../components/DashboardPage';
import NavHeader from '../components/NavHeader';
import StudentGoalsPage from '../components/StudentGoalsPage';
import ChangeGoalsPage from '../components/ChangeGoalsPage';
import TestPage from '../components/TestPage';
import LoginPage from '../components/LoginPage';

export default class AppRouter extends React.Component {

    state = {
        renderHeader: false,
    }

    handleLogin = (e) => {
        this.setState({renderHeader: true});
    }

    handleLogout = (e) => {
        this.setState({renderHeader: false}, () => {console.log(this.state.renderHeader);});
    }

    render() {
        return (
            <BrowserRouter>
                <div> 
                    {(this.state.renderHeader) ? <NavHeader onLogout={this.handleLogout}/> : null}
                    <Switch>
                        <Route path="/" render={(props) => <LoginPage {...props} onLogin={this.handleLogin} onLogout={this.handleLogout}/>} exact={true} />
                        <Route path="/dash" exact component={DashboardPage} />
                        <Route path="/test" component={StudentGoalsPage} exact={true} />
                        <Route path="/changeGoals/:id/:fullname/:calorie_goal/:protein_goal/:fats_goal/:carbs_goal" component={ChangeGoalsPage} />
                        <Route path={"/verified/true"} component={DashboardPage} exact/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }

}