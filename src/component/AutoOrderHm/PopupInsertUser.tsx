/* eslint-disable react-hooks/exhaustive-deps */

import { Button, FormControlLabel, FormGroup, Grid, Switch, TextField } from '@material-ui/core';
import clsx from 'clsx';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useEffect } from 'react';
import SelectBox from '../common/SelectBox';
import * as Yup from 'yup';
import BaseDialog from '../common/BaseDialog';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { UserHm } from 'src/afi-manager-base-model/model/UserHm';

type Props = {
    isDisplay: boolean;
    item: UserHm;
    onEdit: (item: UserHm) => void;
    onCancel: () => void;
};
const validate = Yup.object({
    lastName: Yup.string().max(20, 'Không quá 20 kí tự').required('Không được để trống').trim().nullable(),
    address: Yup.string().max(40, 'Không được quá 40 kí tự').required('Không được để trống').trim().nullable(),
    firstName: Yup.string().max(20, 'Không quá 20 kí tự').required('Không được để trống').trim().nullable(),
    emailCheckout: Yup.string().max(100, 'Không được quá 20 kí tự').required('Không được để trống').trim().nullable(),
    password: Yup.string()
        .max(40, 'Không được quá 40 kí tự')
        .required('Không được để trống')
        .trim()
        .matches(
            new RegExp('(?=[A-Za-z0-9=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*)(?=.{8,}).*$'),
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
});

export default function PopupInsertUser(props: Props) {
    const formik = useFormik<UserHm>({
        initialValues: {} as UserHm,
        validationSchema: validate,
        onSubmit: () => {
            props.onEdit({
                ...formik.values,
                username: formik.values.username?.trim(),
                password: formik.values.password?.trim(),
            });
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
    return (
        <Grid>
            <BaseDialog
                isDisplay={props.isDisplay}
                onCancel={props.onCancel}
                onClickConfirm={() => {
                    onSubmit();
                }}
                title="User HM"
            >
                <Grid container direction="column" justify="space-around">
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
                            label="User name"
                            disabled={formik.values.isDone}
                        ></TextField>
                    </Grid>
                    <Grid>
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
                        ></TextField>
                    </Grid>
                    <Grid>
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
                        ></TextField>
                    </Grid>
                    <Grid>
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
                        ></TextField>
                    </Grid>
                    <Grid>
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
                        ></TextField>
                    </Grid>
                    <Grid>
                        <TextField
                            value={formik.values.address}
                            helperText={formik.touched.address && formik.errors.address}
                            error={Boolean(formik.touched.address && formik.errors.address)}
                            name="address"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Address"
                        ></TextField>
                    </Grid>
                    <Grid>
                        <TextField
                            value={formik.values.address2}
                            helperText={formik.touched.address2 && formik.errors.address2}
                            error={Boolean(formik.touched.address2 && formik.errors.address2)}
                            name="address2"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Address 2"
                        ></TextField>
                    </Grid>
                    <Grid>
                        <TextField
                            value={formik.values.town}
                            helperText={formik.touched.town && formik.errors.town}
                            error={Boolean(formik.touched.town && formik.errors.town)}
                            name="town"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Town"
                        ></TextField>
                    </Grid>
                    <Grid>
                        <TextField
                            value={formik.values.postcode}
                            helperText={formik.touched.postcode && formik.errors.postcode}
                            error={Boolean(formik.touched.postcode && formik.errors.postcode)}
                            name="postcode"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Postcode"
                        ></TextField>
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
                        ></TextField>
                    </Grid>

                    <Grid>
                        <TextField
                            value={formik.values.note}
                            helperText={formik.touched.note && formik.errors.note}
                            name="note"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Note"
                        ></TextField>
                    </Grid>
                </Grid>
            </BaseDialog>
        </Grid>
    );
}
