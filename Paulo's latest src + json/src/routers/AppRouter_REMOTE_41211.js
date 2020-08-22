import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import DashboardPage from '../components/DashboardPage';
import ProgressPage from '../components/ProgressPage';
import NavHeader from '../components/NavHeader';
import StudentGoalsPage from '../components/StudentGoalsPage';

const AppRouter = () => (
    <BrowserRouter>
        <div> 
            <NavHeader />
            <Switch>
                <Route path="/" component={DashboardPage} exact={true} />
                <Route path="/test" component={StudentGoalsPage} exact={true} />
                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/progress" component={ProgressPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;