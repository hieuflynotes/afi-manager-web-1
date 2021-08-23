import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Avatar, Box, Button, ClickAwayListener, Grid, makeStyles, MenuItem, Select, Tooltip, Typography, Zoom } from '@material-ui/core';
import TextField from '../../component/common/TextFiled';
import ListGrid from '../../component/common/ListGrid';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { useCrudHook } from '../../hook/useCrudHook';
import { Pagination } from '@material-ui/lab';
import { useParams } from 'react-router-dom';
import { orderTrackingController, userHmController } from 'src/controller';
import theme from 'src/theme/MuiTheme';
import { DataFirebaseHm, OrderTracking, ProductOrder } from 'src/afi-manager-base-model/model/OrderTracking';
import ProgressHmItemList from 'src/component/AutoOrderHm/ProgressHmItemList';
import PopupAddOrderId from 'src/component/AutoOrderHm/PopupEditProgressAutoOrder';
import { ListFilter } from 'luong-base-model/lib';
import { mathCeilWithRound } from 'src/helper/NumberUtils';
import { IconButton } from '@material-ui/core';
import { IoCopyOutline } from 'react-icons/io5';
import { dispatch } from '../../rematch/store';
import { calcBuyPriceOrder, countBoughtProduct, countProduct } from 'src/helper/CalculatorHmPrice';
import _ from 'lodash';
import { UserHm } from 'src/afi-manager-base-model/model/UserHm';
import { addAddress, checkoutLoopAle } from 'src/constants/IMacros';
import PopupSplitOrder from 'src/component/AutoOrderHm/PopupSplitOrder';
import { handleWithPopupHook } from 'src/hook/HandleWithPopupHook';
import { aleFirebaseConfig } from 'src/constants/AleFirebaseConfig';
import HelpIcon from '@material-ui/icons/Help';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { isCorrectCode } from 'src/helper/CheckBestOptionForOrder';

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
        gridTemplateColumns: '1fr 1fr 200px',
        alignItems:"center",
        gridGap: 16,
        '& .MuiFormControl-fullWidth': {
            marginTop: 16,
        },
        '& .MuiButton-root':{
            marginTop: 16,
        }
    },
    popperTootip:{
        pointerEvents:'auto'
    },
    tooltipPlacementBottom:{
        margin: '5px 0'
    },
    tooltip:{
        backgroundColor:theme.palette.primary.main
    },
    icon:{
        position:"fixed",
        bottom: 80,
        right:80,
        cursor:"pointer"
    }
}));

export enum OrderStatus {
    none = 'none',
    initial = 'initial',
    created = 'created',
    addedToCard = 'addedToCard',
    done = 'done',
    error = 'error',
    errorPrice='errPrice'
}
function ProgressAutoOrder(props: Props) {
    const { userHmId } = useParams<{ userHmId: string }>();
    const [userHm, setUserHm] = useState<UserHm>({} as UserHm);
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(OrderStatus.none);
    const [isOpenNote, setIsOpenNote] = useState(false)
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
        var getDos = aleFirebaseConfig.firestore().collection('notication_order_update').doc(userHmId.toString());
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
                case OrderStatus.errorPrice:
                    isValid = (!r.dataFirebase || (r.dataFirebase?.total &&  Math.abs(Number(r.dataFirebase?.total||0) - calcBuyPriceOrder(r.productOrder || [])) <= 0.1)) ? false : true
                    break;
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
                            dispatch.notification.success('Đã copy SP lỗi!');
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
                    {renderComparedData("amount").data}
                    {renderComparedData("amount").difference > 0.1 && 
                    <span style={{color:theme.palette.error.main}}>{' '} (Lệch: {renderComparedData("amount").difference})</span>
                    }
                </Typography>

                <Typography>Tổng món: {' '}
                {renderComparedData("quantity").data}
                {renderComparedData("quantity").difference > 0.1 && 
                <span style={{color:theme.palette.error.main}}>{' '}(Lệch: {renderComparedData("quantity").difference})</span>
                }</Typography>

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

                <Typography>Tổng món đã mua: {countBoughtProduct(crudTrackingHM.pagingList?.rows || [])}</Typography>
            </Grid>
        );
    };
    const renderWarningPrice = () =>{
        let gt20 = crudTrackingHM.pagingList?.rows?.filter(i=> (i.totalPrice && i.totalPrice>20)).length
        let gt15 = crudTrackingHM.pagingList?.rows?.filter(i=> (i.totalPrice && i.totalPrice>15)).length
        return(
            gt15 ?
            <Typography style={{display:"inline", marginLeft:"5px"}} color="error">
                {' (Có '}
                {gt20 && gt20 > 0 ? `${gt20} món giá >20  & `:""}
                {gt15 && gt15 > 0 ? `${gt15} món giá >15`:""}
                {')'}
            </Typography>
            :""
        )
    }
    const renderPriceNote = () =>{
        return(
            <Box mr={1}>
            <Tooltip title={
                <ClickAwayListener onClickAway={()=>setIsOpenNote(false)}>
                <Box margin="10px 5px" style={{display:"grid", gridRowGap:"10px"}}>
                {'* Mai Linh, Elisa, Amy: Nếu giá SP > 20 => KHÔNG MUA'}
                <br/>
                <br/>
                {'* PLE - Deal 1M: giá >10 hoặc có SP khác nhau => Báo Leader NGAY & K CHECKOUT CẢ ĐƠN'}
                <br/>
                {'* PLE - OFF40: giá >20 => Báo Leader NGAY & K CHECKOUT CẢ ĐƠN'}
                <br/>
                {'* PLE - còn lại: giá >15 => Báo Leader NGAY & K CHECKOUT món đó'}
                <Button variant="contained" size="small" onClick={()=>setIsOpenNote(false)}>OK, Không check sai đâu ^^</Button>
                </Box>
                </ClickAwayListener>
            }
              classes={{popper:classes.popperTootip, tooltipPlacementBottom: classes.tooltipPlacementBottom, tooltip:classes.tooltip}}
              open={isOpenNote}
            >
                <HelpIcon color="primary" fontSize="small" onClick={()=>setIsOpenNote(!isOpenNote)}></HelpIcon>
            </Tooltip>
            </Box>
        )
    }
    const renderScrollIcon =() =>{
        return(
            <Avatar variant="square" className={classes.icon} onClick={()=>window.scrollTo(0,0)}>
            <ExpandLessIcon></ExpandLessIcon>
            </Avatar>
        )
    }
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
    const renderComparedData = (type: "amount"|"quantity") => {
        let createdData = {data:0,difference:0}
        switch (type) {
            case "amount":
                let amount = mathCeilWithRound(
                    crudTrackingHM.pagingList?.rows
                        ?.map((r) => r.totalPrice || 0)
                        .reduce((price, total) => (total += price), 0) || 0,
                    2,
                )
                createdData = {
                    data:amount,
                    difference: Math.abs(amount - (userHm?.extraInfor?.verifiedAmount||amount))
                } ;
                break;
            case "quantity":
                let quantity = countProduct(crudTrackingHM.pagingList?.rows || [])
                createdData = {
                    data:quantity,
                    difference: Math.abs(quantity - (userHm?.extraInfor?.verifiedQuantity||quantity))
                };
                break;
            default: break}
            return createdData
        }
    
    return (crudTrackingHM.pagingList?.rows?.length || 0) > 0 ? (
        <Grid
            container
            style={{
                minHeight: '100vh',
                background: 'white',
                padding: theme.spacing(1),
            }}
        >
            {renderScrollIcon()}
            <PopupSplitOrder
                isDisplay={handleWithPopupSplit.isDisplayPopup}
                item={handleWithPopupSplit.itemSelected}
                onCancel={handleWithPopupSplit.handleClosePopup}
                orderTrackings={crudTrackingHM.pagingList?.rows || []}
                onSplitWithMerge={onSplitWithMerge}
                onSplitWithNew={onSplitOrderWithNew}
            />
            <PopupAddOrderId
                isReadyBuyAll={crudTrackingHM.pagingList?.rows?.findIndex(i => !i.isOrder) === -1}
                isDisplay={crudTrackingHM.isShowPopup}
                item={crudTrackingHM.itemSelected}
                onCancel={crudTrackingHM.onCancelPopup}
                onEdit={crudTrackingHM.onSave}
            />
            <Grid container justify="center" className={clsx(globalStyle.pp2)}>
                <Grid>
                    <Grid container justify="center">
                        <Typography align="center" variant="h4" style={{display:"flex", alignItems:"center"}}>
                            {renderPriceNote()}
                            Chi tiết đơn hàng
                            {renderWarningPrice()}
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
                    {/* Todo: Confirm before checkout in case of wrong price */}
                    {Boolean(crudTrackingHM.pagingList?.rows?.findIndex(r => r.orderId) == -1 
                    && !isConfirmed) &&
                    Boolean(!isCorrectCode(userHm,crudTrackingHM.pagingList?.rows || [])
                    || renderComparedData("amount").difference > 0.1
                    || renderComparedData("quantity").difference > 0.1) 
                    ?
                        <Grid container justify="center" alignItems="center" direction="column">
                            <img src="https://i.pinimg.com/originals/ee/84/8f/ee848f864ebdf8d48351e5b8b8ba50bd.png"/>
                            <Typography variant="h5" className={globalStyle.mt2}>
                                {Boolean(!isCorrectCode(userHm,crudTrackingHM.pagingList?.rows || [])) && 
                                "Mã giảm không phù hợp :(("}
                            </Typography>
                            <Typography variant="h5" className={globalStyle.mt2}>
                            {Boolean(renderComparedData("amount").difference > 0.1 || renderComparedData("quantity").difference > 0.1) && "Tiền bị lệch!"}
                            </Typography>

                            <Typography variant="h5" className={clsx(globalStyle.mt2,globalStyle.mb2)}>
                                Vui lòng xác nhận lại với kho trước khi mua hàng!
                            </Typography>
                            <Button variant="contained" color="secondary" onClick={()=>setIsConfirmed(true)}>Đã xác nhận!</Button>
                        </Grid>
                    :(
                    <>
                    <Grid>
                    <Select
                        fullWidth
                        variant="outlined"
                        value={selectedStatus}
                        className={globalStyle.mt3}
                        onChange={(e) => {
                            setSelectedStatus(e.target.value as OrderStatus);
                        }}
                    >
                        <MenuItem value={OrderStatus.none}>Tất cả</MenuItem>
                        <MenuItem value={OrderStatus.initial}>Khởi tạo</MenuItem>
                        <MenuItem value={OrderStatus.created}>Đã tạo tài khoản</MenuItem>
                        <MenuItem value={OrderStatus.addedToCard}>Đã thêm vào giỏ hàng</MenuItem>
                        <MenuItem value={OrderStatus.done}>Đã thanh toán</MenuItem>
                        <MenuItem value={OrderStatus.error}>Lỗi</MenuItem>
                        <MenuItem value={OrderStatus.errorPrice}>Lỗi sai giá</MenuItem>
                    </Select>
                    </Grid>
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
                        <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            navigator.clipboard.writeText(
                                `${checkoutLoopAle(userHm.emailCheckout||"",userHm.password||"",giftCard.serialNumber,giftCard.pin)}`
                            );
                            dispatch.notification.success('Copy code thành công!');
                        }}
                        disabled={(giftCard.serialNumber.length==0||giftCard.pin.length==0)}
                        size="small"
                    >
                        <IoCopyOutline style={{marginRight:5}}/> Code checkout loop
                    </Button>
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
                                            userHm={{...userHm}}
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
                    </>)}
                </Grid>
            </Grid>
        </Grid>
    ) : (
        <Grid container justify="center" style={{height:"100vh"}}>
            <Typography variant="h5">Tài khoản này chưa tiến hành lấy order hoặc order bị trống</Typography>
        </Grid>
    );
}

export interface Giftcard {
    serialNumber: string;
    pin: string;
}

export default React.memo(ProgressAutoOrder);
