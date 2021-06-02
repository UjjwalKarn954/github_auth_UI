import ActionOutput from '@components/ActionOutput';
import AuthRedirect from '@pages/AuthRedirect';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard" */ /* webpackPrefetch: true */ '@pages/Dashboard'));

export const Routes: React.SFC = () => (
    <Suspense fallback={<span>Loading ...</span>}>
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/github/callback" component={AuthRedirect} />
            <Route exact path="/:repo/logs" component={ActionOutput} />
        </Switch>
    </Suspense>
);
