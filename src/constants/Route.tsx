import React from "react";
import { RouteComponentProps, StaticContext } from "react-router";
import Login from "src/container/Login";
import { AiFillDashboard } from "react-icons/ai";
import CheckTrackingHM from "src/container/CheckTrackingHM";
export enum TypeScreen {
    public = "public",
    admin = "admin",
    authen = "authen",
}

export const routers: RouteComponent[] = [
    {
        component: Login,
        label: "Login",
        link: "/login",
        typeAuthen: TypeScreen.public,
        icon: <AiFillDashboard />,
    },
    {
        component: CheckTrackingHM,
        label: "Check Tracking",
        link: "/check-tracking",
        typeAuthen: TypeScreen.admin,
        icon: <AiFillDashboard />,
    },
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
    typeAuthen: TypeScreen;
    icon: React.ReactElement;
    label: string;
}
