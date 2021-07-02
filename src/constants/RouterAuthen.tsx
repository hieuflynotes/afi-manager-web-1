import React, { useMemo } from "react";
import { Redirect, Route } from "react-router-dom";

import { createBrowserHistory } from "history";
export const history = createBrowserHistory({});

// Auth route componnet

export function AdminRouter({ role, ...props }: iProtectRoute) {
	const check = () => {
		// if (role == Role.ADMIN) return true;
		return false;
	};
	return useMemo(
		() => (
			<Route
				path={props.path}
				render={({ location }) =>
					check() ? (
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
		[role, props]
	);
}

export function BusinessRouter({ role, ...props }: iProtectRoute) {
	const check = () => {
		// if (role == Role.ADMIN || role == Role.BUSINESS) return true;
		return false;
	};
	return useMemo(
		() => (
			<Route
				path={props.path}
				render={({ location }) =>
					check() ? (
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
		[role, props]
	);
}

// Guest route component
export function GuestRouter({ role, ...props }: iProtectRoute) {
	const check = () => {
		return false;
	};
	return useMemo(
		() => (
			<Route
				exact={props.exact}
				path={props.path}
				render={({ location }) =>
					check() ? (
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
		[role, props]
	);
}
export function PublicRoute({ role, ...props }: iProtectRoute) {
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
	role: any;
}

export interface iRoute {
	exact?: boolean;
	path: string;
	component: any;
	requireGuest?: boolean;
	requireAuth?: boolean;
}
