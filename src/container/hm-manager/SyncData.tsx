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
    styleLinkToProduct: {
        color: theme.palette.primary.main,
    },
}));
type State = {};

function SyncData(props: Props) {
    const { userHmId } = useParams<{ userHmId: string }>();
    const history = useHistory();

    const [security, setSecurity] = useState<{
        password: string;
        isComfirm: boolean;
    }>({
        isComfirm: true,
        password: '',
    });

    const classes = useStyle();
    const globalStyle = useGlobalStyles();
    const [state, setState] = useState<State>();

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

    return security.isComfirm ? (
        <Grid container className={classes.root}></Grid>
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

export default React.memo(SyncData);
