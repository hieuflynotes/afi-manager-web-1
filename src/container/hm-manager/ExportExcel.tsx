import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
    Checkbox,
    FormControlLabel,
    Grid,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import TextField from '../../component/common/TextFiled';
import Button from '../../component/common/Button';
import ListGrid from '../../component/common/ListGrid';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { useCrudHook } from '../../hook/useCrudHook';
import { Pagination } from '@material-ui/lab';
import PopUpConfirm from '../../component/common/PopupConfirm';
import { useHistory, useParams } from 'react-router-dom';
import { UserHm } from 'src/afi-manager-base-model/model/UserHm';
import { orderTrackingController, userHmController } from 'src/controller';
import UserHmItemList from 'src/component/AutoOrderHm/UserHmItemList';
import PopupInsertUser from 'src/component/AutoOrderHm/PopupInsertUser';
import theme from 'src/theme/MuiTheme';
import { OrderTracking } from 'src/afi-manager-base-model/model/OrderTracking';
import ProgressHmItemList from 'src/component/AutoOrderHm/ProgressHmItemList';
import { ListFilter } from 'luong-base-model/lib';
import DatePicker from 'src/component/common/DatePicker';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CheckBox } from '@material-ui/icons';

import SelectBox from 'src/component/common/SelectBox';
import { ExportOrderTracking, PropsExportData } from 'src/afi-manager-base-model/controllers/IOrderTrackingController';
import { Parser } from 'json2csv';
const fileDownload = require('js-file-download');

type Props = {};
const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
        background: 'white',
        padding: theme.spacing(2),
    },
    rootInputPass: {
        width: '100%',
        height: '100vh',
        background: 'white',
    },
    rootOption: {
        padding: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(2),
    },
    container: {
        maxHeight: 640,
    },
}));
type State = {
    userHm: Map<string, UserHm>;
    optionFilter: PropsExportData;
    dataExport: ExportOrderTracking[];
};

interface Column {
    id: keyof ExportOrderTracking;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'mailParent', label: 'Email Partent', align: 'left' },
    { id: 'emailLogin', label: 'Email Login' },
    { id: 'passwordLogin', label: 'Password Login' },
    {
        id: 'totalPrice',
        label: 'Total Price',
    },
    {
        id: 'isOrder',
        label: 'Đã order',
    },
    {
        id: 'isRegister',
        label: 'Đã đăng kí',
    },
    {
        id: 'errorDesc',
        label: 'Lỗi',
    },
];

function ExportExcel(props: Props) {
    const { userHmId } = useParams<{ userHmId: string }>();
    const history = useHistory();

    const [security, setSecurity] = useState<{
        password: string;
        isComfirm: boolean;
    }>({
        isComfirm: false,
        password: '',
    });

    const classes = useStyle();
    const globalStyle = useGlobalStyles();
    const [state, setState] = useState<State>({
        userHm: new Map(),
        optionFilter: {
            from: new Date(),
            to: new Date(),
            isError: undefined,
            isOrder: undefined,
            isRegiter: undefined,
            userHmId: [],
        },
        dataExport: [],
    });

    const onLogin = () => {
        if (security.password == 'minhhoang123') {
            setSecurity({
                password: '',
                isComfirm: true,
            });
        }
    };
    useEffect(() => {
        userHmController.find({}).then((res) => {
            setState({
                ...state,
                userHm: new Map<string, UserHm>(res.map((item) => [item.id || '', item])),
            });
        });
        return () => {};
    }, []);

    const onChangeOrderOption = (value: boolean | 'null') => {
        let statusOrder: any = value;
        if (value == 'null') {
            statusOrder = undefined;
        }
        setState({
            ...state,
            optionFilter: {
                ...state.optionFilter,
                isOrder: statusOrder,
            },
        });
    };

    const onChangeRegisterOption = (value: boolean | 'null') => {
        let statusError: any = value;
        if (value == 'null') {
            statusError = undefined;
        }
        setState({
            ...state,
            optionFilter: {
                ...state.optionFilter,
                isRegiter: statusError,
            },
        });
    };
    const onChangeErrorOption = (value: boolean | 'null') => {
        let statusError: any = value;
        if (value == 'null') {
            statusError = undefined;
        }
        setState({
            ...state,
            optionFilter: {
                ...state.optionFilter,
                isError: statusError,
            },
        });
    };

    const handleGetData = () => {
        orderTrackingController
            .exportData({
                ...state.optionFilter,
            })
            .then((res) => {
                setState({
                    ...state,
                    dataExport: res,
                });
            });
    };

    const exportExcel = () => {
        console.log('on export');

        const json2csvParser = new Parser({
            fields: Object.keys(state.dataExport[0]),
            header: true,
        });
        const csv = json2csvParser.parse(state.dataExport);
        fileDownload(csv, `data-hm-${new Date().toString()}.csv`);
    };

    return security.isComfirm ? (
        <Grid container className={classes.root}>
            <Grid
                style={{
                    width: '100%',
                }}
            >
                <Grid className={classes.rootOption} container justify="space-around">
                    <Grid className={clsx(globalStyle.pp2)}>
                        <DatePicker
                            onChangeDateRange={(date) => {
                                console.log(date);

                                setState({
                                    ...state,
                                    optionFilter: {
                                        ...state.optionFilter,
                                        from: date.startDate || new Date(0),
                                        to: date.endDate || new Date(),
                                    },
                                });
                            }}
                            label={'Chọn ngày'}
                        />
                    </Grid>
                    <Grid className={clsx(globalStyle.pp2)}>
                        <Autocomplete
                            options={[
                                {
                                    username: 'All',
                                    id: 'all',
                                },
                            ].concat(Array.from(state.userHm.values()) as any)}
                            getOptionLabel={(option) => option.username || ''}
                            onChange={(e, value) => {
                                if (!value || value.id == 'all') {
                                    setState({
                                        ...state,
                                        optionFilter: {
                                            ...state.optionFilter,
                                            userHmId: [],
                                        },
                                    });
                                } else {
                                    setState({
                                        ...state,
                                        optionFilter: {
                                            ...state.optionFilter,
                                            userHmId: [value.id],
                                        },
                                    });
                                }
                            }}
                            style={{ width: 300 }}
                            renderInput={(params: any) => (
                                <TextField {...params} label="Select user" variant="outlined" />
                            )}
                        />
                    </Grid>
                    <Grid className={clsx(globalStyle.pp2)}>
                        <SelectBox
                            variant="outlined"
                            value={state.optionFilter.isRegiter === undefined ? 'null' : state.optionFilter.isRegiter}
                            data={[true, false, 'null']}
                            label="Option Register"
                            style={{
                                minWidth: 150,
                            }}
                            labelOption={(value) => {
                                if (value === true) {
                                    return 'Chỉ lấy order đã register';
                                }
                                if (value === false) {
                                    return 'Chỉ lấy order chưa register';
                                }
                                return 'Tất cả';
                            }}
                            onChange={(e: any) => {
                                onChangeRegisterOption(e);
                            }}
                            valueOption={(value) => value}
                        />
                    </Grid>
                    <Grid className={clsx(globalStyle.pp2)}>
                        <SelectBox
                            style={{
                                minWidth: 150,
                            }}
                            variant="outlined"
                            value={state.optionFilter.isOrder === undefined ? 'null' : state.optionFilter.isOrder}
                            data={[true, false, 'null']}
                            label="Option order"
                            labelOption={(value) => {
                                if (value === true) {
                                    return 'Chỉ lấy order rồi';
                                }
                                if (value === false) {
                                    return 'Chỉ lấy order chưa order';
                                }
                                return 'Tất cả';
                            }}
                            onChange={(e: any) => onChangeOrderOption(e as any)}
                            valueOption={(value) => value}
                        />
                    </Grid>

                    <Grid className={clsx(globalStyle.pp2)}>
                        <SelectBox
                            style={{
                                minWidth: 150,
                            }}
                            variant="outlined"
                            value={state.optionFilter.isError === undefined ? 'null' : state.optionFilter.isError}
                            data={[true, false, 'null']}
                            label="Option Error"
                            labelOption={(value) => {
                                if (value === true) {
                                    return 'Chỉ lấy order bị lỗi';
                                }
                                if (value === false) {
                                    return 'Chỉ lấy order không lỗi';
                                }
                                return 'Tất cả';
                            }}
                            onChange={(e: any) => {
                                onChangeErrorOption(e);
                            }}
                            valueOption={(value) => value}
                        />
                    </Grid>
                    <Grid className={clsx(globalStyle.pp2)}>
                        <Button variant="contained" color="primary" onClick={() => handleGetData()}>
                            Get Data
                        </Button>
                    </Grid>
                </Grid>
                <Grid
                    container
                    justify="space-between"
                    className={globalStyle.mt2}
                    alignContent="center"
                    alignItems="center"
                >
                    <Grid>
                        <Typography color="primary">Tổng : {state.dataExport.length}</Typography>
                    </Grid>
                    <Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={exportExcel}
                            disabled={state.dataExport.length == 0}
                        >
                            Export Excel
                        </Button>
                    </Grid>
                </Grid>
                <Grid
                    className={clsx(classes.rootOption, globalStyle.mt2)}
                    container
                    style={{
                        width: '100%',
                    }}
                >
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state.dataExport.map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align || 'center'}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value?.toString()}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>
    ) : (
        <Grid container className={classes.rootInputPass} justify="center" alignItems="center">
            <TextField
                variant="outlined"
                label="Input password"
                value={security.password}
                onChange={(e) => {
                    setSecurity({
                        ...security,
                        password: e.target.value,
                    });
                }}
            ></TextField>
            <Button
                variant="contained"
                color="primary"
                className={globalStyle.ml2}
                size="medium"
                onClick={() => {
                    onLogin();
                }}
            >
                Login
            </Button>
        </Grid>
    );
}

export default React.memo(ExportExcel);
