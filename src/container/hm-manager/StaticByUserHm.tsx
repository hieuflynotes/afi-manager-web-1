import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ListFilter } from 'luong-base-model/lib';
import React, { useEffect, useState } from 'react';
import { StatisticByUserHm } from 'src/afi-manager-base-model/controllers/IOrderTrackingController';
import TableCrud, { ColumnTable } from 'src/component/common/TableCrud';
import { orderTrackingController } from 'src/controller';
import { useCrudHook } from 'src/hook/useCrudHook';
import theme from 'src/theme/MuiTheme';
export default function StaticByUserHm() {
    const [column, setColumn] = useState<ColumnTable<StatisticByUserHm>[]>([
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
                    padding: theme.spacing(6),
                }}
                container
            >
                <Grid item xs={12} container justify="space-between">
                    <Typography variant="h4">Gift Card</Typography>
                    <Button variant="contained" color="primary" onClick={(e) => crud.onShowPopup({})}>
                        Thêm mới
                    </Button>
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
                            };
                        }}
                    ></TableCrud>
                </Grid>
            </Grid>
        </Grid>
    );
}
