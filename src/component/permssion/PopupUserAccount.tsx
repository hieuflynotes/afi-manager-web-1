/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, TextField } from '@material-ui/core';
import clsx from 'clsx';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { UserAccount } from 'src/afi-manager-base-model/model/User';
import { useGlobalStyles } from 'src/theme/GlobalStyle';
import * as Yup from 'yup';
import BaseDialog from '../common/BaseDialog';
import SelectBox from '../common/SelectBox';

type Props = {
    isDisplay: boolean;
    item: UserAccount;
    onEdit: (item: UserAccount) => void;
    onCancel: () => void;
};
const validate = Yup.object({
    email: Yup.string().email('Không đúng định dạng email').max(100, 'Chữ không được quá 100 kí tự').nullable(),
    fullName: Yup.string()
        .max(100, 'Chữ không được quá 100 kí tự')
        .required('Không được để trống !!')
        .trim()
        .nullable(),
    username: Yup.string()
        .max(100, 'Chữ không được quá 100 kí tự')
        .required('Không được để trống !!')
        .trim()
        .nullable(),
});

export default function PopupUserAccount(props: Props) {
    const formik = useFormik<UserAccount>({
        initialValues: {} as UserAccount,
        validationSchema: validate,
        onSubmit: () => {
            props.onEdit({
                ...formik.values,
            });
        },
    });

    const onSubmit = () => {
        formik.handleSubmit();
        const touch = {
            ..._.mapValues(new UserAccount(), () => true),
            userName: true,
            password: true,
        };
        console.log(touch);

        formik.setTouched(touch);
    };

    const createPassword = () => {
        return [...Array(10)].map((i) => (~~(Math.random() * 36)).toString(36)).join('');
    };
    useEffect(() => {
        if (props.isDisplay) {
            console.log(props.item);
            formik.setValues(
                _.cloneDeep({
                    ...props.item,
                    password: props.item?.password || createPassword(),
                }),
            );
            formik.setTouched(_.mapValues(new UserAccount(), () => false));
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
                title="Khách hàng"
            >
                <Grid container direction="column" justify="space-around">
                    <Grid>
                        <TextField
                            value={formik.values.fullName}
                            helperText={formik.touched.fullName && formik.errors.fullName}
                            name="fullName"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Họ & Tên"
                        ></TextField>
                    </Grid>
                    <Grid>
                        <TextField
                            value={formik.values.email}
                            helperText={formik.touched.email && formik.errors.email}
                            variant="outlined"
                            name="email"
                            onChange={formik.handleChange}
                            fullWidth
                            className={clsx(globalStyles.mt2, globalStyles.mb2)}
                            label="Địa chỉ email"
                        ></TextField>
                    </Grid>
                    <Grid>
                        <TextField
                            value={formik.values.username}
                            helperText={formik.touched.username && formik.errors.username}
                            variant="outlined"
                            name="username"
                            onChange={formik.handleChange}
                            fullWidth
                            className={clsx(globalStyles.mt2, globalStyles.mb2)}
                            label="Địa chỉ email"
                        ></TextField>
                    </Grid>
                    <Grid>
                        <TextField
                            value={formik.values.password}
                            // helperText={
                            // 	formik.touched[`username` as any] && formik.errors.user['username']
                            // }
                            onChange={formik.handleChange}
                            variant="outlined"
                            fullWidth
                            className={clsx(globalStyles.mt2, globalStyles.mb2)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="password"
                            InputProps={{
                                endAdornment: (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={(e) => {
                                            formik.setValues({
                                                ...formik.values,
                                                password: createPassword(),
                                            });
                                        }}
                                    >
                                        {' '}
                                        reset
                                    </Button>
                                ),
                            }}
                            label="Mật khẩu"
                        ></TextField>
                    </Grid>

                    <Grid>
                        {/* <SelectBox
                            className={clsx(globalStyles.mt2, globalStyles.mb4)}
                            variant="outlined"
                            fullWidth
                            value={formik.values.typeCustomer}
                            data={Object.keys(ETypeCustomer)}
                            onChange={(value: any) => {
                                formik.setValues({
                                    ...formik.values,
                                    typeCustomer: value,
                                });
                            }}
                            labelOption={(label) => getStringETypeCustomer(label)}
                            valueOption={(value) => value}
                        /> */}
                    </Grid>
                </Grid>
            </BaseDialog>
        </Grid>
    );
}
