import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import TextField from '../../component/common/TextFiled';
import Button from '../../component/common/Button';
import ListGrid from '../../component/common/ListGrid';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { useCrudHook } from '../../hook/useCrudHook';
import { Pagination } from '@material-ui/lab';
import PopUpConfirm from '../../component/common/PopupConfirm';
import { useHistory } from 'react-router-dom';
import { UserHm } from 'src/afi-manager-base-model/model/UserHm';
import { orderTrackingController, userHmController } from 'src/controller';
import UserHmItemList from 'src/component/AutoOrderHm/UserHmItemList';
import PopupInsertUser from 'src/component/AutoOrderHm/PopupInsertUser';
import theme from 'src/theme/MuiTheme';
import { handleWithPopupHook } from 'src/hook/HandleWithPopupHook';
import PopupMergeToUser from 'src/component/AutoOrderHm/PopupMergeToUser';
import { OrderTracking } from 'src/afi-manager-base-model/model/OrderTracking';
import SelectBox from 'src/component/common/SelectBox';
import { dispatch, RootState } from 'src/rematch/store';
import TextDesc from 'src/component/common/TextDesc';
import { calcBuyPrice, calcBuyPriceOrder } from 'src/helper/CalculatorHmPrice';
import FixSwithUpdateOrder from 'src/component/AutoOrderHm/FixSwithUpdateOrder';
import { useSelector } from 'react-redux';

type Props = {};
type State = {
    inputSearch: string;
    orderTracking?: OrderTracking;
};
const useStyle = makeStyles((theme) => ({
    root: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(2),
        minWidth: 500,
        borderRadius: theme.spacing(1),
    },
    frInfo: {
        padding: theme.spacing(2),
    },
}));
function FixDataTool(props: Props) {
    const history = useHistory();
    const classes = useStyle();
    const globalStyle = useGlobalStyles();
    const [state, setState] = useState<State>({
        inputSearch: '',
        orderTracking: undefined,
    });
    useEffect(() => {
        return () => {};
    }, []);

    const search = () => {
        orderTrackingController
            .findOne({
                search: state.inputSearch,
                searchFields: ['email'],
            })
            .then((res) => {
                if (!res) {
                    dispatch.notification.error('Cannot find order');
                }
                setState({
                    ...state,
                    orderTracking: res,
                });
            });
    };

    const authen = useSelector((state: RootState) => state.authen);
    const upateData = (item: OrderTracking) => {
        orderTrackingController.save({
            ...item,
            updatedBy: authen.info.id,
        });
    };

    return (
        <Grid
            container
            style={{
                minHeight: '100vh',
                background: 'white',
                padding: theme.spacing(2),
            }}
            justify="center"
            alignItems="center"
        >
            <Grid className={classes.root}>
                <Grid container justify="center">
                    <Typography variant="h5">Update data</Typography>
                </Grid>
                <Grid container alignItems="center">
                    <Grid className={clsx(globalStyle.flex1, globalStyle.mm1)}>
                        <TextField
                            variant="outlined"
                            label="Input Id or Email"
                            onChange={(e) => {
                                setState({
                                    ...state,
                                    inputSearch: e.target.value || '',
                                });
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid className={clsx(globalStyle.mm1)}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                search();
                            }}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
                {state.orderTracking && (
                    <Grid container>
                        <Grid container className={clsx(classes.frInfo)}>
                            {state.orderTracking.errorDesc && (
                                <Grid
                                    container
                                    style={{
                                        color: theme.palette.error.main,
                                    }}
                                >
                                    <TextDesc title={'Lỗi'} desc={state.orderTracking.errorDesc || ''} />
                                </Grid>
                            )}
                            <TextDesc
                                title={'OrderId'}
                                desc={
                                    state.orderTracking.orderId == '1' ? 'Rỗng' : state.orderTracking.orderId || '   '
                                }
                            />
                            <TextDesc title={'Tổng giá'} desc={`${state.orderTracking.totalPrice}` || ''} />
                            <TextDesc
                                title={'Phải trả'}
                                desc={`${calcBuyPriceOrder(state.orderTracking.productOrder || [])}` || ''}
                            />
                            <TextDesc title={'Email'} desc={state.orderTracking.email || ''} />
                            {/* <TextDesc title={'Password'} desc={state.orderTracking.userHM?.password || ''} /> */}
                        </Grid>
                        {state.orderTracking.productOrder &&
                            state.orderTracking.productOrder.map((item) => (
                                <Grid container className={clsx(classes.frInfo)}>
                                    <TextDesc title={'Id sản phẩm'} desc={item.productId || ''} />
                                    {(item.quantity || 0) > 1 && (
                                        <TextDesc title={'Số lượng'} desc={item.quantity?.toString() || ''} />
                                    )}
                                    <TextDesc title={'Size'} desc={item.size || ''} />
                                    <TextDesc title={'Giá gốc'} desc={item.price?.toString() || ''} />
                                    <TextDesc title={'Giá mua'} desc={calcBuyPrice(item.price || 0).toString() || ''} />
                                </Grid>
                            ))}
                        <FixSwithUpdateOrder
                            item={state.orderTracking}
                            updateOrder={(item) => {
                                upateData(item);
                            }}
                        />
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}

export default React.memo(FixDataTool);
