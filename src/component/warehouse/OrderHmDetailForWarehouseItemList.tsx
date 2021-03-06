import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Button, Card, Chip, Grid, makeStyles, Paper, Popover, Tooltip, Typography } from '@material-ui/core';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { IoCopyOutline, IoCreateOutline } from 'react-icons/io5';
import { IconButton } from '@material-ui/core';
import TextDesc from '../common/TextDesc';
import { OrderTracking } from 'src/afi-manager-base-model/model/OrderTracking';
import theme from 'src/theme/MuiTheme';
import { checkoutCode } from 'src/constants/IMacros';
import { dispatch } from '../../rematch/store';
import { Giftcard } from '../../container/hm-manager/ProgressAutoOrder';
import { cssInfo } from 'src/constants/Other';
import { GiTwoCoins } from 'react-icons/gi';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import { BiKey } from 'react-icons/bi';
type Props = {
    item: OrderTracking;
};
const useStyle = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(2),
    },
    rootItem: {
        borderRadius: theme.spacing(1),
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1),
    },
    frCoin: {
        color: cssInfo.colorCoin,
    },
    frCoinBuy: {
        color: theme.palette.error.main,
    },
    icon: {
        fontSize: '1.5rem',
        paddingRight: theme.spacing(1),
    },
    coin: {
        fontSize: '1.5rem',
        paddingRight: theme.spacing(1),
    },
    popoverRoot: {
        padding: theme.spacing(1),
    },
}));
function OrderHmDetailForWarehouseItemList(props: Props) {
    const classes = useStyle();
    const globalStyle = useGlobalStyles();

    const [state, setState] = useState<{
        isOpenMoreInfo: boolean;
    }>({
        isOpenMoreInfo: false,
    });

    const refChipInfo = useRef(null);

    const getChipStatus = (item: OrderTracking): React.ReactElement => {
        if (item.errorDesc) {
            return (
                <Chip
                    style={{
                        background: theme.palette.error.light,
                    }}
                    color="primary"
                    label={item.errorDesc}
                />
            );
        }
        if (item.isOrder && item.orderId) {
            return (
                <Chip
                    style={{
                        background: theme.palette.success.light,
                    }}
                    color="primary"
                    label={item.orderId}
                />
            );
        }
        if (item.isOrder) {
            return <Chip label={'Added to cart'} />;
        }
        if (!item.isRegister) {
            return <Chip label={'Created'} />;
        }
        if (item.isRegister && !item.isOrder) {
            return <Chip label={'Registed'} />;
        }
        
     
        return <></>;
    };

    const getStatusText = (item: OrderTracking): string => {
        if (!item.isRegister) {
            return 'Created';
        }
        if (item.isRegister && !item.isOrder) {
            return 'Registed';
        }
        if (item.isOrder && item.orderId) {
            return item.orderId || '';
        }
        if (item.isOrder) {
            return 'Added to cart';
        }
        return '';
    };

    useEffect(() => {
        return () => {};
    }, []);

    return (
        <Grid className={classes.root}>
            <Grid container justify="space-between">
                <Grid>{getChipStatus(props.item)}</Grid>
            </Grid>
            <Grid className={clsx(globalStyle.mt1, globalStyle.mb1)}>
                <Grid container alignItems="center">
                    <Grid className={classes.icon}>
                        <RiAccountPinCircleFill />
                    </Grid>
                    <Grid>
                        <Typography variant="h6">{props.item.email}</Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid className={globalStyle.pr1}>
                        <BiKey />
                    </Grid>
                    <Grid>
                        <Typography variant="caption">{props.item.userHM?.password}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                container
                className={clsx(globalStyle.pt1, globalStyle.pb1)}
                style={{
                    minHeight: 80,
                }}
            >
                {props.item?.productOrder?.map((product) => {
                    return (
                        <Grid container>
                            <Grid container justify="space-between">
                                <Grid>
                                    <Grid container alignContent="center">
                                        <Typography>{product.productId}</Typography>
                                        <Typography
                                            variant="caption"
                                            color="textSecondary"
                                        >{`(${product.quantity})`}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <Typography variant="caption">Size:{product.size}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
            <Grid container className={clsx(globalStyle.pt1)}>
                <Grid xs={12}>
                    <Grid
                        className={clsx(globalStyle.pr1, classes.frCoin)}
                        // style={{
                        //     color:
                        //         props.item.totalPrice && props.item.totalPrice > 5
                        //             ? undefined
                        //             : theme.palette.success.main,
                        // }}
                    >
                        <Grid container alignItems="center" className={classes.rootItem} justify="center">
                            <Grid className={clsx(classes.coin)}>
                                <GiTwoCoins />
                            </Grid>
                            <Grid>
                                <Typography>{props.item.totalPrice} (Price)</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid xs={6}>
                    <Grid className={clsx(globalStyle.pr1, classes.frCoinBuy)}>
                        <Grid container alignItems="center" className={classes.rootItem} justify="center">
                            <Grid className={clsx(classes.coin)}>
                                <GiTwoCoins />
                            </Grid>
                            <Grid>
                                <Typography>{`${calcBuyPrice(props.item.totalPrice || 0)}`} (Price Buy)</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> */}
            </Grid>
        </Grid>
    );
}

export default React.memo(OrderHmDetailForWarehouseItemList);
