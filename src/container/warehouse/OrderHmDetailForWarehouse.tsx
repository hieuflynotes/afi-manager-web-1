import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Grid, makeStyles, MenuItem, Select, Typography, Zoom } from '@material-ui/core';
import ListGrid from '../../component/common/ListGrid';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { useParams } from 'react-router-dom';
import { orderTrackingController } from 'src/controller';
import theme from 'src/theme/MuiTheme';
import { DataFirebaseHm, OrderTracking } from 'src/afi-manager-base-model/model/OrderTracking';
import { IconButton } from '@material-ui/core';
import { IoDownloadOutline } from 'react-icons/io5';
import { dispatch } from '../../rematch/store';
import { countBoughtProduct, countProduct, totalAmount, totalCompletedAmount } from 'src/helper/CalculatorHmPrice';
import { firebaseConfig } from 'src/constants/FirebaseConfig';
import _ from 'lodash';
import { UserHm } from 'src/afi-manager-base-model/model/UserHm';
import OrderHmDetailForWarehouseItemList from 'src/component/warehouse/OrderHmDetailForWarehouseItemList';
import { downloadOrders } from 'src/helper/DownloadOrder';

type Props = {};
const useStyle = makeStyles((theme) => ({
    statuses: {
        '& p': {
            padding: 10,
            paddingTop: 5,
            paddingBottom: 5,
        },
    },
    giftCardForm: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: 16,
        '& .MuiFormControl-fullWidth': {
            marginTop: 16,
        },
    },
}));

export enum OrderStatus {
    none = 'none',
    initial = 'initial',
    created = 'created',
    addedToCard = 'addedToCard',
    done = 'done',
    error = 'error',
}
function OrderHmDetailForWarehouse(props: Props) {
    const { userHmId } = useParams<{ userHmId: string }>();
    const [userHm, setUserHm] = useState<UserHm>({} as UserHm);
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(OrderStatus.none);

    const [state, setState] = useState<{ isListening: boolean; orderTracking: OrderTracking[] }>({
        isListening: false,
        orderTracking: [],
    });

    const classes = useStyle();
    const globalStyle = useGlobalStyles();
    const onListeningNotication = () => {
        var getDos = firebaseConfig.firestore().collection('notication_order_update').doc(userHmId.toString());
        console.log({
            userHmId,
        });
        getDos.onSnapshot(
            {
                includeMetadataChanges: true,
            },
            function (doc) {
                setState({
                    ...state,
                    isListening: true,
                });
                if (doc.data()) {
                    const dataFromFirbase: DataFirebaseHm | undefined = doc.data();
                    const checkItem = state.orderTracking?.find((item) => {
                        return item.orderId == dataFromFirbase?.orderId;
                    });

                    if (!checkItem) {
                        // dispatch.notification.success(
                        //     `C???p nh???t orderId th??nh c??ng ${dataFromFirbase?.orderId} - ${dataFromFirbase?.email}`,
                        // );
                    }
                    refeshList();
                }
            },
        );
    };

    const refeshList = () => {
        orderTrackingController.orderHmDetailForWarehouse({ orderHmId: userHmId }).then((res) => {
            setState({
                ...state,
                orderTracking: orderByEmail(res.rows || []) || [],
            });
        });
    };

    const orderByEmail = (orderTrackings: OrderTracking[]): OrderTracking[] => {
        return _.sortBy(orderTrackings, (item) => getIndexEmailAfiOrderHm(item), 'desc');
    };
    const getIndexEmailAfiOrderHm = (item: OrderTracking): number => {
        let textSplit = item.email || '';
        let startSplit = textSplit.lastIndexOf('+hm');
        if (startSplit < 0) {
            startSplit = textSplit.lastIndexOf('+afi');
        }
        startSplit += 4;
        const endSplit = textSplit.indexOf('@gmail.com');
        const indexOfEmail = Number((textSplit = textSplit.substring(startSplit, endSplit)));
        return indexOfEmail;
    };

    useEffect(() => {
        const body: any = document.querySelector('#root');
        refeshList();
        body.scrollIntoView(
            {
                behavior: 'smooth',
            },
            500,
        );
    }, []);

    // useEffect(() => {
    //     onChagngeGiftCard(giftCard);
    // }, [giftCard]);

    const filterByStatus = (rows: OrderTracking[]): OrderTracking[] => {
        return rows?.filter((r) => {
            let isValid = false;
            switch (selectedStatus) {
                case OrderStatus.done:
                    isValid = r.orderId != null && r.orderId.length > 0;
                    break;
                case OrderStatus.error:
                    isValid = r.errorDesc != null && r.errorDesc.length > 0;
                    break;
                case OrderStatus.addedToCard:
                    isValid =
                        (r.orderId == null || r.orderId.length === 0) &&
                        (r.errorDesc == null || r.errorDesc.length === 0) &&
                        r.isOrder
                            ? r.isOrder
                            : false;
                    break;
                case OrderStatus.created:
                    isValid =
                        (r.orderId == null || r.orderId.length === 0) &&
                        (r.errorDesc == null || r.errorDesc.length === 0) &&
                        (r.isOrder == null || r.isOrder === false) &&
                        r.isRegister
                            ? r.isRegister
                            : false;
                    break;
                case OrderStatus.initial:
                    isValid =
                        (r.orderId == null || r.orderId.length === 0) &&
                        (r.errorDesc == null || r.errorDesc.length === 0) &&
                        (r.isOrder == null || r.isOrder === false) &&
                        (r.isRegister == null || r.isRegister === false)
                            ? true
                            : false;
                    break;
                default:
                    isValid = true;
                    break;
            }
            return isValid;
        });
    };

    const renderOrderStatusSummary = () => {
        return (
            <Grid container className={classes.statuses} justify="center">
                <Typography>Total Order: {state.orderTracking.length}</Typography>
                <Typography>Registed: {state.orderTracking.filter((i) => i.isRegister).length}</Typography>
                <Typography>Added to cart: {state.orderTracking.filter((i) => i.isOrder).length}</Typography>
                <Typography>Complete: {state.orderTracking.filter((i) => i.orderId).length}</Typography>
                <Typography>Error: {state.orderTracking.filter((i) => i.errorDesc).length}</Typography>
            </Grid>
        );
    };

    const renderPaymentStatusSummary = () => {
        return (
            <Grid container className={classes.statuses} justify="center">
                <Typography>Totol amount: {totalAmount(state.orderTracking || [])}</Typography>

                <Typography>Total completed amount: {totalCompletedAmount(state.orderTracking || [])}</Typography>

                <Typography>Total products: {countProduct(state.orderTracking || [])}</Typography>

                <Typography>Total products purchased : {countBoughtProduct(state.orderTracking || [])}</Typography>
            </Grid>
        );
    };

    return (state.orderTracking.length || 0) > 0 ? (
        <Grid
            container
            style={{
                minHeight: '100vh',
                background: 'white',
                padding: theme.spacing(1),
            }}
        >
            <Grid container justify="center" className={clsx(globalStyle.pp2)}>
                <Grid md={10}>
                    <Grid container justify="center">
                        <Typography align="center" variant="h4">
                            Chi ti???t ????n h??ng
                            <IconButton
                                onClick={() => {
                                    downloadOrders(state.orderTracking || []);
                                    dispatch.notification.success('Download successfully!');
                                }}
                                size="small"
                            >
                                <IoDownloadOutline />
                            </IconButton>
                        </Typography>
                        {renderPaymentStatusSummary()}
                    </Grid>

                    <Select
                        fullWidth
                        variant="outlined"
                        value={selectedStatus}
                        onChange={(e) => {
                            setSelectedStatus(e.target.value as OrderStatus);
                        }}
                    >
                        <MenuItem value={OrderStatus.none}>All</MenuItem>
                        <MenuItem value={OrderStatus.initial}>Kh???i t???o</MenuItem>
                        <MenuItem value={OrderStatus.created}>???? t???o t??i kho???n</MenuItem>
                        <MenuItem value={OrderStatus.addedToCard}>???? th??m v??o gi??? h??ng</MenuItem>
                        <MenuItem value={OrderStatus.done}>???? thanh to??n</MenuItem>
                        <MenuItem value={OrderStatus.error}>L???i</MenuItem>
                    </Select>

                    <Grid container className={clsx(globalStyle.pt2, globalStyle.pb2)}>
                        <ListGrid minWidthItem={'320px'} gridGap={20}>
                            {filterByStatus(state.orderTracking || []).map((item, index) => (
                                <Zoom in={true} timeout={index * 50}>
                                    <Grid>
                                        <OrderHmDetailForWarehouseItemList item={item} />
                                    </Grid>
                                </Zoom>
                            ))}
                        </ListGrid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ) : (
        <Grid container justify="center">
            <Typography variant="h2">T??i kho???n n??y ch??a ti???n h??nh l???y order ho???c order b??? tr???ng</Typography>
        </Grid>
    );
}

export default React.memo(OrderHmDetailForWarehouse);
