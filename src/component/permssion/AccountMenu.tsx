import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Avatar, Grid, makeStyles, Popover, Typography } from '@material-ui/core';
import { AuthenModel } from '../../rematch/Authen';
import { useSelector } from 'react-redux';
import { dispatch, RootState } from '../../rematch/store';
import { cssInfo } from '../../constants/Other';
import { MdAccountCircle } from 'react-icons/md';
import Button from '../common/Button';
import { Divider } from '@material-ui/core';
import { HiOutlineLogout } from 'react-icons/hi';
import { useGlobalStyles } from '../../theme/GlobalStyle';

type Props = {};
const useStyle = makeStyles((theme) => ({
    root: {
        height: cssInfo.heightMenu,
    },
    iconAccount: {
        fontSize: 40,
    },
    nameAccount: {
        paddingLeft: theme.spacing(1),
    },
    popover: {
        '& > .MuiPopover-paper': {
            boxShadow: theme.shadows[1],
            border: `1px solid ${theme.palette.divider}`,
        },
    },
    btnActionOption: {
        justify: 'left',
        textAlign: 'left',
    },
    frAvt: {
        height: 50,
        width: 50,
        overflow: 'hidden',
        borderRadius: '50%',
        border: `1px solid ${theme.palette.divider}`,
    },
}));
function AccountMenu(props: Props) {
    const classes = useStyle();
    const globalStyle = useGlobalStyles();
    const [state, setState] = useState();
    const authen: AuthenModel = useSelector<RootState>((state) => state.authen) as AuthenModel;
    useEffect(() => {
        return () => {};
    }, []);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Grid container className={classes.root} alignContent="center" alignItems="center">
            <Button onClick={handleClick}>
                <Grid alignContent="center" alignItems="center" container>
                    <Grid>
                        {!authen.info?.avt && <MdAccountCircle className={classes.iconAccount} />}
                        {authen.info?.avt && (
                            <Grid className={classes.frAvt}>
                                <img
                                    style={{
                                        width: 50,
                                    }}
                                    src={authen.info?.avt}
                                />
                            </Grid>
                        )}
                    </Grid>

                    <Grid className={classes.nameAccount}>{authen.info?.fullName}</Grid>
                </Grid>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                className={classes.popover}
            >
                <Grid className={globalStyle.pp2}>
                    <Grid container alignContent="center" alignItems="center">
                        <Grid>
                            <Avatar variant="rounded">{authen.info?.fullName?.substring(0, 2)}</Avatar>
                        </Grid>
                        <Grid className={globalStyle.pp2}>
                            <Typography variant="body2">{authen.info?.fullName}</Typography>
                            <Typography variant="caption">{authen.info?.email}</Typography>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container className={globalStyle.pt2}>
                        <Button
                            onClick={() => {
                                dispatch.authen.logOut();
                            }}
                            className={classes.btnActionOption}
                            fullWidth
                            startIcon={<HiOutlineLogout />}
                        >
                            Đăng xuất ra
                        </Button>
                    </Grid>
                </Grid>
            </Popover>
        </Grid>
    );
}

export default React.memo(AccountMenu);
