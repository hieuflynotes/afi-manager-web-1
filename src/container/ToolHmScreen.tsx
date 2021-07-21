import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { FaKey } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { RiAccountPinBoxFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import NavBar, { RouteComponent } from 'src/component/common/NavBar';
import { cssInfo } from '../constants/Other';
import { routersMap } from '../constants/Route';
import { Dispatch, RootState } from '../rematch/store';

const useStyle = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        background: theme.palette.background.default,
    },
    navbar: {
        // width: cssInfo.widthNarBar,
        position: 'fixed',
        height: '100vh',
        zIndex: 1000,
        // background: theme.palette.background.default,
    },
    main: {
        marginLeft: cssInfo.widthNarBar,
        // paddingTop: 50,
        // paddingLeft: 230,
        flex: 1,
        height: '100vh',
        transition: '0.3s',
    },
}));
type Props = {
    children: React.ReactElement;
};
const link = ['/export-data', '/statistic-user-hm'];
function ToolHmScreen(props: Props) {
    const classes = useStyle();
    const [route, setRoute] = useState<RouteComponent[]>([]);
    const [hiddenNavBar, setHiddenNavBar] = useState<boolean>();
    const dispath = useDispatch<Dispatch>();
    useEffect(() => {
        let menu: RouteComponent[] = [];
        menu = link.map((item) => {
            const get = routersMap.get(item);
            return {
                icon: get?.icon || <></>,
                label: get?.label || '',
                link: get?.link || '',
            };
        });
        menu.push({
            label: `Account`,
            icon: <RiAccountPinBoxFill />,
            link: '',
            subMenu: [
                {
                    label: 'Logout',
                    action: () => {
                        window.location.href = '/login';
                    },
                    link: '',
                    icon: <FiLogOut />,
                },
                // {
                //     label: "Change Password",
                //     link: "/change-password",
                //     icon: <FaKey />,
                // },
            ],
        });
        setRoute(menu);
    }, []);
    return (
        <Grid>
            <Grid className={classes.root} container direction="column">
                <Grid className={classes.navbar}>
                    <NavBar
                        onActionNavBar={(hidden: boolean) => {
                            setHiddenNavBar(hidden);
                        }}
                        isHiddenTopBar
                        route={route}
                    />
                </Grid>
                <Grid
                    className={classes.main}
                    style={{
                        marginLeft: hiddenNavBar ? 0 : cssInfo.widthNarBar,
                    }}
                >
                    {props.children}
                </Grid>
            </Grid>
        </Grid>
    );
}
export default ToolHmScreen;
