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
import { DataFirebaseHm, OrderTracking, ProductOrder } from 'src/afi-manager-base-model/model/OrderTracking';
import ProgressHmItemList from 'src/component/AutoOrderHm/ProgressHmItemList';
import PopupAddOrderId from 'src/component/AutoOrderHm/PopupEditProgressAutoOrder';
import { ListFilter } from 'luong-base-model/lib';
import { mathCeilWithRound } from 'src/helper/NumberUtils';
import { IconButton } from '@material-ui/core';
import { IoCopyOutline } from 'react-icons/io5';
import { dispatch } from '../../rematch/store';
import { countBoughtProduct, countProduct } from 'src/helper/CalculatorHmPrice';
import { firebaseConfig } from 'src/constants/FirebaseConfig';
import _ from 'lodash';
import { UserHm } from 'src/afi-manager-base-model/model/UserHm';
import { addAddress } from 'src/constants/IMacros';
import PopupSplitOrder from 'src/component/AutoOrderHm/PopupSplitOrder';
import { handleWithPopupHook } from 'src/hook/HandleWithPopupHook';

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
function ProgressAutoOrder(props: Props) {
    const { userHmId } = useParams<{ userHmId: string }>();
    const [userHm, setUserHm] = useState<UserHm>({} as UserHm);
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(OrderStatus.none);
    const [giftCard, setGiftCard] = useState<Giftcard>({
        serialNumber: localStorage.getItem('serialNumber') || '',
        pin: localStorage.getItem('pin') || '',
    });

    const [state, setState] = useState<{ isListening: boolean }>({
        isListening: false,
    });

    const handleWithPopupSplit = handleWithPopupHook<OrderTracking>({});

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
                        dispatch.notification.success(
                            `Cập nhật orderId thành công ${dataFromFirbase?.orderId} - ${dataFromFirbase?.email}`,
                        );
                    }
                    crudTrackingHM.onRefreshList();
                }
            },
        );
    };
    useEffect(() => {
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
                <Typography>Tổng: {crudTrackingHM.pagingList?.rows?.length}</Typography>
                <Typography>
                    Đã tạo tài khoản: {crudTrackingHM.pagingList?.rows?.filter((i) => i.isRegister).length}
                </Typography>
                <Typography>
                    Đã thêm vào giỏ hàng: {crudTrackingHM.pagingList?.rows?.filter((i) => i.isOrder).length}
                </Typography>
                <Typography>Hoàn thành: {crudTrackingHM.pagingList?.rows?.filter((i) => i.orderId).length}</Typography>
                <Typography>
                    Lỗi: {crudTrackingHM.pagingList?.rows?.filter((i) => i.errorDesc).length}
                    <IconButton
                        color="secondary"
                        onClick={() => {
                            navigator.clipboard.writeText(
                                `Lỗi: ${
                                    countProduct(crudTrackingHM.pagingList?.rows || []) -
                                    countBoughtProduct(crudTrackingHM.pagingList?.rows || [])
                                } món\n${
                                    crudTrackingHM.pagingList?.rows
                                        ?.filter((i) => i.errorDesc != null && i.errorDesc.length > 0)
                                        .map(
                                            (r) =>
                                                `[${r.productOrder?.map((p) => p.productId).join(',')}]: ${
                                                    r.errorDesc
                                                }`,
                                        )
                                        .join('\n') || ''
                                }`,
                            );
                            dispatch.notification.success('Copy danh sách sản phẩm lỗi thành công!');
                        }}
                        size="small"
                    >
                        <IoCopyOutline />
                    </IconButton>
                </Typography>
            </Grid>
        );
    };

    const renderPaymentStatusSummary = () => {
        return (
            <Grid container className={classes.statuses} justify="center">
                <Typography>
                    Tổng tiền:{' '}
                    {mathCeilWithRound(
                        crudTrackingHM.pagingList?.rows
                            ?.map((r) => r.totalPrice || 0)
                            .reduce((price, total) => (total += price), 0) || 0,
                        2,
                    )}
                </Typography>

                <Typography>
                    Tổng tiền checkout:{' '}
                    {mathCeilWithRound(
                        crudTrackingHM.pagingList?.rows
                            ?.filter((i) => i.orderId != null && i.orderId.length > 0)
                            .map((r) => r.totalPrice || 0)
                            .reduce((price, total) => (total += price), 0) || 0,
                        2,
                    )}
                </Typography>

                <Typography>Tổng món: {countProduct(crudTrackingHM.pagingList?.rows || [])}</Typography>

                <Typography>Tổng món đã mua: {countBoughtProduct(crudTrackingHM.pagingList?.rows || [])}</Typography>
            </Grid>
        );
    };

    const handleClickSplitOrder = (item: OrderTracking) => {
        handleWithPopupSplit.handleShowPopup(item);
    };

    const onSplitWithMerge = (params: {
        orderTrackingOld: OrderTracking;
        orderTrackingNew: OrderTracking;
        productOrder: ProductOrder;
    }) => {
        orderTrackingController.splitOrderWithMerge(params).then((res) => {
            crudTrackingHM.onRefreshList();
            handleWithPopupSplit.handleClosePopup();
        });
    };

    const onSplitOrderWithNew = (params: { orderTrackingOld: OrderTracking; productOrder: ProductOrder }) => {
        orderTrackingController.splitOrderWithNew(params).then((res) => {
            crudTrackingHM.onRefreshList();
            handleWithPopupSplit.handleClosePopup();
        });
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
            <PopupSplitOrder
                isDisplay={handleWithPopupSplit.isDisplayPopup}
                item={handleWithPopupSplit.itemSelected}
                onCancel={handleWithPopupSplit.handleClosePopup}
                orderTrackings={crudTrackingHM.pagingList?.rows || []}
                onSplitWithMerge={onSplitWithMerge}
                onSplitWithNew={onSplitOrderWithNew}
            />
            <PopupAddOrderId
                isDisplay={crudTrackingHM.isShowPopup}
                item={crudTrackingHM.itemSelected}
                onCancel={crudTrackingHM.onCancelPopup}
                onEdit={crudTrackingHM.onSave}
            />
            <Grid container justify="center" className={clsx(globalStyle.pp2)}>
                <Grid>
                    <Grid container justify="center">
                        <Typography align="center" variant="h4">
                            Chi tiết đơn hàng
                            <IconButton
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        addAddress(userHm.emailCheckout || 'email', userHm.password || '123456a@', {
                                            lineAddress: userHm.address || '',
                                            flatHouse: userHm.address2 || '',
                                            town: userHm.town || '',
                                            postCode: userHm.postcode || '',
                                            firstName: userHm.firstName || '',
                                            lastName: userHm.lastName || '',
                                            phonenumber: userHm.phone || '',
                                        }),
                                    );
                                    dispatch.notification.success('Copy to clipboard successfully!');
                                }}
                                size="small"
                            >
                                <IoCopyOutline />
                            </IconButton>
                        </Typography>
                        {renderOrderStatusSummary()}
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

                    <div className={classes.giftCardForm}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Serial number"
                            size="medium"
                            value={giftCard.serialNumber}
                            onChange={(e) => {
                                setGiftCard({
                                    ...giftCard,
                                    serialNumber: e.target.value,
                                });
                                localStorage.setItem('serialNumber', e.target.value);
                            }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Pin"
                            size="medium"
                            value={giftCard.pin}
                            onChange={(e) => {
                                setGiftCard({
                                    ...giftCard,
                                    pin: e.target.value,
                                });
                                localStorage.setItem('pin', e.target.value);
                            }}
                        />
                    </div>

                    <Grid container className={clsx(globalStyle.pt2, globalStyle.pb2)}>
                        <ListGrid minWidthItem={'450px'} gridGap={20}>
                            {filterByStatus(crudTrackingHM.pagingList?.rows || []).map((item, index) => (
                                <Zoom in={true} timeout={index * 50}>
                                    <Grid>
                                        <ProgressHmItemList
                                            giftCard={giftCard}
                                            onSplitOrder={handleClickSplitOrder}
                                            item={item}
                                            updateOrderId={crudTrackingHM.onShowPopup}
                                        />
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

export interface Giftcard {
    serialNumber: string;
    pin: string;
}

export default React.memo(ProgressAutoOrder);
