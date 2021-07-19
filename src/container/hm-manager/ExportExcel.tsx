import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Checkbox, FormControlLabel, Grid, makeStyles, Typography } from "@material-ui/core";
import TextField from "../../component/common/TextFiled";
import Button from "../../component/common/Button";
import ListGrid from "../../component/common/ListGrid";
import { useGlobalStyles } from "../../theme/GlobalStyle";
import { useCrudHook } from "../../hook/useCrudHook";
import { Pagination } from "@material-ui/lab";
import PopUpConfirm from "../../component/common/PopupConfirm";
import { useHistory, useParams } from "react-router-dom";
import { UserHm } from "src/afi-manager-base-model/model/UserHm";
import { orderTrackingController, userHmController } from "src/controller";
import UserHmItemList from "src/component/AutoOrderHm/UserHmItemList";
import PopupInsertUser from "src/component/AutoOrderHm/PopupInsertUser";
import theme from "src/theme/MuiTheme";
import { OrderTracking } from "src/afi-manager-base-model/model/OrderTracking";
import ProgressHmItemList from "src/component/AutoOrderHm/ProgressHmItemList";
import { ListFilter } from "luong-base-model/lib";
import DatePicker from "src/component/common/DatePicker";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CheckBox } from "@material-ui/icons";
import SelectBox from "src/component/common/SelectBox";

type Props = {

};
const useStyle = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100vh",
        background: "white",
        padding: theme.spacing(2)
    },
    rootInputPass: {
        width: "100%",
        height: "100vh",
        background: "white"
    },
    rootOption: {
        padding: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(2),
    }
}));
type State = {
    userHm: Map<string, UserHm>
}
function ExportExcel(props: Props) {
    const { userHmId } = useParams<{ userHmId: string }>();
    const history = useHistory();

    const [security, setSecurity] = useState<{
        password: string,
        isComfirm: boolean
    }>({
        isComfirm: true,
        password: ""
    })

    const classes = useStyle();
    const globalStyle = useGlobalStyles();
    const [state, setState] = useState<State>({
        userHm: new Map()
    });

    const onLogin = () => {
        if (security.password == "minhhoang123") {
            setSecurity({
                password: "",
                isComfirm: true
            })
        }
    }
    useEffect(() => {
        userHmController.find({}).then(res => {
            setState({
                ...state,
                userHm: new Map<string, UserHm>(res.map(item => [item.id || "", item]))
            })
        })
        return () => { };
    }, []);

    return security.isComfirm ? <Grid container className={classes.root}>
       <Grid style = {{
           width : "100%"
       }}>
       <Grid  className={classes.rootOption} container justify= "space-around">
            <Grid className={clsx(globalStyle.pp2)}>
                <DatePicker
                    onChangeDateRange={(date) => {
                        // setStateDate({
                        // 	...stateDate,
                        // 	from: date.startDate,
                        // 	to: date.endDate,
                        // });
                    }}
                    label={"Chọn ngày"}
                />
            </Grid>
            <Grid className={clsx(globalStyle.pp2)}>
                <Autocomplete
                    options={[{
                        username: "All",
                        id: "all"
                    }].concat(Array.from(state.userHm.values()) as any)}
                    getOptionLabel={(option) => option.username || ""}
                    style={{ width: 300 }}
                    renderInput={(params: any) => <TextField {...params} label="Select user" variant="outlined" />}
                />
            </Grid>
            <Grid className={clsx(globalStyle.pp2)}>
                    <SelectBox
                        variant="outlined"
                        value = {"null"}
                        data={[true, false, "null"]}
                        label= "Option order"
                        labelOption={(value) => {
                            if (value === true) {
                                return "Chỉ lấy order rồi"
                            }
                            if (value === false) {
                                return "Chỉ lấy order chưa order"
                            }
                            return "Tất cả"
                        }}
                        onChange={(e: any) => {
                            // todo
                         }}
                        valueOption = {(value)=> value }
                    />
                </Grid>
                <Grid className={clsx(globalStyle.pp2)}>
                    <SelectBox
                        variant="outlined"
                        value = {"null"}
                        data={[true, false, "null"]}
                        label= "Option Register"
                        labelOption={(value) => {
                            if (value === true) {
                                return "Chỉ lấy order đã register"
                            }
                            if (value === false) {
                                return "Chỉ lấy order chưa register"
                            }
                            return "Tất cả"
                        }}
                        onChange={(e: any) => {
                            // todo
                         }}
                        valueOption = {(value)=> value }
                    />
                </Grid>
                <Grid className={clsx(globalStyle.pp2)}>
                    <SelectBox
                        variant="outlined"
                        value = {"null"}
                        data={[true, false, "null"]}
                        label= "Option order"
                        labelOption={(value) => {
                            if (value === true) {
                                return "Chỉ lấy order bị lỗi"
                            }
                            if (value === false) {
                                return "Chỉ lấy order không lỗi"
                            }
                            return "Tất cả"
                        }}
                        onChange={(e: any) => {
                            // todo
                         }}
                        valueOption = {(value)=> value }
                    />
            </Grid>
            <Grid className={clsx(globalStyle.pp2)}>
                <Button variant = "contained" color = "primary">
                    Get Data
                </Button>
            </Grid>




        </Grid>
       </Grid>
    </Grid> : (<Grid container className={classes.rootInputPass} justify="center" alignItems="center">
        <TextField variant="outlined" label="Input password" value={security.password} >

        </TextField>
        <Button variant="contained" color="primary" className={globalStyle.ml2} size="medium">
            Login
        </Button>
    </Grid>)
}

export default React.memo(ExportExcel);
