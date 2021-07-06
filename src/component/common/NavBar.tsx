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
} from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { CgPlayListRemove } from "react-icons/cg";
import { FiChevronDown } from "react-icons/fi";
import { VscMenu } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { RootState } from "src/rematch/store";
import theme from "src/theme/MuiTheme";
import { cssInfo } from "../../constants/Other";
import { localStoryController } from "../../controller";
import { useGlobalStyles } from "../../theme/GlobalStyle";
export interface RouteComponent {
    link: string;
    icon: React.ReactElement;
    label: string;
    action?: (item?: RouteComponent) => void;
    subMenu?: RouteComponent[];
}
type Props = {
    route: RouteComponent[];
    isHiddenTopBar?: boolean;
    onActionNavBar?: (isHidden: boolean) => void;
    screenShowNavBar?: "xs" | "sm" | "md" | "lg";
};
const useStyles = makeStyles((theme) => ({
    root: {
        padding: 10,
        margin: 10,
    },
    topBar: {
        position: "fixed",
        left: 0,
        top: 0,
        padding: theme.spacing(1),
        zIndex: 1000,
        background: "white",
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    narBar: {
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        background: "white", // todo : hard code
        boxShadow: theme.shadows[1],
        // width: cssInfo.widthNarBar,
        zIndex: 1000,
        overflow: "hidden",
        transition: "0.3s",
    },
    menuItem: {
        padding: theme.spacing(2),
        textDecoration: "none",
        color: theme.palette.text.hint,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        position: "relative",
        "&:hover > div": {
            display: "block",
        },
        "&:hover": {
            color: theme.palette.primary.main,
        },
    },
    menuItemNavBar: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        paddingLeft: theme.spacing(0),
        marginLeft: theme.spacing(2),
        textDecoration: "none",
        color: theme.palette.text.hint,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        position: "relative",
        "&:hover": {
            color: theme.palette.primary.main,
        },
    },
    subMenu: {
        display: "none",
        position: "absolute",
        right: 0,
        top: "3rem",
        background: "white",
        padding: theme.spacing(2),
        boxShadow: theme.shadows[2],
        minWidth: 180,
    },
    styleActive: {
        color: theme.palette.primary.main,
        borderBottom: `3px solid ${theme.palette.primary.main}`,
    },
    styleActiveNavBar: {
        color: theme.palette.primary.main,
        fontWeight: 600,
        borderLeft: `4px solid ${theme.palette.primary.main}`,
        transition: "0.1s",
    },
    frLogoNavBar: {
        width: "100%",
    },
    iconNarBar: {
        padding: `0px ${theme.spacing(2)}px`,
        fontSize: "1.2rem",
    },
    itemExpend: {
        boxShadow: "none",
        border: "none",
        padding: 0,
        margin: 0,
    },
    subMenuNarBar: {
        padding: 0,
        paddingLeft: theme.spacing(4),
    },
    fixPadding: {
        paddingLeft: "0 !important",
        "& .MuiAccordionSummary-content": {
            padding: 0,
            margin: 0,
        },
    },
    iconNavigation: {
        position: "fixed",
        background: "white",
        borderRadius: `0px ${theme.spacing(2)}px ${theme.spacing(2)}px 0px `,
        top: theme.spacing(1),
        width: 60,
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 1001,
        left: cssInfo.widthNarBar - 60,
        fontSize: "2rem",
        transition: "0.3s",
        color: theme.palette.primary.main,
    },
}));
export default function NavBar(props: Props) {
    const authen = useSelector((state: RootState) => state.authen);
    const [state, setState] = useState<{
        hiddenNavBar: boolean;
    }>({
        hiddenNavBar: false,
    });
    const history = useHistory();
    const classes = useStyles();
    const globalStyle = useGlobalStyles();
    const itemNarBar = (item: RouteComponent): React.ReactElement => (
        <Grid container alignItems="center" alignContent="center">
            <Grid className={classes.iconNarBar}>{item.icon}</Grid>
            <Grid>{item.label}</Grid>
        </Grid>
    );
    const handleChangeHiddenNarBar = (isShow: boolean) => {
        setState({ ...state, hiddenNavBar: isShow });
        localStoryController.setShowNavBar(isShow);
    };
    const NavBarLeft = (): React.ReactElement => {
        return (
            <Grid
                className={classes.narBar}
                style={{
                    width: state.hiddenNavBar ? 0 : cssInfo.widthNarBar,
                    height: state.hiddenNavBar ? 0 : "100vh",
                    borderRadius: state.hiddenNavBar ? 100 : 0,
                }}
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
                        >
                            <img
                                style={{ width: 80 }}
                                src="https://dev-giftcard.web.app/image/logo.png"
                            />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid>
                        {props.route.map((item) => {
                            if (item.subMenu && item.subMenu.length > 0) {
                                return (
                                    <Grid container>
                                        <Accordion
                                            className={clsx(classes.itemExpend)}
                                        >
                                            <AccordionSummary
                                                className={classes.fixPadding}
                                                expandIcon={<FiChevronDown />}
                                            >
                                                <NavLink
                                                    to={item.link || "/abc"}
                                                    activeClassName={
                                                        classes.styleActiveNavBar
                                                    }
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        Boolean(item.link) &&
                                                            history.push(
                                                                item.link
                                                            );
                                                        item.action &&
                                                            item.action();
                                                    }}
                                                    className={clsx(
                                                        classes.menuItemNavBar
                                                    )}
                                                    style={{ padding: 0 }}
                                                >
                                                    {itemNarBar(item)}
                                                </NavLink>
                                            </AccordionSummary>
                                            <AccordionDetails
                                                className={
                                                    classes.subMenuNarBar
                                                }
                                            >
                                                <Grid
                                                    style={{ marginTop: -10 }}
                                                >
                                                    {item.subMenu.map(
                                                        (subMenu) => (
                                                            <NavLink
                                                                to={
                                                                    subMenu.link ||
                                                                    "/abc"
                                                                }
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    !Boolean(
                                                                        subMenu.link
                                                                    ) &&
                                                                        e.preventDefault();
                                                                    subMenu.action &&
                                                                        subMenu.action();
                                                                }}
                                                                className={
                                                                    classes.menuItemNavBar
                                                                }
                                                                activeClassName={
                                                                    classes.styleActiveNavBar
                                                                }
                                                            >
                                                                {itemNarBar(
                                                                    subMenu
                                                                )}
                                                            </NavLink>
                                                        )
                                                    )}
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>
                                );
                            }
                            return (
                                <NavLink
                                    to={item.link}
                                    className={classes.menuItemNavBar}
                                    activeClassName={classes.styleActiveNavBar}
                                    onClick={(e) => {
                                        !Boolean(item.link) &&
                                            e.preventDefault();
                                        item.action && item.action();
                                    }}
                                >
                                    {itemNarBar(item)}
                                </NavLink>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
        );
    };
    const Menu = () => {
        return (
            <Grid justify="center" className={classes.topBar} container>
                <Grid
                    md={8}
                    container
                    justify="space-between"
                    alignContent="center"
                    alignItems="center"
                >
                    <Grid>
                        <img
                            style={{ width: 80 }}
                            src="https://dev-giftcard.web.app/image/logo.png"
                        />
                    </Grid>
                    {/*  */}
                    <Grid style={{ display: "flex" }}>
                        {props.route.map((item) => {
                            if (item.subMenu && item.subMenu.length > 0) {
                                return (
                                    <NavLink
                                        to={item.link || "/abc"}
                                        className={classes.menuItem}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            Boolean(item.link) &&
                                                history.push(item.link);
                                        }}
                                    >
                                        {item.label}
                                        <FiChevronDown />
                                        <Grid className={classes.subMenu}>
                                            {item.subMenu.map((subMenu) => (
                                                <Grid>
                                                    <NavLink
                                                        to={subMenu.link}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            !Boolean(
                                                                subMenu.link
                                                            ) &&
                                                                e.preventDefault();
                                                            subMenu.action &&
                                                                subMenu.action();
                                                        }}
                                                        className={
                                                            classes.menuItem
                                                        }
                                                        activeClassName={
                                                            classes.styleActive
                                                        }
                                                    >
                                                        {subMenu.label}
                                                    </NavLink>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </NavLink>
                                );
                            }
                            return (
                                <NavLink
                                    to={item.link}
                                    onClick={(e) => {
                                        if (!Boolean(item.link)) {
                                            e.preventDefault();
                                        }
                                        item.action && item.action();
                                    }}
                                    className={classes.menuItem}
                                    activeClassName={classes.styleActive}
                                >
                                    {item.label}
                                </NavLink>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
        );
    };
    const iconNavigation = (): React.ReactElement => {
        return (
            <Grid
                style={{
                    left: state.hiddenNavBar ? 0 : undefined,
                    boxShadow: state.hiddenNavBar
                        ? "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                        : "none",
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
                                animation: "rotate 1s",
                            }}
                        />
                    ) : (
                        <CgPlayListRemove
                            style={{
                                animation: "rotate 1s",
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
        if (props.screenShowNavBar == "sm") return { smDown: true };
        else if (props.screenShowNavBar == "md") return { mdDown: true };
        else if (props.screenShowNavBar == "lg") return { lgDown: true };
        else return { xsDown: true };
    };
    const checkScreenDownNarBar = (): HiddenProps => {
        if (props.screenShowNavBar == "sm") return { mdUp: true };
        else if (props.screenShowNavBar == "md") return { lgUp: true };
        else if (props.screenShowNavBar == "lg") return { xlUp: true };
        else return { smUp: true };
    };
    return (
        <Grid container>
            {!props.isHiddenTopBar ? (
                <>
                    <Hidden {...checkScreenDownMenu()}>{Menu()}</Hidden>
                    <Hidden {...checkScreenDownNarBar()}>
                        {iconNavigation()}
                    </Hidden>
                    <Hidden {...checkScreenDownNarBar()}>{NavBarLeft()}</Hidden>
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
