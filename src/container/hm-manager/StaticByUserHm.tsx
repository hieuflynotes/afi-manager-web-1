import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
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
            label: 'Price Error ',
            isSort: true,
        },
        {
            id: 'status',
            label: 'Status',
            isSort: true,
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

    const renderStatus = (): React.ReactElement => {
        return <Grid></Grid>;
    };

    return (
        <Grid
            style={{
                padding: theme.spacing(1),
            }}
        >
            <Grid
                style={{
                    background: theme.palette.background.paper,
                }}
                container
            >
                <Grid item xs={12} container justify="space-between" className={clsx(globalStyle.pt2, globalStyle.pb2)}>
                    <Typography variant="h4">Static Order</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TableCrud<StatisticByUserHm>
                        column={column}
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
                            };
                        }}
                    ></TableCrud>
                </Grid>
            </Grid>
        </Grid>
    );
}
