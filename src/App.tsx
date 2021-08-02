/* eslint-disable eqeqeq */
import { Grid } from '@material-ui/core';
import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router } from 'react-router';

import {
    // BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import BackdropLoading from './component/common/BackdropLoading';
import { routers, TypeScreen } from './constants/Route';
import { AuthenRoute, history, PublicRoute, AuthenMenu } from './constants/RouterAuthen';
// import "./i18n/config";
import { Dispatch, RootState } from './rematch/store';

function App() {
    const authen = useSelector((state: RootState) => state.authen);
    const notification = useSelector((state: RootState) => state.notification);
    const dispatch = useDispatch<Dispatch>();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (notification.message) {
            enqueueSnackbar(notification.message, {
                variant: notification.type,
            });
        }
    }, [notification]);
    useEffect(() => {
        dispatch.authen.getMe();
    }, []);
    return (
        <Router history={history}>
            {authen.isGet ? (
                <Grid>
                    <BackdropLoading />
                    <TransitionGroup>
                        <CSSTransition classNames="fade" timeout={3000}>
                            <Switch>
                                {routers.map((route) => {
                                    if (route.typeAuthen === TypeScreen.authenMenu) {
                                        return (
                                            <AuthenMenu
                                                exact
                                                component={route.component}
                                                path={route.link}
                                                authen={authen.info}
                                            />
                                        );
                                    } else if (route.typeAuthen === TypeScreen.authenNotMenu) {
                                        return (
                                            <AuthenRoute
                                                exact
                                                component={route.component}
                                                path={route.link}
                                                authen={authen.info}
                                            />
                                        );
                                    } else if (route.typeAuthen === TypeScreen.public) {
                                        return <Route exact component={route.component} path={route.link} />;
                                    } else {
                                        return (
                                            <PublicRoute
                                                exact
                                                component={route.component}
                                                path={route.link}
                                                authen={undefined}
                                            />
                                        );
                                    }
                                })}
                                <Route
                                    path="*"
                                    render={({ location }) => (
                                        <Redirect
                                            to={{
                                                pathname: '/login',
                                            }}
                                        />
                                    )}
                                />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </Grid>
            ) : (
                <Grid></Grid>
            )}
        </Router>
    );
}

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={3}>
            <App />
        </SnackbarProvider>
    );
}
