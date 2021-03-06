/* eslint-disable react-hooks/exhaustive-deps */

import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, InputAdornment, InputLabel, makeStyles, MenuItem, Select, TextField, Tooltip, Typography } from '@material-ui/core';
import clsx from 'clsx';
import NumberFormat from 'react-number-format';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import BaseDialog from '../common/BaseDialog';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { UserHm } from 'src/afi-manager-base-model/model/UserHm';
import { wareHouses } from 'src/constants/WareHouse';
import PopUpAddressTemplate from './PopUpAddressTemplate';
import { OrderAddress } from 'src/afi-manager-base-model/model/OrderAddress';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import { checkExpiredCode, getAvailableCodes } from 'src/helper/CheckBestOptionForOrder';
import WarningIcon from '@material-ui/icons/Warning';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import { useSelector } from 'react-redux';
import { RootState } from 'src/rematch/store';

const useStyle = makeStyles((theme) => ({
    divide2Col: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: 20
    },
    tooltipPlacementTop: {
        margin: '5px 0'
    },
}))
type Props = {
    isDisplay: boolean;
    item: UserHm;
    onEdit: (item: UserHm, isRunBot?: boolean) => void;
    onCancel: () => void;
};
const validate = Yup.object({
    address: Yup.string().max(40, 'Không được quá 40 kí tự').required('Không được để trống').trim().nullable(),
    firstName: Yup.string().max(20, 'Không quá 20 kí tự').required('Không được để trống').trim().nullable(),
    emailCheckout: Yup.string().max(100, 'Không được quá 20 kí tự').required('Không được để trống').trim().test(
        'K được có @gmail.com',
        'K được có @gmail.com',
        (value) => {
            return !value?.includes('@')
        }
    ).nullable(),
    password: Yup.string()
        .max(40, 'Không được quá 40 kí tự')
        .required('Không được để trống')
        .trim()
        .matches(
            /(?=[A-Za-z0-9=!"#$%&'()*+,-./:;<=>?@\\\[\]^_`{|}~]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*)(?=.{8,}).*$/,
            '1 chữ số , 1 chữ in hoa, 1 chữ in thường, 8 kí tự',
        )
        .nullable(),
    phone: Yup.string()
        .max(20, 'Không được quá 20 kí tự')
        .required('Không được để trống')
        .matches(/^\+44[0-9\s]{7,14}$/, 'Không đúng số điện thoại UK')
        .nullable(),
    postcode: Yup.string().max(40, 'Không được quá 40 kí tự').required('Không được để trống').trim().nullable(),
    town: Yup.string().max(40, 'Không được quá 40 kí tự').required('Không được để trống').trim().nullable(),
    username: Yup.string().max(40, 'Không được quá 40 kí tự').required('Không được để trống').trim().nullable(),
    extraInfor: Yup.object({
        wareHouse: Yup.string().required("Không được để trống"),
        verifiedAmount: Yup.string().matches(/[0-9]/, "").required("Không được để trống"),
        verifiedQuantity: Yup.string().matches(/[0-9]/, "").required("Không được để trống"),
        codeOff: Yup.string(),
        staffEmail: Yup.string()
    })
});

export default function PopupInsertUser(props: Props) {
    const [isOpenAddList, setIsOpenAddList] = useState(false)
    const [isDangerAddress, setIsDangerAddress] = useState(false)
    const authen = useSelector((state: RootState) => state.authen);
    const [isRunBot, setIsRunBot] = useState(false)


    const formik = useFormik<UserHm>({
        initialValues: {} as UserHm,
        validationSchema: validate,
        onSubmit: () => {
            props.onEdit({
                ...formik.values,
                username: formik.values.username?.trim(),
                password: formik.values.password?.trim(),
                extraInfor: {
                    ...formik.values.extraInfor,
                    staffEmail: formik.values.id ? formik.values.extraInfor?.staffEmail : authen.info?.email
                }
            }, isRunBot);
        },
    });
    const onSubmit = () => {
        formik.handleSubmit();
        const touch = {
            ..._.mapValues(new UserHm(), () => true),
        };
        formik.setTouched(touch);
    };

    useEffect(() => {
        if (props.isDisplay) {
            formik.setValues(
                _.cloneDeep({
                    ...props.item,
                    isDone: props.item.isDone || false,
                    isMerge: props.item.isMerge || false,
                }),
            );
            formik.setTouched(_.mapValues(new UserHm(), () => false));
        }
    }, [props]);

    const globalStyles = useGlobalStyles();
    const classes = useStyle();
    return (
        <Grid>
            <BaseDialog
                isDisplay={props.isDisplay}
                onCancel={props.onCancel}
                onClickConfirm={() => {
                    onSubmit();
                }}
                title={`Thông tin đơn hàng ${authen.info?.email}`}
            >
                <Grid container direction="column" justify="space-around">
                    <>
                        {/* <Grid>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Switch
                                        onChange={(e) => {
                                            formik.setValues({
                                                ...formik.values,
                                                isDone:
                                                    e.target.checked || false,
                                            });
                                        }}
                                        checked={formik.values.isDone}
                                    />
                                }
                                label="IsDone"
                            />
                        </FormGroup>
                    </Grid> */}
                        {/* <Grid>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Switch
                                        onChange={(e) => {
                                            formik.setValues({
                                                ...formik.values,
                                                isMerge: e.target.checked || false,
                                            });
                                        }}
                                        checked={formik.values.isMerge}
                                    />
                                }
                                label="Đánh dấu đã merge"
                            />
                        </FormGroup>
                    </Grid> */}
                    </>
                    <Grid>
                        <TextField
                            value={formik.values.username}
                            helperText={formik.touched.username && formik.errors.username}
                            error={Boolean(formik.touched.username && formik.errors.username)}
                            name="username"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Email giỏ hàng"
                            disabled={formik.values.isDone}
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            value={formik.values.emailCheckout}
                            helperText={formik.touched.emailCheckout && formik.errors.emailCheckout}
                            error={Boolean(formik.touched.emailCheckout && formik.errors.emailCheckout)}
                            disabled={formik.values.isDone}
                            name="emailCheckout"
                            onChange={(e) => {
                                let valueEmailCheckout: string = e.target?.value || '';
                                const checkLastIndex = valueEmailCheckout.lastIndexOf('@');
                                if (checkLastIndex >= 0) {
                                    valueEmailCheckout = valueEmailCheckout.substring(0, checkLastIndex);
                                }

                                e.target.value = valueEmailCheckout;
                                formik.handleChange(e);
                            }}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="emailCheckout (not @gmail.com)"
                        />
                    </Grid>
                    <Grid className={classes.divide2Col}>
                        <TextField
                            value={formik.values.password}
                            helperText={formik.touched.password && formik.errors.password}
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            name="password"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Password"
                        />
                        <TextField
                            value={formik.values.phone}
                            helperText={formik.touched.phone && formik.errors.phone}
                            error={Boolean(formik.touched.phone && formik.errors.phone)}
                            name="phone"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Phone"
                        />
                    </Grid>
                    <Grid className={classes.divide2Col}>
                        <TextField
                            value={formik.values.firstName}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                            name="firstName"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="First name"
                        />
                        <TextField
                            value={formik.values.lastName}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                            name="lastName"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Last name"
                        />
                    </Grid>
                    <Grid>
                        <Grid container direction="row" justifyContent="space-around" alignItems="center">
                            <TextField InputLabelProps={{ shrink: true }}
                                value={formik.values.address}
                                helperText={formik.touched.address && formik.errors.address}
                                error={Boolean(formik.touched.address && formik.errors.address)}
                                name="address"
                                onChange={formik.handleChange}
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {isDangerAddress &&
                                                <Tooltip title="Cẩn thận với địa chỉ này!" placement="top-start"
                                                    classes={{ tooltipPlacementTop: classes.tooltipPlacementTop }}
                                                >
                                                    <WarningIcon color="error" fontSize="small" />
                                                </Tooltip>}
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                className={clsx(globalStyles.mt1)}
                                label="Address"
                            />
                        </Grid>
                        <Grid container direction="row" alignItems="center" className={clsx(globalStyles.mt1, globalStyles.mb2)}>
                            <FavoriteRoundedIcon color="primary" style={{ fontSize: 15 }} />
                            <FavoriteRoundedIcon color="primary" style={{ fontSize: 15 }} />
                            <FavoriteRoundedIcon color="primary" style={{ fontSize: 15 }} />
                            <Typography color="primary" variant="body2" style={{ textDecoration: "underline", marginLeft: 7, cursor: "pointer" }}
                                onClick={(e) => setIsOpenAddList(true)}>
                                Mẫu địa chỉ chuẩn VIP PRO!</Typography>
                        </Grid>
                    </Grid>
                    <Grid>
                        <TextField InputLabelProps={{ shrink: true }}
                            value={formik.values.address2}
                            helperText={formik.touched.address2 && formik.errors.address2}
                            error={Boolean(formik.touched.address2 && formik.errors.address2)}
                            name="address2"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Address 2"
                        />
                    </Grid>

                    <Grid className={classes.divide2Col}>
                        <TextField InputLabelProps={{ shrink: true }}
                            value={formik.values.town}
                            helperText={formik.touched.town && formik.errors.town}
                            error={Boolean(formik.touched.town && formik.errors.town)}
                            name="town"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Town"
                        />
                        <TextField InputLabelProps={{ shrink: true }}
                            value={formik.values.postcode}
                            helperText={formik.touched.postcode && formik.errors.postcode}
                            error={Boolean(formik.touched.postcode && formik.errors.postcode)}
                            name="postcode"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Postcode"
                        />
                    </Grid>

                    <Grid className={classes.divide2Col}>
                        <FormControl variant="outlined" className={clsx(globalStyles.mt1, globalStyles.mb2)}>
                            <InputLabel>Kho</InputLabel>
                            <Select
                                fullWidth
                                label="Kho"
                                value={formik.values.extraInfor?.wareHouse || ""}
                                onChange={(e) => {
                                    let newValue = {
                                        ...formik.values,
                                        extraInfor: {
                                            ...formik.values.extraInfor,
                                            codeOff: "",
                                            wareHouse: e.target.value as string
                                        }
                                    }
                                    formik.setValues(newValue)
                                }}
                                error={Boolean(formik.touched.extraInfor && formik.errors.extraInfor && (!formik.values.extraInfor?.wareHouse || formik.values.extraInfor?.wareHouse?.length == 0))}
                            >
                                <MenuItem value="">Kho</MenuItem>
                                {wareHouses.map(w => {
                                    return (
                                        <MenuItem value={w.name}>{w.name}</MenuItem>
                                    )
                                })}
                            </Select>
                            <FormHelperText error >
                                {formik.touched.extraInfor && formik.errors.extraInfor && (!formik.values.extraInfor?.wareHouse || formik.values.extraInfor?.wareHouse?.length == 0) && "Không được để trống"}
                            </FormHelperText>
                        </FormControl>
                        <FormControl variant="outlined" className={clsx(globalStyles.mt1, globalStyles.mb2)}>
                            <Autocomplete
                                freeSolo
                                value={formik.values.extraInfor?.codeOff ? `${formik.values.extraInfor?.codeOff} ${checkExpiredCode(formik.values.extraInfor?.codeOff) && formik.values.extraInfor?.codeOff ? "(Hết hạn)" : ""}` : "Đơn thường"}
                                disabled={!formik.values.extraInfor?.wareHouse || formik.values.extraInfor?.wareHouse.length == 0
                                    || getAvailableCodes(formik.values.extraInfor.wareHouse).length == 0}
                                onChange={(event: any, newValue: string | null) => {
                                    let newCode = {
                                        ...formik.values,
                                        extraInfor: {
                                            ...formik.values.extraInfor,
                                            codeOff: newValue as string
                                        }
                                    }
                                    formik.setValues(newCode)
                                }}
                                renderInput={(params) => <TextField
                                    variant="outlined"
                                    label="Code" {...params} />}
                                options={formik.values.extraInfor?.wareHouse && getAvailableCodes(formik.values.extraInfor.wareHouse).length > 0 &&
                                    ["Đơn thường", ...getAvailableCodes(formik.values.extraInfor?.wareHouse).filter(c => !checkExpiredCode(c)) || []] || ["Đơn thường"]}

                            />
                        </FormControl>
                    </Grid>
                    <Grid className={classes.divide2Col}>
                        <FormControl variant="outlined" className={clsx(globalStyles.mt1, globalStyles.mb2)}>
                            <NumberFormat
                                customInput={TextField}
                                required
                                thousandSeparator
                                value={formik.values.extraInfor?.verifiedQuantity}
                                decimalScale={0}
                                fixedDecimalScale
                                onValueChange={(value) => {
                                    let newValue = {
                                        ...formik.values,
                                        extraInfor: {
                                            ...formik.values.extraInfor,
                                            verifiedQuantity: value.floatValue
                                        }
                                    }
                                    formik.setValues(newValue)
                                }}
                                placeholder="Nhập số món"
                                fullWidth
                                variant="outlined"
                            />
                            <FormHelperText error >
                                {formik.touched.extraInfor && formik.errors.extraInfor && (!formik.values.extraInfor?.verifiedQuantity || formik.values.extraInfor?.verifiedQuantity == 0) && "Không được để trống"}
                            </FormHelperText>
                        </FormControl>
                        <FormControl variant="outlined" className={clsx(globalStyles.mt1, globalStyles.mb2)}>
                            <NumberFormat
                                customInput={TextField}
                                thousandSeparator
                                decimalScale={2}
                                fixedDecimalScale
                                value={formik.values.extraInfor?.verifiedAmount}
                                onValueChange={(value) => {
                                    let newValue = {
                                        ...formik.values,
                                        extraInfor: {
                                            ...formik.values.extraInfor,
                                            verifiedAmount: value.floatValue
                                        }
                                    }
                                    formik.setValues(newValue)
                                }}
                                required
                                placeholder="Nhập tổng tiền"
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                    },
                                    startAdornment:
                                        <InputAdornment position="start"
                                            style={{ marginRight: 5, zIndex: 1000, color: "#333333" }}
                                        >£</InputAdornment>,
                                }}
                                fullWidth
                                variant="outlined"
                            />
                            <FormHelperText error >
                                {formik.touched.extraInfor && formik.errors.extraInfor && (!formik.values.extraInfor?.verifiedAmount || formik.values.extraInfor?.verifiedAmount == 0) && "Không được để trống"}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid className={classes.divide2Col} alignItems="center">
                        <TextField
                            value={formik.values.note}
                            helperText={formik.touched.note && formik.errors.note}
                            name="note"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Note"
                        />
                        <FormGroup>
                            <FormControlLabel control={
                                <Checkbox checked={isRunBot} onChange={(e) => setIsRunBot(!isRunBot)} />}
                                label="Run Bot!" />
                        </FormGroup>
                    </Grid>
                </Grid>
            </BaseDialog>
            <PopUpAddressTemplate
                isDisplay={isOpenAddList}
                onCancel={() => setIsOpenAddList(false)}
                onSelect={(add: OrderAddress) => {
                    setIsOpenAddList(false)
                    setIsDangerAddress(add.mustBeVerified ? true : false)
                    add &&
                        formik.setValues({
                            ...formik.values,
                            address: add.address,
                            address2: add.address2,
                            town: add.town,
                            postcode: add.postcode
                        })
                }}
            />
        </Grid>
    );
}
