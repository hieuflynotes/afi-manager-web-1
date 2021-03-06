import React from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';
import Login from 'src/container/Login';
import { AiFillDashboard, AiOutlineLineChart } from 'react-icons/ai';
import CheckTrackingHM from 'src/container/CheckTrackingHM';
import Register from 'src/container/Register';
import ToolAutoChangeTextHM from 'src/container/tool/ToolAutoChangeTextHM';
import UserHmManager from 'src/container/hm-manager/UserHmManager';
import ProgressAutoOrder from 'src/container/hm-manager/ProgressAutoOrder';
import ExportExcel from 'src/container/hm-manager/ExportExcel';
import { FaFileCsv, FaUserCheck } from 'react-icons/fa';
import StaticByUserHm from 'src/container/hm-manager/StaticByUserHm';
import FixDataTool from 'src/container/hm-manager/FixDataTool';
import SyncData from 'src/container/hm-manager/SyncData';
import { FiXOctagon } from 'react-icons/fi';
import { TiArrowSyncOutline, TiThMenuOutline } from 'react-icons/ti';
import StatisticAleTeam from 'src/container/hm-manager/StatisticAleTeam';
import PermissionContainer from 'src/container/permission/PermissionContainer';
import RoleContainer from 'src/container/permission/RoleContainer';
import SetupRoleContainer from 'src/container/permission/SetupRoleContainer';
import UserManager from 'src/container/permission/UserManager';
import SetupMenu from 'src/container/permission/SetupMenu';
import SetupMenuContainer from 'src/container/permission/SetupMenuContainer';
import { RiBillLine } from 'react-icons/ri';
import { GoTextSize } from 'react-icons/go';
import { MdLocalShipping } from 'react-icons/md';
import { GiHand } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi';
import UiKit from 'src/container/UiKit';
import OrderHmWarehouse from 'src/container/warehouse/OrderHmWarehouse';
import OrderHmDetailForWarehouse from 'src/container/warehouse/OrderHmDetailForWarehouse';
import LoginWithCode from 'src/container/LoginWithCode';
import RedirectToSystemSalesManager from 'src/container/permission/RedirectToSystemSalesManager';
export enum TypeScreen {
    public = 'public',
    authenMenu = 'authenMenu',
    authenNotMenu = 'authenNotMenu',
}

export const routers: RouteComponent[] = [
    {
        component: UiKit,
        label: 'UI Kit',
        link: '/ui-kit',
        typeAuthen: TypeScreen.authenMenu,
        icon: <AiFillDashboard />,
    },
    {
        component: Login,
        label: 'Login',
        link: '/login',
        typeAuthen: TypeScreen.public,
        icon: <AiFillDashboard />,
    },
    {
        component: ToolAutoChangeTextHM,
        label: 'Tool change text',
        link: '/tool-change-text',
        typeAuthen: TypeScreen.authenMenu,
        icon: <GoTextSize />,
    },
    {
        component: UserHmManager,
        label: 'User HM',
        link: '/user-hm',
        typeAuthen: TypeScreen.authenMenu,
        icon: <RiBillLine />,
    },
    {
        component: ProgressAutoOrder,
        label: 'Progress',
        link: '/progress-order/:userHmId',
        typeAuthen: TypeScreen.authenMenu,
        icon: <AiFillDashboard />,
    },
    {
        component: ExportExcel,
        label: 'Export Data',
        link: '/export-data',
        typeAuthen: TypeScreen.authenMenu,
        icon: <FaFileCsv />,
    },
    {
        component: FixDataTool,
        label: 'Fix data',
        link: '/fix-data-tool',
        typeAuthen: TypeScreen.authenMenu,
        icon: <FiXOctagon />,
    },
    {
        component: StatisticAleTeam,
        label: 'Statistic Ale Team',
        link: '/statistic-ale-team',
        typeAuthen: TypeScreen.authenMenu,
        icon: <AiOutlineLineChart />,
    },

    {
        component: StaticByUserHm,
        label: 'Statistic user',
        link: '/statistic-user-hm',
        typeAuthen: TypeScreen.authenMenu,
        icon: <AiOutlineLineChart />,
    },

    {
        component: CheckTrackingHM,
        label: 'Check Tracking',
        link: '/check-tracking',
        typeAuthen: TypeScreen.authenMenu,
        icon: <MdLocalShipping />,
    },
    {
        component: PermissionContainer,
        label: 'Permssion',
        link: '/permission',
        typeAuthen: TypeScreen.authenMenu,
        icon: <GiHand />,
    },
    {
        component: RoleContainer,
        label: 'Role',
        link: '/role',
        typeAuthen: TypeScreen.authenMenu,
        icon: <FaUserCheck />,
    },
    {
        component: SetupMenuContainer,
        label: 'Role',
        link: '/setup-menu',
        typeAuthen: TypeScreen.authenMenu,
        icon: <TiThMenuOutline />,
    },
    {
        component: SetupRoleContainer,
        label: 'Role',
        link: '/role/:id',
        typeAuthen: TypeScreen.authenMenu,
        icon: <AiFillDashboard />,
    },
    {
        component: UserManager,
        label: 'User Manager',
        link: '/user-manager',
        typeAuthen: TypeScreen.authenMenu,
        icon: <HiUserGroup />,
    },
    {
        component: SetupMenu,
        label: 'Setup Menu',
        link: '/setup-menu/:id',
        typeAuthen: TypeScreen.authenMenu,
        icon: <AiFillDashboard />,
    },
    {
        component: OrderHmWarehouse,
        label: 'Order HM',
        link: '/order-hm-warehouse',
        typeAuthen: TypeScreen.authenMenu,
        icon: <RiBillLine />,
    },
    {
        component: OrderHmDetailForWarehouse,
        label: 'Order HM',
        link: '/order-hm-warehouse/:userHmId',
        typeAuthen: TypeScreen.authenMenu,
        icon: <RiBillLine />,
    },
    {
        component: LoginWithCode,
        label: 'Login with code',
        link: '/loginWithCode/:code',
        typeAuthen: TypeScreen.authenMenu,
        icon: <RiBillLine />,
    },
    {
        component: RedirectToSystemSalesManager,
        label: 'Qu???n l?? b??n h??ng',
        link: '/redirect/sale-manager',
        typeAuthen: TypeScreen.authenMenu,
        icon: <RiBillLine />,
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
    component: React.ComponentType<any> | React.ComponentType<RouteComponentProps<any, StaticContext, any>>;
    typeAuthen: TypeScreen;
    icon: React.ReactElement;
    label: string;
}
