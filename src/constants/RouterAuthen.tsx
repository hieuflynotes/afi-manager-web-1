import React, { useMemo } from "react";
import { Redirect, Route } from "react-router-dom";

import { createBrowserHistory } from "history";
import AdminScreen from "../container/AdminScreen";
import { InfoMe } from "../afi-manager-base-model/model/InfoMe";
import AfiScreen from "src/container/AfiScreen";
export const history = createBrowserHistory({});

// Auth route componnet
export function AdminRoute({ ...props }: iProtectRoute) {
    return useMemo(
        () => (
            <Route
                path={props.path}
                render={({ location }) =>
                    // props.authen?.role == "admin"
                    true ? (
                        <AdminScreen>
                            <props.component />
                        </AdminScreen>
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    )
                }
            />
        ),
        [props]
    );
}

export function AfiRoute({ ...props }: iProtectRoute) {
    return useMemo(
        () => (
            <Route
                path={props.path}
                render={({ location }) => (
                    // props.authen?.role == "admin"
                    <AfiScreen>
                        <props.component />
                    </AfiScreen>
                )}
            />
        ),
        [props]
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
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    )
                }
            />
        ),
        [props]
    );
}
export function PublicRoute({ ...props }: iProtectRoute) {
    return (
        <Route
            exact={props.exact}
            path={props.path}
            render={({ location }) => <props.component />}
        />
    );
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
