import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { FaKey } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { RiAccountPinBoxFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import NavBar, { RouteComponent } from 'src/component/common/NavBar';
import AccountMenu from 'src/component/permssion/AccountMenu';
import { localStoryController } from 'src/controller';
import { cssInfo } from '../constants/Other';
import { routersMap } from '../constants/Route';
import { Dispatch, RootState } from '../rematch/store';

const useStyle = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        // background: theme.palette.background.default,
    },
    navbar: {
        // width: cssInfo.widthNarBar,
        position: 'fixed',
        height: '100vh',
        zIndex: 1000,
        // background: theme.palette.background.default,
    },
    main: {
        // marginLeft: cssInfo.widthNarBar,
        paddingTop: 70,
        // paddingLeft: 230,
        flex: 1,
        height: '100vh',
        transition: '0.3s',
    },
}));
type Props = {
    children: React.ReactElement;
};
const link = [
    '/user-hm',
    '/statistic-user-hm',
    '/check-tracking',
    '/permission',
    '/role',
    '/user-manager',
    '/setup-menu',
];
function AuthenMenuScreen(props: Props) {
    const classes = useStyle();
    const [route, setRoute] = useState<RouteComponent[]>([]);
    const authen = useSelector((state: RootState) => state.authen);
    const [hiddenNavBar, setHiddenNavBar] = useState<boolean>();
    const dispath = useDispatch<Dispatch>();
    useEffect(() => {
        let menu: RouteComponent[] = [];
        menu = authen?.info?.menu?.menu || [];

        menu = menu
            .map((item) => {
                return getDefault(item);
            })
            .filter((item) => Boolean(item)) as any;

        setRoute(menu);
    }, [authen]);

    const getDefault = (item: RouteComponent): RouteComponent => {
        const defaultLink = routersMap.get(item.link);
        return {
            ...item,
            icon: defaultLink?.icon || <AiFillDashboard />,
            link: defaultLink?.link || '',
            label: item.label,
            subMenu: item.subMenu?.map((sub) => getDefault(sub)) || [],
        };
    };
    return (
        <Grid>
            <Grid className={classes.root} container direction="column" justify="center">
                <Grid className={classes.navbar}>
                    <NavBar
                        onActionNavBar={(hidden: boolean) => {
                            setHiddenNavBar(hidden);
                        }}
                        screenShowNavBar="md"
                        leftComponent={<AccountMenu />}
                        route={route}
                    />
                </Grid>
                <Grid container justify="center">
                    <Grid lg={10} md={12} xs={12} sm={12}>
                        <Grid className={classes.main}>{props.children}</Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
export default AuthenMenuScreen;
