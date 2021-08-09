/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Grid,
    Hidden,
    HiddenProps,
    IconButton,
    makeStyles,
    Typography,
    Slide,
    Popover,
} from '@material-ui/core';
import transitions from '@material-ui/core/styles/transitions';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { CgPlayListRemove } from 'react-icons/cg';
import { FiChevronDown } from 'react-icons/fi';
import { IoLogOutOutline } from 'react-icons/io5';
import { VscMenu } from 'react-icons/vsc';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import { dispatch } from 'src/rematch/store';

import { cssInfo } from '../../constants/Other';
import { localStoryController } from '../../controller';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import theme from '../../theme/MuiTheme';
import Button from './Button';
import ListGrid from './ListGrid';
export interface RouteComponent {
    id?: string;
    link: string;
    icon: React.ReactElement;
    label: string;
    action?: (item?: RouteComponent) => void;
    subMenu?: RouteComponent[];
}
type Props = {
    route: (RouteComponent | undefined)[];
    leftComponent?: React.ReactElement;
    isHiddenTopBar?: boolean;
    onActionNavBar?: (isHidden: boolean) => void;
    screenShowNavBar?: 'xs' | 'sm' | 'md' | 'lg';
};
const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: 1000,
    },
    topBar: {
        position: 'fixed',
        left: 0,
        top: 0,
        height: cssInfo.heightMenu,
        zIndex: 1000,
        background: 'white',
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    narBar: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        background: 'white', // todo : hard code
        boxShadow: theme.shadows[1],
        width: cssInfo.widthNarBar,
        zIndex: 1000,
        overflow: 'hidden',
        transition: '0.3s',
    },
    menuItem: {
        padding: theme.spacing(2),
        textDecoration: 'none',
        cursor: 'pointer',
        display: 'flex',
        color: theme.palette.grey[900],
        alignItems: 'center',
        position: 'relative',
        '&:hover > div': {
            display: 'block',
            transition: '0.5s',
            top: 55,
            left: 0,
        },
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    menuItemNavBar: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        paddingLeft: theme.spacing(0),
        textDecoration: 'none',
        cursor: 'pointer',
        color: theme.palette.grey[900],
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    frSubMenu: {
        // display: "none",
        position: 'absolute',
        left: 0,
        top: -500,
        background: 'none',
        minWidth: 180,
        padding: theme.spacing(1),
    },
    subMenu: {
        background: 'white',
    },
    styleActive: {
        color: theme.palette.primary.main,
        fontWeight: 600,
    },
    styleActiveNavBar: {
        color: theme.palette.primary.main,
        fontWeight: 600,
        borderLeft: `4px solid ${theme.palette.primary.main}`,
        transition: '0.1s',
    },
    frLogoNavBar: {
        width: '100%',
    },
    iconNarBar: {
        padding: `0px ${theme.spacing(2)}px`,
        fontSize: '1.2rem',
    },
    itemExpend: {
        boxShadow: 'none',
        width: '100%',
        border: 'none',
        padding: 0,
        margin: 0,
    },
    subMenuNarBar: {
        padding: 0,
        paddingLeft: theme.spacing(4),
    },
    fixPadding: {
        paddingLeft: '0 !important',
        '& .MuiAccordionSummary-content': {
            padding: 0,
            margin: 0,
        },
    },
    iconNavigation: {
        position: 'fixed',
        background: 'white',
        borderRadius: `0px ${theme.spacing(2)}px ${theme.spacing(2)}px 0px `,
        top: theme.spacing(1),
        width: 60,
        display: 'flex',
        justifyContent: 'flex-end',
        zIndex: 1001,
        left: cssInfo.widthNarBar - 60,
        fontSize: '2rem',
        transition: '0.3s',
        color: theme.palette.primary.main,
    },
    popover: {
        '& > .MuiPopover-paper': {
            boxShadow: theme.shadows[0],
            // border: `1px solid ${theme.palette.divider}`,
        },
        zIndex: `800 !important` as any,
        padding: theme.spacing(3),
    },
    popoverContentSubmenu: {
        width: '100vw',
        padding: theme.spacing(3),
        position: 'relative',
        zIndex: 1200,
    },
    popoverItemSubmenu: {
        '&:hover *': {
            color: theme.palette.primary.main,
        },
    },
    iconSubmenuPopover: {
        fontSize: '2rem',
        padding: theme.spacing(1),
        color: theme.palette.grey[700],
    },
}));
export default function NavBar(props: Props) {
    const [state, setState] = useState<{
        hiddenNavBar: boolean;
        subMenu: RouteComponent[];
        idSelectSubMenu: string;
    }>({
        hiddenNavBar: false,
        subMenu: [],
        idSelectSubMenu: '',
    });

    const menuElement = useRef(null);

    const history = useHistory();
    const classes = useStyles();
    const globalStyle = useGlobalStyles();

    const handleChangeHiddenNarBar = (isShow: boolean) => {
        setState({ ...state, hiddenNavBar: isShow });
        localStoryController.setShowNavBar(isShow);
    };
    let math = useRouteMatch();

    const isActive = (item: RouteComponent): boolean => {
        if (item.link === math.path) {
            return true;
        } else if (item.subMenu && item.subMenu.length > 0) {
            const size = item.subMenu.length;
            for (let i = 0; i < size; i++) {
                if (item.subMenu[i].link === math.path) {
                    return true;
                }
            }
        }
        return false;
    };
    const menuItemIcon = (item: RouteComponent): React.ReactElement => {
        return (
            <Grid>
                <NavLink
                    to={item.link || '/'}
                    onClick={(e) => {
                        if (item.link) {
                            history.push(item.link);
                        }
                        e.stopPropagation();
                        e.preventDefault();
                        item.action && item.action();
                    }}
                    className={clsx(classes.menuItemNavBar, isActive(item) && classes.styleActiveNavBar)}
                >
                    <Grid container alignItems="center" alignContent="center">
                        <Grid className={classes.iconNarBar}>{item.icon}</Grid>
                        <Grid>{item.label}</Grid>
                    </Grid>
                </NavLink>
            </Grid>
        );
    };
    const NavBarLeft = (): React.ReactElement => {
        return (
            <Grid
                className={classes.narBar}
                style={{
                    width: state.hiddenNavBar ? 0 : cssInfo.widthNarBar,
                    height: state.hiddenNavBar ? 0 : '100vh',
                    borderRadius: state.hiddenNavBar ? 100 : 0,
                }}
                direction="column"
                justify="space-between"
                container
            >
                <Grid
                    style={{
                        width: cssInfo.widthNarBar,
                    }}
                >
                    <Grid className={classes.frLogoNavBar}>
                        <Grid
                            className={clsx(globalStyle.pp2, globalStyle.pl4)}
                            container
                            justify="flex-start"
                            style={{
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                history.push('/');
                            }}
                        >
                            <img style={{ width: 80 }} src="https://dev-giftcard.web.app/image/logo.png" />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid>
                        {props.route.map((item, index) => {
                            if (item && item.subMenu && item.subMenu.length > 0) {
                                return (
                                    <Slide in={true} timeout={(index + 1) * 200} direction="up">
                                        <Grid container>
                                            <Accordion className={clsx(classes.itemExpend)}>
                                                <AccordionSummary
                                                    className={classes.fixPadding}
                                                    expandIcon={<FiChevronDown />}
                                                >
                                                    {menuItemIcon(item)}
                                                </AccordionSummary>
                                                <AccordionDetails className={classes.subMenuNarBar}>
                                                    <Grid
                                                        style={{
                                                            marginTop: -10,
                                                        }}
                                                    >
                                                        {item.subMenu.map((subMenu) => menuItemIcon(subMenu))}
                                                    </Grid>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Grid>
                                    </Slide>
                                );
                            }
                            if (item) {
                                return (
                                    <Slide in={true} timeout={(index + 1) * 200} direction="up">
                                        <Grid>{menuItemIcon(item)}</Grid>
                                    </Slide>
                                );
                            }
                        })}
                    </Grid>
                </Grid>
                <Grid className={globalStyle.pp2}>
                    <Button
                        startIcon={<IoLogOutOutline />}
                        fullWidth
                        color={'primary'}
                        size="small"
                        onClick={() => {
                            dispatch.authen.logOut();
                        }}
                    >
                        Đăng xuất ra
                    </Button>
                </Grid>
            </Grid>
        );
    };
    const Menu = () => {
        return (
            <Grid justify="center" className={classes.topBar} container ref={menuElement}>
                <Popover
                    id={'sub-menu'}
                    open={Boolean(state.subMenu.length)}
                    anchorEl={menuElement.current}
                    onClose={() => setState({ ...state, subMenu: [], idSelectSubMenu: '' })}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    className={classes.popover}
                >
                    <Grid container className={classes.popoverContentSubmenu} justify="center">
                        <Grid lg={10} item>
                            <Grid>
                                {state.subMenu.map((item) => (
                                    <Button
                                        style={{
                                            minWidth: 200,
                                            marginRight: theme.spacing(3),
                                        }}
                                        className={clsx(
                                            (isActive(item) && classes.styleActive) || '',
                                            classes.popoverItemSubmenu,
                                        )}
                                        onClick={() => {
                                            history.push(item.link);
                                            setState({ ...state, subMenu: [], idSelectSubMenu: '' });
                                        }}
                                    >
                                        <Grid container alignItems="center" alignContent="center">
                                            <Grid
                                                item
                                                className={classes.iconSubmenuPopover}
                                                style={{
                                                    color: isActive(item) ? theme.palette.primary.main : undefined,
                                                }}
                                            >
                                                {item.icon}
                                            </Grid>
                                            <Grid item>{item.label}</Grid>
                                        </Grid>
                                    </Button>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Popover>
                <Grid container lg={10} alignContent="center" alignItems="center" justify="space-between">
                    <Grid>
                        <Grid container alignContent="center" alignItems="center">
                            <Grid
                                className={clsx(globalStyle.pl3, globalStyle.pr3)}
                                style={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    history.push('/');
                                }}
                            >
                                <img style={{ width: 80 }} src="https://dev-giftcard.web.app/image/logo.png" />
                            </Grid>
                            <Grid style={{ display: 'flex' }}>
                                {props.route.map((item) => {
                                    if (item && item.subMenu && item.subMenu.length > 0) {
                                        return (
                                            <Grid
                                                className={clsx(
                                                    classes.menuItem,
                                                    (state.idSelectSubMenu == item.id || isActive(item)) &&
                                                        classes.styleActive,
                                                )}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (
                                                        Boolean(state.subMenu?.length) &&
                                                        state.idSelectSubMenu == item.id
                                                    ) {
                                                        setState({
                                                            ...state,
                                                            subMenu: [],
                                                            idSelectSubMenu: '',
                                                        });
                                                        return;
                                                    }
                                                    setState({
                                                        ...state,
                                                        subMenu: item.subMenu || [],
                                                        idSelectSubMenu: item.id || '',
                                                    });

                                                    // Boolean(item.link) && history.push(item.link);
                                                }}
                                            >
                                                <Typography>{item.label}</Typography>
                                                <FiChevronDown
                                                    style={{
                                                        transform: `rotate(${
                                                            state.idSelectSubMenu == item.id ? 180 : 0
                                                        }deg)`,
                                                        transition: '0.3s',
                                                    }}
                                                />
                                            </Grid>
                                        );
                                    }
                                    if (item) {
                                        return (
                                            <NavLink
                                                to={item.link}
                                                exact={true}
                                                onClick={(e) => {
                                                    if (!Boolean(item.link)) {
                                                        e.preventDefault();
                                                    }
                                                    item.action && item.action();
                                                }}
                                                activeStyle={{
                                                    borderBottom: `3px solid ${theme.palette.primary.main}`,
                                                }}
                                                className={classes.menuItem}
                                                activeClassName={classes.styleActive}
                                            >
                                                <Typography>{item.label}</Typography>
                                            </NavLink>
                                        );
                                    }
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid>{props.leftComponent}</Grid>
                </Grid>
            </Grid>
        );
    };
    const iconNavigation = (): React.ReactElement => {
        return (
            <Grid
                style={{
                    left: state.hiddenNavBar ? 0 : undefined,
                }}
                className={classes.iconNavigation}
            >
                <IconButton
                    onClick={(e) => {
                        handleChangeHiddenNarBar(!state.hiddenNavBar);
                    }}
                >
                    {state.hiddenNavBar ? (
                        <VscMenu
                            style={{
                                animation: 'rotate 1s',
                            }}
                        />
                    ) : (
                        <CgPlayListRemove
                            style={{
                                animation: 'rotate 1s',
                            }}
                        />
                    )}
                </IconButton>
            </Grid>
        );
    };
    useEffect(() => {
        props.onActionNavBar && props.onActionNavBar(state.hiddenNavBar);
    }, [state.hiddenNavBar]);
    useEffect(() => {
        setState({
            ...state,
            hiddenNavBar: localStoryController.getShowNarBar(),
        });
    }, []);
    const checkScreenDownMenu = (): HiddenProps => {
        if (props.screenShowNavBar === 'xs') return { xsDown: true };
        else if (props.screenShowNavBar === 'sm') return { smDown: true };
        else if (props.screenShowNavBar === 'md') return { mdDown: true };
        else if (props.screenShowNavBar === 'lg') return { lgDown: true };
        else return { xsDown: true };
    };
    const checkScreenDownNarBar = (): HiddenProps => {
        if (props.screenShowNavBar === 'xs') return { smUp: true };
        else if (props.screenShowNavBar === 'sm') return { mdUp: true };
        else if (props.screenShowNavBar === 'md') return { lgUp: true };
        else if (props.screenShowNavBar === 'lg') return { xlUp: true };
        else return { smUp: true };
    };
    return (
        <Grid container className={classes.root}>
            {!props.isHiddenTopBar ? (
                <>
                    <Hidden {...checkScreenDownMenu()}>{Menu()}</Hidden>
                    <Hidden {...checkScreenDownNarBar()}>{iconNavigation()}</Hidden>
                    <Hidden {...checkScreenDownNarBar()}>
                        {state.hiddenNavBar && <Grid container className={clsx(classes.topBar)}></Grid>}

                        {NavBarLeft()}
                    </Hidden>
                </>
            ) : (
                <>
                    <>{iconNavigation()}</>
                    <>{NavBarLeft()}</>
                </>
            )}
        </Grid>
    );
}
