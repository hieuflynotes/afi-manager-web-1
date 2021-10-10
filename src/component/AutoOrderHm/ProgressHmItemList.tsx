import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Button, Card, Chip, Grid, makeStyles, Paper, Popover, Tooltip, Typography } from '@material-ui/core';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { IoCopyOutline, IoCreateOutline } from 'react-icons/io5';
import { IconButton } from '@material-ui/core';
import TextDesc from '../common/TextDesc';
import { OrderTracking } from 'src/afi-manager-base-model/model/OrderTracking';
import theme from 'src/theme/MuiTheme';
import { checkoutCode, checkoutCodeAle } from 'src/constants/IMacros';
import { dispatch } from '../../rematch/store';
import { Giftcard } from '../../container/hm-manager/ProgressAutoOrder';
import { calcBuyPrice, calcBuyPriceOrder } from 'src/helper/CalculatorHmPrice';
import { cssInfo } from 'src/constants/Other';
import { GiTwoCoins } from 'react-icons/gi';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import { BiKey } from 'react-icons/bi';
import { mathCeilWithRound } from 'src/helper/NumberUtils';
import { AiOutlineSplitCells } from 'react-icons/ai';
import { isDangerousPrice } from 'src/helper/CheckBestOptionForOrder';
import { UserHm } from 'src/afi-manager-base-model/model/UserHm';
type Props = {
    item: OrderTracking;
    userHm: UserHm;
    giftCard: Giftcard;
    updateOrderId: (item: OrderTracking) => void;
    onSplitOrder?: (item: OrderTracking) => void;
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
    frCoinBought: {
        color: theme.palette.primary.main,
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
function ProgressHmItemList(props: Props) {
    const classes = useStyle();
    const globalStyle = useGlobalStyles();

    const [state, setState] = useState<{
        isOpenMoreInfo: boolean;
        isCanSplit: boolean;
    }>({
        isOpenMoreInfo: false,
        isCanSplit: false,
    });

    const refChipInfo = useRef(null);

    const getChipStatus = (item: OrderTracking): React.ReactElement => {
        if (item.orderId) {
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

        if (item.isRegister && !item.isOrder) {
            return <Chip label={'Registed'} />;
        }

        if (!item.isRegister) {
            return <Chip label={'Created'} />;
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

    const handleCopyToolMarcro = () => {
        if (props.item.isOrder || props.item.errorDesc) {
            navigator.clipboard.writeText(
                checkoutCodeAle(
                    props.item.email || 'email@gmail.com',
                    props.item.userHM?.password || '123456a@',
                    props.giftCard.serialNumber,
                    props.giftCard.pin,
                    Number(props.item.totalPrice || '0'),
                ),
            );
            dispatch.notification.success('Copy thành công nà  !!!');
        } else {
            dispatch.notificationPopup.success({
                message: 'Cái này chưa chạy tool xong mà, không copy đươc đâu ',
                title: 'Gì zạ, cái gì zạ !!',
            });
        }
    };

    useEffect(() => {
        return () => {};
    }, []);

    const checkIsCanSplit = (item: OrderTracking): boolean => {
        const orderHm = props.item;
        let isCanSplit = false;
        if (orderHm.errorDesc) {
            if ((orderHm.productOrder?.length || 0) >= 2) {
                isCanSplit = true;
            }
            if (
                orderHm.productOrder &&
                orderHm.productOrder.length > 0 &&
                (orderHm.productOrder[0].quantity || 0) >= 2
            ) {
                isCanSplit = true;
            }
        }
        return isCanSplit;
    };

    return (
        <Grid
            className={classes.root}
            style={{ border: isDangerousPrice(props.item.totalPrice || 0, props.userHm) ? '1px solid red' : '' }}
        >
            <Grid container justify="space-between">
                <Grid xs={6} container item>
                    <Popover
                        id={props.item.id || ''}
                        open={state.isOpenMoreInfo}
                        anchorEl={refChipInfo.current}
                        onClose={() => {
                            setState({ ...state, isOpenMoreInfo: false });
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Grid className={classes.popoverRoot}>
                            <Typography>Đăng kí bởi: {props.item.registerByName}</Typography>
                            <Typography>Checkout bởi : {props.item.dataFirebase?.username}</Typography>
                        </Grid>
                    </Popover>
                    <Grid onClick={() => setState({ ...state, isOpenMoreInfo: true })} ref={refChipInfo}>
                        <Grid container alignItems="center">
                            {props.item.errorDesc && (
                                <Chip
                                    style={{
                                        background: theme.palette.error.light,
                                        marginRight: '5px',
                                    }}
                                    color="primary"
                                    label={props.item.errorDesc}
                                />
                            )}
                            {getChipStatus(props.item)}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end" xs={6}>
                    <Grid>
                        <IconButton
                            onClick={() => {
                                handleCopyToolMarcro();
                            }}
                            size="small"
                        >
                            <IoCopyOutline />
                        </IconButton>

                        {checkIsCanSplit(props.item) && (
                            <IconButton
                                onClick={() => {
                                    props.onSplitOrder && props.onSplitOrder(props.item);
                                }}
                                size="small"
                            >
                                <AiOutlineSplitCells />
                            </IconButton>
                        )}

                        <IconButton
                            onClick={() => {
                                props.updateOrderId(props.item);
                            }}
                            size="small"
                            color="primary"
                        >
                            <IoCreateOutline />
                        </IconButton>
                    </Grid>
                </Grid>
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

                // style={{
                //     minHeight: 80,
                // }}
            >
                {props.item?.productOrder?.map((product) => {
                    return (
                        <Grid xs={6}>
                            <Grid container className={clsx(globalStyle.pt1, globalStyle.pb1)} wrap="nowrap">
                                <Grid
                                    container
                                    alignItems="center"
                                    style={{
                                        width: 50,
                                    }}
                                >
                                    <a
                                        href={`https://www2.hm.com/en_gb/productpage.${product.productId}.html`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={
                                                product.img ||
                                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi0T_mmYmCbAvnqj89zuDtPvOta_zEUQjSLg&usqp=CAU'
                                            }
                                            alt=""
                                            style={{
                                                width: 50,
                                                // border: '1px solid #dddddd',
                                            }}
                                        />
                                    </a>
                                </Grid>
                                <Grid className={globalStyle.pp1}>
                                    <Grid container justify="space-between">
                                        <Grid container>
                                            <Grid container alignContent="center">
                                                <Typography>{product.productId}</Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                >{`(${product.quantity})`}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Typography variant="caption">Size:{product.size}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
            <Grid container className={clsx(globalStyle.pt1)} justifyContent="center">
                <Grid xs={4}>
                    <Grid
                        className={clsx(globalStyle.pr1, classes.frCoin)}
                        style={{
                            color:
                                props.item.totalPrice && props.item.totalPrice > 5
                                    ? undefined
                                    : theme.palette.success.main,
                        }}
                    >
                        <Grid container alignItems="center" className={classes.rootItem} justify="center">
                            <Grid className={clsx(classes.coin)}>
                                <GiTwoCoins />
                            </Grid>
                            <Grid>
                                <Typography variant="body2">
                                    {mathCeilWithRound(props.item.totalPrice || 0, 2)} (Gốc)
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={4}>
                    <Grid className={clsx(globalStyle.pr1, classes.frCoinBuy)}>
                        <Grid container alignItems="center" className={classes.rootItem} justify="center">
                            <Grid className={clsx(classes.coin)}>
                                <GiTwoCoins />
                            </Grid>
                            <Grid>
                                <Typography variant="body2">
                                    {`${calcBuyPriceOrder(props.item.productOrder || [])}`} (Cần trả)
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {props.item.orderId && props.item.orderId.length > 0 && (
                    <Grid xs={4}>
                        <Grid className={clsx(globalStyle.pr1, classes.frCoinBought)}>
                            <Grid container alignItems="center" className={classes.rootItem} justify="center">
                                <Grid className={clsx(classes.coin)}>
                                    <GiTwoCoins />
                                </Grid>
                                <Grid>
                                    <Typography variant="body2">
                                        {props.item.dataFirebase && props.item.dataFirebase?.total
                                            ? props.item.dataFirebase?.total + ' (Đã trả)'
                                            : 'Check tay nha :(('}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}

export default ProgressHmItemList;
