import React from "react";
import { RouteComponentProps, StaticContext } from "react-router";



export const routers: RouteComponent[] = [
	// {
	// 	component: Login,
	// 	label: "Login",
	// 	link: "/login",
	// 	typeAuthen: Role.NONE,
	// },
];

// export const getRouteByRole = (role: Role): string => {
// 	if (role === Role.ADMIN) return "/business";
// 	if (role ===  Role.BUSINESS) return "/customer";
// 	else return "/search-tracking";
// };
export const routersMap = new Map(routers.map((item) => [item.link, item]));

export interface RouteComponent {
	link: string;
	component:
		| React.ComponentType<any>
		| React.ComponentType<RouteComponentProps<any, StaticContext, any>>;
	// typeAuthen: Role;
	icon: React.ReactElement;
	label: string;
}
