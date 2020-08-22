import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import DashboardPage from '../components/DashboardPage';
import ProgressPage from '../components/ProgressPage';
import NavHeader from '../components/NavHeader';
import StudentGoalsPage from '../components/StudentGoalsPage';
import ChangeGoalsPage from '../components/ChangeGoalsPage';
import TestPage from '../components/TestPage';

const AppRouter = () => (
    <BrowserRouter>
        <div> 
            <NavHeader />
            <Switch>
                <Route path="/" component={DashboardPage} exact={true} />
                <Route path="/test" component={StudentGoalsPage} exact={true} />
                <Route path="/changeGoals/:id/:fullname/:calorie_goal/:protein_goal/:fats_goal/:carbs_goal" component={ChangeGoalsPage} />
                <Route path={"/verified/true"} component={DashboardPage} exact/>
                <Route path={"/logout"} exact component={TestPage}/>
                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/progress" component={ProgressPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;