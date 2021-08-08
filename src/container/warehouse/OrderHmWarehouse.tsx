import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Chip, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core';
import TextField from 'src/component/common/TextFiled';
import Button from 'src/component/common/Button';
import { useGlobalStyles } from 'src/theme/GlobalStyle';
import ListGrid from 'src/component/common/ListGrid';
import { GiTwoCoins } from 'react-icons/gi';
import { RiBillLine } from 'react-icons/ri';
import { VscError } from 'react-icons/vsc';
import { cssInfo } from 'src/constants/Other';
import { StatisticByUserHm } from 'src/afi-manager-base-model/controllers/IOrderTrackingController';
import { ListFilter } from 'luong-base-model/lib';
import { orderTrackingController } from 'src/controller';
import { useCrudHook } from 'src/hook/useCrudHook';
import { StringUtil } from 'src/helper/StringUtil';
import { useHistory } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';

type Props = {};
const useStyle = makeStyles((theme) => ({
    rootItem: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
    },
    iconItem: {
        fontSize: '1.5rem',
        paddingRight: theme.spacing(1),
    },
    frInfoItem: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
    },
    frInfoItemCoin: {
        color: cssInfo.colorCoin,
    },
    infoItemError: {
        color: theme.palette.error.main,
    },
}));
function OrderHmWarehouse(props: Props) {
    const history = useHistory();
    const classes = useStyle();
    const [state, setState] = useState();
    const globalStyles = useGlobalStyles();
    useEffect(() => {
        return () => {};
    }, []);
    const crudOrderHm = useCrudHook<StatisticByUserHm, ListFilter<StatisticByUserHm>>({
        controller: orderTrackingController as any,
        listController: orderTrackingController.orderHmForWarehouse,
        initQuery: {
            pageSize: 50,
            searchFields: ['username'],
        },
    });

    return (
        <Grid container>
            <Grid container className={clsx(globalStyles.pt2, globalStyles.pb2)}>
                <Typography variant="h4">My Order</Typography>
            </Grid>
            <Grid container>
                <Grid>
                    <TextField variant="outlined" label="Search" onChange={e => crudOrderHm.setQuery({...crudOrderHm.query, search: e.target.value, searchFields:['username']})} />
                </Grid>
            </Grid>
            <Grid container className={globalStyles.pt2} >
            <Grid style={{margin:"16px 0"}}>
            <Pagination
                count={crudOrderHm.pagingList.totalPages || 1}
                page={crudOrderHm.pagingList.page || 1}
                variant="outlined"
                shape="rounded"
                onChange={(e, page) => {
                    crudOrderHm.setQuery({
                        ...crudOrderHm.query,
                        page: page,
                    });
                }}
                color="primary"
            />
            </Grid>

                <ListGrid gridGap={10} minWidthItem="350px">
                    {crudOrderHm.pagingList?.rows?.map((item, index) => {
                        return (
                            <Grid className={classes.rootItem}>
                                <Grid container justify="space-between">
                                    <Grid>
                                        <Chip label={item.status} color="secondary" />
                                    </Grid>
                                    <Grid>
                                        <Typography variant="caption">
                                            {item.totalOrder} order (
                                            {StringUtil.formatterMoney.format(item.totalPrice || 0)})
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid className={globalStyles.pt2}>
                                    <Typography variant="h6">{item.username}</Typography>
                                </Grid>
                                <Grid container className={clsx(globalStyles.pt1)}>
                                    <Grid xs={6}>
                                        <Tooltip title="Total price done">
                                            <Grid className={clsx(globalStyles.pr1, classes.frInfoItemCoin)}>
                                                <Grid container alignItems="center" className={classes.frInfoItem}>
                                                    <Grid className={clsx(classes.iconItem)}>
                                                        <GiTwoCoins />
                                                    </Grid>
                                                    <Grid>
                                                        <Typography>
                                                            {StringUtil.formatterMoney.format(item.totalPriceDone || 0)}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Tooltip>
                                    </Grid>
                                    <Grid xs={6}>
                                        <Tooltip title="Total order done">
                                            <Grid className={globalStyles.pl1}>
                                                <Grid container alignItems="center" className={classes.frInfoItem}>
                                                    <Grid className={clsx(classes.iconItem)}>
                                                        <RiBillLine />
                                                    </Grid>
                                                    <Grid>
                                                        <Typography>{item.totalDone} order</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Tooltip>
                                    </Grid>
                                </Grid>

                                <Grid container className={clsx(globalStyles.pt1)}>
                                    <Tooltip title="Order and price error">
                                        <Grid
                                            container
                                            alignItems="center"
                                            className={clsx(classes.frInfoItem, classes.infoItemError)}
                                            justify="center"
                                        >
                                            <Grid className={clsx(classes.iconItem)}>
                                                <VscError />
                                            </Grid>
                                            <Grid>
                                                <Typography>{`${StringUtil.formatterMoney.format(
                                                    item.totalPriceError || 0,
                                                )} - ${item.totalError} order`}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Tooltip>
                                </Grid>
                                <Grid className={globalStyles.pt1}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => {
                                            history.push(`/order-hm-warehouse/${item.userHmId}`);
                                        }}
                                        size="small"
                                        fullWidth
                                    >
                                        See Detail
                                    </Button>
                                </Grid>
                            </Grid>
                        );
                    })}
                </ListGrid>
            </Grid>
        </Grid>
    );
}

export default React.memo(OrderHmWarehouse);
