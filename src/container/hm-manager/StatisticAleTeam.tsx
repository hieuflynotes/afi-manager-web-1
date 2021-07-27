import { Grid, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Chart as ChartGoogle } from 'react-google-charts';
import {
    FilterStatistic,
    IntervalCheckoutHmTeamAle,
} from 'src/afi-manager-base-model/controllers/IOrderTrackingController';
import DatePicker from 'src/component/common/DatePicker';
import { orderTrackingController } from 'src/controller';
import { useGlobalStyles } from 'src/theme/GlobalStyle';
import theme from 'src/theme/MuiTheme';

const useStyle = makeStyles((theme) => ({
    root: {
        padding: 10,
    },
    statisticLeft: {
        background: theme.palette.background.paper,
        // borderRadius: theme.spacing(1),
        padding: theme.spacing(3),
    },
    chart: {
        background: theme.palette.background.paper,
        // borderRadius: theme.spacing(1),
        // marginTop: theme.spacing(2),
        width: '100%',
    },
    frChart: {
        background: 'white',
        padding: theme.spacing(5),
    },
}));

export default function StatisticAleTeam() {
    const globalsStyle = useGlobalStyles();
    const [stateDate, setStateDate] = useState<FilterStatistic>({
        interval: 'day',
        from: moment().startOf('month').toDate(),
        to: moment().endOf('month').toDate(),
    });
    const [statisticAleTeam, setStatisticAleTeam] =
        useState<{
            intervalRegisterTeam?: any[];
            intervalCheckoutTeam?: any[];
        }>();
    const classes = useStyle();
    const getData = (filter: FilterStatistic) => {
        Promise.all([
            orderTrackingController.intervalTeamCheckout(filter), //
            orderTrackingController.intervalTeamRegister(filter), //
        ]).then((_res) => {
            const nameAllTeamCheckout: string[] = _res[0].map((item) => item[0].nameUser);
            const mapNameUserCheckout = new Map<string, IntervalCheckoutHmTeamAle>();
            _res[0].forEach((item) => {
                item.forEach((user) => {
                    mapNameUserCheckout.set(`${moment(user.date).format('DD-MM-YYYY')} - ${user.nameUser}`, user);
                });
            });
            const intervalCheckoutTeam: any = [['x', ...nameAllTeamCheckout]].concat(
                _res[0][0].map((item) => [
                    moment(item.date).format('DD-MM-YYYY'),
                    ...(nameAllTeamCheckout.map((user) => {
                        return (
                            mapNameUserCheckout.get(`${moment(item.date).format('DD-MM-YYYY')} - ${user}`)?.total || 0
                        );
                    }) as any),
                ]),
            );

            const nameAllTeamRegister: string[] = _res[1].map((item) => item[0].nameUser);
            const mapNameUserRegister = new Map<string, IntervalCheckoutHmTeamAle>();
            _res[1].forEach((item) => {
                item.forEach((user) => {
                    mapNameUserRegister.set(`${moment(user.date).format('DD-MM-YYYY')} - ${user.nameUser}`, user);
                });
            });
            const intervalCheckoutRegister: any = [['x', ...nameAllTeamRegister]].concat(
                _res[1][0].map((item) => [
                    moment(item.date).format('DD-MM-YYYY'),
                    ...(nameAllTeamRegister.map((user) => {
                        return (
                            mapNameUserRegister.get(`${moment(item.date).format('DD-MM-YYYY')} - ${user}`)?.total || 0
                        );
                    }) as any),
                ]),
            );

            setStatisticAleTeam({
                ...statisticAleTeam,
                intervalCheckoutTeam: intervalCheckoutTeam,
                intervalRegisterTeam: intervalCheckoutRegister,
            });
        });
    };
    useEffect(() => {
        getData(stateDate);
    }, [stateDate]);
    return (
        <Grid
            container
            style={{
                padding: theme.spacing(1),
            }}
        >
            <Grid container justify="flex-end">
                <Grid
                    container
                    justify="flex-end"
                    style={{
                        top: theme.spacing(1),
                        background: 'white',
                        marginBottom: theme.spacing(1),
                        padding: theme.spacing(3),
                    }}
                >
                    <DatePicker
                        onChangeDateRange={(date) => {
                            setStateDate({
                                ...stateDate,
                                from: date.startDate,
                                to: date.endDate,
                            });
                        }}
                        initEndDate={stateDate.to}
                        initStartDate={stateDate.from}
                        label={'Chọn ngày'}
                    />
                </Grid>
            </Grid>
            {/* <Typography variant={"h4"} gutterBottom>
				Dashboard
			</Typography> */}
            <Grid container spacing={3}>
                <Grid item xl={12} lg={12} md={12}>
                    <Grid item>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12}>
                                {/* <RecentGriftCard /> */}
                                <Grid className={classes.frChart}>
                                    <Grid>
                                        <Typography variant="h5">Team register</Typography>
                                    </Grid>
                                    <ChartGoogle
                                        width={'95%'}
                                        height={'600px'}
                                        chartType="LineChart"
                                        loader={<div>Loading Chart</div>}
                                        data={statisticAleTeam?.intervalCheckoutTeam}
                                        options={{
                                            animation: {
                                                duration: 500,
                                                easing: 'out',
                                                startup: true,
                                            },
                                        }}
                                        rootProps={{ 'data-testid': '2' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item lg={12} md={12}>
                                {/* <RecentGriftCard /> */}
                                <Grid className={classes.frChart}>
                                    <Grid>
                                        <Typography variant="h5">Team checkout</Typography>
                                    </Grid>
                                    <ChartGoogle
                                        height={'900px'}
                                        width={'95%'}
                                        chartType="LineChart"
                                        loader={<div>Loading Chart</div>}
                                        data={statisticAleTeam?.intervalRegisterTeam}
                                        options={{
                                            animation: {
                                                duration: 500,
                                                easing: 'out',
                                                startup: true,
                                            },
                                        }}
                                        rootProps={{ 'data-testid': '2' }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
