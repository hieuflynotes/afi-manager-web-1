import {
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ListFilter } from 'luong-base-model/lib';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StatisticByUserHm } from 'src/afi-manager-base-model/controllers/IOrderTrackingController';
import TableCrud, { ColumnTable } from 'src/component/common/TableCrud';
import { orderTrackingController } from 'src/controller';
import { useCrudHook } from 'src/hook/useCrudHook';
import { useGlobalStyles } from 'src/theme/GlobalStyle';
import theme from 'src/theme/MuiTheme';
import clsx from 'clsx';
import { handleWithPopupHook } from 'src/hook/HandleWithPopupHook';
import PopupMergeToUser from 'src/component/AutoOrderHm/PopupMergeToUser';
import { AiOutlineEdit } from 'react-icons/ai';
import { CgMergeVertical } from 'react-icons/cg';
export default function StaticByUserHm() {
    const [column, setColumn] = useState<ColumnTable<StatisticByUserHm>[]>([
        {
            id: 'createdAt',
            label: 'Created At',
            isSort: true,
        },
        {
            id: 'username',
            label: 'Username',
            acceptSearch: true,
            isSort: true,
        },
        {
            id: 'emailUser',
            label: 'Email User',
            acceptSearch: true,
            isSort: true,
        },
        {
            id: 'totalOrder',
            label: 'Order',
            isSort: true,
        },
        {
            id: 'totalRegister',
            label: 'Register',
            isSort: true,
        },
        {
            id: 'totalAddCart',
            label: 'Add Cart',
            isSort: true,
        },
        {
            id: 'totalDone',
            label: 'Done',
            isSort: true,
        },
        {
            id: 'totalError',
            label: 'Error',
            isSort: true,
        },
        {
            id: 'totalPrice',
            label: 'Price',
            isSort: true,
        },
        {
            id: 'totalPriceError',
            label: 'Price Error',
            isSort: true,
        },
        {
            id: 'status',
            label: 'Status',
            isSort: true,
            acceptSearch: true,
        },
        {
            id: 'action' as any,
            label: 'Action',
        },
    ]);
    const crud = useCrudHook<StatisticByUserHm, ListFilter<StatisticByUserHm>>({
        controller: orderTrackingController as any,
        listController: orderTrackingController.statisticByUserHm,
        initQuery: {
            pageSize: 50,
            searchFields: ['username'],
        },
    });
    const globalStyle = useGlobalStyles();

    const handleWithPopupMerge = handleWithPopupHook<{
        userHmId?: string;
        userId?: string;
    }>({
        onConfirmByPopup: (item) => {
            orderTrackingController
                .mergeOrderTrackingToUser({
                    ...item,
                    userHmId: item?.userHmId || (null as any),
                })
                .then((res) => {
                    crud.onRefreshList();
                });
        },
    });

    const warningEmailMergeWrong = (item: StatisticByUserHm): React.ReactElement => {
        let check = true;
        const splitUserName = item.username?.trim()?.substring(0, item.username?.indexOf('+'));
        const splitEmailUser = item.emailUser?.trim()?.substring(0, item.emailUser?.indexOf('@'));

        if ((splitUserName == splitEmailUser || item.username == item.emailUser) && Boolean(item.emailUser)) {
            return <Grid>{item.username}</Grid>;
        }
        return (
            <Grid
                style={{
                    color: theme.palette.error.main,
                }}
            >
                {item.username}
            </Grid>
        );
    };

    const renderStatus = (): React.ReactElement => {
        return <Grid></Grid>;
    };

    return (
        <Grid
            style={{
                padding: theme.spacing(1),
            }}
        >
            <PopupMergeToUser
                isDisplay={handleWithPopupMerge.isDisplayPopup}
                item={handleWithPopupMerge.itemSelected}
                onCancel={handleWithPopupMerge.handleClosePopup}
                onEdit={handleWithPopupMerge.handleConfirmByPopup}
            />
            <Grid
                style={{
                    background: theme.palette.background.paper,
                }}
                container
            >
                <Grid item xs={12} container justify="space-between" className={clsx(globalStyle.pt2, globalStyle.pb2)}>
                    <Typography variant="h4">Thống kê order</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TableCrud<StatisticByUserHm>
                        column={column}
                        id="9e01d63f-4bae-40de-985f-97fafcc9ebdb"
                        data={crud.pagingList}
                        onQuery={(query) => {
                            crud.setQuery({
                                ...crud.query,
                                ...query,
                            });
                        }}
                        pageSize={[50, 100, 200, 500]}
                        isShowHighlightText={true}
                        query={crud.query}
                        onCustomerCell={(item) => {
                            return {
                                ...item,
                                totalPrice: Number(item.totalPrice).toFixed(2),
                                totalPriceError: Number(item.totalPriceError).toFixed(2),
                                createdAt: moment(item.createdAt).format('DD/MM/YY hh:mm'),
                                username: warningEmailMergeWrong(item),
                                action: (
                                    <Grid>
                                        <IconButton
                                            color="primary"
                                            onClick={() => {
                                                handleWithPopupMerge.handleShowPopup({
                                                    userHmId: item.userHmId,
                                                    userId: item.userId,
                                                });
                                            }}
                                        >
                                            <CgMergeVertical />
                                        </IconButton>
                                    </Grid>
                                ),
                            };
                        }}
                    ></TableCrud>
                </Grid>
            </Grid>
        </Grid>
    );
}
