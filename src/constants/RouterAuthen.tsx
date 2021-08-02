import React, { useMemo } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { createBrowserHistory } from 'history';
import { InfoMe } from '../afi-manager-base-model/model/InfoMe';
import AuthenMenuScreen from 'src/container/AuthenMenuScreen';
export const history = createBrowserHistory({});

export function AuthenMenu({ ...props }: iProtectRoute) {
    return useMemo(
        () => (
            <Route
                path={props.path}
                render={({ location }) => (
                    // props.authen?.role == "admin"
                    <AuthenMenuScreen>
                        <props.component />
                    </AuthenMenuScreen>
                )}
            />
        ),
        [props],
    );
}

export function AuthenRoute({ ...props }: iProtectRoute) {
    return useMemo(
        () => (
            <Route
                exact={props.exact}
                path={props.path}
                render={({ location }) =>
                    Boolean(props.authen?.role) ? (
                        <props.component />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: location },
                            }}
                        />
                    )
                }
            />
        ),
        [props],
    );
}
export function PublicRoute({ ...props }: iProtectRoute) {
    return <Route exact={props.exact} path={props.path} render={({ location }) => <props.component />} />;
}

export const goTo = (path: string) => {
    history.push(path);
};

interface iProtectRoute extends iRoute {
    authen: InfoMe | undefined;
}

export interface iRoute {
    exact?: boolean;
    path: string;
    component: any;
    requireGuest?: boolean;
    requireAuth?: boolean;
}
