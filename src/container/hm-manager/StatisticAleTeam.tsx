import { Checkbox, FormControlLabel, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
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
    const globalStyle = useGlobalStyles();
    const [stateDate, setStateDate] = useState<FilterStatistic>({
        interval: 'day',
        from: moment().startOf('month').toDate(),
        to: moment().endOf('month').toDate(),
    });
    const [statisticAleTeam, setStatisticAleTeam] = useState<{
        intervalRegisterTeam?: IntervalCheckoutHmTeamAle[][];
        intervalCheckoutTeam?: IntervalCheckoutHmTeamAle[][];
        nameOfTeamRegister?: string[];
        nameOfTeamCheckout?: string[];
        nameOfTeamRegisterSelect?: Map<string, string>;
        nameOfTeamCheckoutSelect?: Map<string, string>;
    }>({
        nameOfTeamCheckoutSelect: new Map(),
        nameOfTeamRegisterSelect: new Map(),
    });
    const classes = useStyle();
    const getData = (filter: FilterStatistic) => {
        Promise.all([
            orderTrackingController.intervalTeamCheckout(filter), //
            orderTrackingController.intervalTeamRegister(filter), //
        ]).then((_res) => {
            const nameAllTeamCheckout: string[] = _res[0].map((item) => item[0].nameUser);
            const nameAllTeamRegister: string[] = _res[1].map((item) => item[0].nameUser);

            console.log({ res: _res[0] });

            setStatisticAleTeam({
                ...statisticAleTeam,
                intervalCheckoutTeam: _res[0],
                intervalRegisterTeam: _res[1],
                nameOfTeamCheckout: nameAllTeamCheckout,
                nameOfTeamRegister: nameAllTeamRegister,
                nameOfTeamCheckoutSelect:
                    statisticAleTeam?.nameOfTeamCheckoutSelect?.size == 0
                        ? new Map(nameAllTeamCheckout.map((item) => [item, item]))
                        : statisticAleTeam?.nameOfTeamCheckoutSelect,
                nameOfTeamRegisterSelect:
                    statisticAleTeam?.nameOfTeamRegisterSelect?.size == 0
                        ? new Map(nameAllTeamRegister.map((item) => [item, item]))
                        : statisticAleTeam?.nameOfTeamRegisterSelect,
            });
        });
    };

    const getIntervalChart = (params: { nameOfTeam: string[]; interval: IntervalCheckoutHmTeamAle[][] }) => {
        if (params.nameOfTeam.length == 0 || params.interval.length == 0) {
            return [['x'], [1]];
        }
        const nameAllTeamCheckout: string[] = params.nameOfTeam;

        const mapNameUserCheckout = new Map<string, IntervalCheckoutHmTeamAle>();

        params.interval.forEach((item) => {
            item.forEach((user) => {
                mapNameUserCheckout.set(`${moment(user.date).format('DD-MM-YYYY')} - ${user.nameUser}`, user);
            });
        });
        const intervalCheckoutTeam: any = [['x', ...nameAllTeamCheckout]].concat(
            params.interval[0].map((item) => [
                moment(item.date).format('DD-MM-YYYY'),
                ...(nameAllTeamCheckout.map((user) => {
                    return Number(
                        mapNameUserCheckout.get(`${moment(item.date).format('DD-MM-YYYY')} - ${user}`)?.total || 0,
                    );
                }) as any),
            ]),
        );
        console.log({intervalCheckoutTeam});
        
        return intervalCheckoutTeam;
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
                                    <Grid style={{marginTop: 24}} xs={12} container>
                                        <Autocomplete
                                            multiple
                                            fullWidth
                                            id="tags-outlined"
                                            options={statisticAleTeam.nameOfTeamCheckout || []}
                                            getOptionLabel={(option) => option}
                                            value={(statisticAleTeam.nameOfTeamCheckout || []).filter(n => !!statisticAleTeam.nameOfTeamCheckoutSelect?.get(n))}
                                            defaultValue={statisticAleTeam.nameOfTeamCheckout || []}
                                            onChange={(e, values) => {
                                                setStatisticAleTeam({
                                                    ...statisticAleTeam,
                                                    nameOfTeamCheckoutSelect: values && values.length>0
                                                    ?new Map(values.map(v => [v,v])): new Map()
                                                })
                                            }}
                                            
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                variant="outlined"
                                                label="Nhân viên"
                                                placeholder="Favorites"
                                            />
                                            )}
                                        />
                                        {/* {statisticAleTeam.nameOfTeamCheckout?.map((item) => (
                                            <Grid className={clsx(globalStyle.pp0)}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={Boolean(
                                                                statisticAleTeam?.nameOfTeamCheckoutSelect?.get(item),
                                                            )}
                                                            onChange={(e, checked) => {
                                                                const getChecked =
                                                                    statisticAleTeam?.nameOfTeamCheckoutSelect;
                                                                if ((getChecked?.size || 0) <= 1 && !checked) {
                                                                    return;
                                                                }
                                                                if (checked) {
                                                                    getChecked?.set(item, item);
                                                                } else {
                                                                    getChecked?.delete(item);
                                                                }
                                                                setStatisticAleTeam({
                                                                    ...statisticAleTeam,
                                                                    nameOfTeamCheckoutSelect: getChecked,
                                                                });
                                                            }}
                                                        />
                                                    }
                                                    label={item}
                                                /> 
                                            </Grid>
                                        ))} */}
                                    </Grid>
                                    <ChartGoogle
                                        width={'95%'}
                                        height={'600px'}
                                        chartType="BarChart"
                                        loader={<div>Loading Chart</div>}
                                        data={getIntervalChart({
                                            interval: statisticAleTeam?.intervalCheckoutTeam || [],
                                            nameOfTeam:
                                                Array.from(
                                                    statisticAleTeam?.nameOfTeamCheckoutSelect?.values() || [],
                                                ) || [],
                                        })}
                                        options={{
                                            isStacked: true,
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
                            {/* <Grid item lg={12} md={12}>
                                <Grid className={classes.frChart}>
                                    <Grid>
                                        <Typography variant="h5">Team Regsiter</Typography>
                                    </Grid>
                                    <Grid container>
                                        {statisticAleTeam.nameOfTeamRegister?.map((item) => (
                                            <Grid className={clsx(globalStyle.pp0)}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={Boolean(
                                                                statisticAleTeam?.nameOfTeamRegisterSelect?.get(item),
                                                            )}
                                                            onChange={(e, checked) => {
                                                                const getChecked =
                                                                    statisticAleTeam?.nameOfTeamRegisterSelect;
                                                                if ((getChecked?.size || 0) <= 1 && !checked) {
                                                                    return;
                                                                }
                                                                if (checked) {
                                                                    getChecked?.set(item, item);
                                                                } else {
                                                                    getChecked?.delete(item);
                                                                }
                                                                setStatisticAleTeam({
                                                                    ...statisticAleTeam,
                                                                    nameOfTeamRegisterSelect: getChecked,
                                                                });
                                                            }}
                                                        />
                                                    }
                                                    label={item}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <ChartGoogle
                                        height={'900px'}
                                        width={'95%'}
                                        chartType="LineChart"
                                        loader={<div>Loading Chart</div>}
                                        data={getIntervalChart({
                                            interval: statisticAleTeam?.intervalRegisterTeam || [],
                                            nameOfTeam:
                                                Array.from(
                                                    statisticAleTeam?.nameOfTeamRegisterSelect?.values() || [],
                                                ) || [],
                                        })}
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
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
