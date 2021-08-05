import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Grid, makeStyles, MenuItem, Select, Typography, Zoom } from '@material-ui/core';
import TextField from '../../component/common/TextFiled';
import ListGrid from '../../component/common/ListGrid';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { useCrudHook } from '../../hook/useCrudHook';
import { Pagination } from '@material-ui/lab';
import { useParams } from 'react-router-dom';
import { hMController, orderTrackingController, userHmController } from 'src/controller';
import theme from 'src/theme/MuiTheme';
import { DataFirebaseHm, OrderTracking } from 'src/afi-manager-base-model/model/OrderTracking';
import ProgressHmItemList from 'src/component/AutoOrderHm/ProgressHmItemList';
import PopupAddOrderId from 'src/component/AutoOrderHm/PopupEditProgressAutoOrder';
import { ListFilter } from 'luong-base-model/lib';
import { mathCeilWithRound } from 'src/helper/NumberUtils';
import { IconButton } from '@material-ui/core';
import { IoCopyOutline, IoDownload, IoDownloadOutline } from 'react-icons/io5';
import { dispatch } from '../../rematch/store';
import { countBoughtProduct, countProduct } from 'src/helper/CalculatorHmPrice';
import { firebaseConfig } from 'src/constants/FirebaseConfig';
import _ from 'lodash';
import { UserHm } from 'src/afi-manager-base-model/model/UserHm';
import { addAddress } from 'src/constants/IMacros';
import OrderHmDetailForWarehouseItemList from 'src/component/warehouse/OrderHmDetailForWarehouseItemList';
import { downloadCSV } from 'src/helper/DownloadUtils';

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

    const [state, setState] = useState<{ isListening: boolean }>({
        isListening: false,
    });

    const crudTrackingHM = useCrudHook<OrderTracking, ListFilter<OrderTracking>>({
        controller: orderTrackingController,
        listController: orderTrackingController.listForProgress,
        initQuery: {
            searchFields: ['orderId', 'trackingId', 'customerName', 'email'],
            sort: ['totalPrice', 'email'],
            pageSize: 1000,
            filter: {
                userHMId: userHmId,
            },
        },
        onAfterQuery: () => {
            if (state.isListening == false) {
                onListeningNotication();
            }
        },
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
                    const checkItem = crudTrackingHM.pagingList.rows?.find((item) => {
                        return item.orderId == dataFromFirbase?.orderId;
                    });

                    if (!checkItem) {
                        // dispatch.notification.success(
                        //     `Cập nhật orderId thành công ${dataFromFirbase?.orderId} - ${dataFromFirbase?.email}`,
                        // );
                    }
                    crudTrackingHM.onRefreshList();
                }
            },
        );
    };
    useEffect(() => {
        const body: any = document.querySelector('#root');

        body.scrollIntoView(
            {
                behavior: 'smooth',
            },
            500,
        );
        userHmController.list({ filter: { id: userHmId } }).then((paging) => {
            if (paging && paging.rows && paging.rows.length > 0) {
                setUserHm(paging.rows[0]);
            }
        });
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
                <Typography>Total Order: {crudTrackingHM.pagingList?.rows?.length}</Typography>
                <Typography>Registed: {crudTrackingHM.pagingList?.rows?.filter((i) => i.isRegister).length}</Typography>
                <Typography>
                    Added to cart: {crudTrackingHM.pagingList?.rows?.filter((i) => i.isOrder).length}
                </Typography>
                <Typography>Complete: {crudTrackingHM.pagingList?.rows?.filter((i) => i.orderId).length}</Typography>
                <Typography>Error: {crudTrackingHM.pagingList?.rows?.filter((i) => i.errorDesc).length}</Typography>
            </Grid>
        );
    };

    const renderPaymentStatusSummary = () => {
        return (
            <Grid container className={classes.statuses} justify="center">
                <Typography>
                    Totol Money:{' '}
                    {mathCeilWithRound(
                        crudTrackingHM.pagingList?.rows
                            ?.map((r) => r.totalPrice || 0)
                            .reduce((price, total) => (total += price), 0) || 0,
                        2,
                    )}
                </Typography>

                <Typography>
                    Total money for done:{' '}
                    {mathCeilWithRound(
                        crudTrackingHM.pagingList?.rows
                            ?.filter((i) => i.orderId != null && i.orderId.length > 0)
                            .map((r) => r.totalPrice || 0)
                            .reduce((price, total) => (total += price), 0) || 0,
                        2,
                    )}
                </Typography>

                <Typography>Total products: {countProduct(crudTrackingHM.pagingList?.rows || [])}</Typography>

                <Typography>
                    Total products purchased : {countBoughtProduct(crudTrackingHM.pagingList?.rows || [])}
                </Typography>
            </Grid>
        );
    };

    return (crudTrackingHM.pagingList?.rows?.length || 0) > 0 ? (
        <Grid
            container
            style={{
                minHeight: '100vh',
                background: 'white',
                padding: theme.spacing(1),
            }}
        >
            <PopupAddOrderId
                isDisplay={crudTrackingHM.isShowPopup}
                item={crudTrackingHM.itemSelected}
                onCancel={crudTrackingHM.onCancelPopup}
                onEdit={crudTrackingHM.onSave}
            />
            <Grid container justify="center" className={clsx(globalStyle.pp2)}>
                <Grid md={10}>
                    <Grid container justify="center">
                        <Typography align="center" variant="h4">
                            Chi tiết đơn hàng
                            <IconButton
                                onClick={() => {
                                    downloadCSV(crudTrackingHM.pagingList.rows?.map(r => ({
                                        email: r.email,
                                        status: r.errorDesc && r.errorDesc.length>0 ? r.errorDesc : "Done",
                                        orderId: r.orderId,
                                        price: r.totalPrice,
                                        products: r.productOrder?.map(p => `${p.productId}: £${p.price}`).join('; ')
                                    })) || [])
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
                        <MenuItem value={OrderStatus.initial}>Khởi tạo</MenuItem>
                        <MenuItem value={OrderStatus.created}>Đã tạo tài khoản</MenuItem>
                        <MenuItem value={OrderStatus.addedToCard}>Đã thêm vào giỏ hàng</MenuItem>
                        <MenuItem value={OrderStatus.done}>Đã thanh toán</MenuItem>
                        <MenuItem value={OrderStatus.error}>Lỗi</MenuItem>
                    </Select>

                    <Grid container className={clsx(globalStyle.pt2, globalStyle.pb2)}>
                        <ListGrid minWidthItem={'320px'} gridGap={20}>
                            {filterByStatus(crudTrackingHM.pagingList?.rows || []).map((item, index) => (
                                <Zoom in={true} timeout={index * 50}>
                                    <Grid>
                                        <OrderHmDetailForWarehouseItemList item={item} />
                                    </Grid>
                                </Zoom>
                            ))}
                        </ListGrid>
                    </Grid>
                    <Grid container justify="center" className={clsx(globalStyle.pt2, globalStyle.pb2)}>
                        <Pagination
                            count={crudTrackingHM.pagingList.totalPages || 1}
                            page={crudTrackingHM.pagingList.page || 1}
                            variant="outlined"
                            shape="rounded"
                            onChange={(e, page) => {
                                crudTrackingHM.setQuery({
                                    ...crudTrackingHM.query,
                                    page: page,
                                });
                            }}
                            color="primary"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ) : (
        <Grid container justify="center">
            <Typography variant="h2">Tài khoản này chưa tiến hành lấy order hoặc order bị trống</Typography>
        </Grid>
    );
}

export default React.memo(OrderHmDetailForWarehouse);
