/* eslint-disable react-hooks/exhaustive-deps */

import { Button, FormControlLabel, FormGroup, Grid, Switch, TextField } from '@material-ui/core';
import { Permission } from 'luong-base-model';
import clsx from 'clsx';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useEffect } from 'react';
import SelectBox from '../common/SelectBox';
import * as Yup from 'yup';
import BaseDialog from '../common/BaseDialog';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { UserHm } from 'src/afi-manager-base-model/model/UserHm';

export enum EMethodPermission {
    POST = 'POST',
    GET = 'GET',
    PATH = 'PATH',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type Props = {
    isDisplay: boolean;
    item: Permission;
    onEdit: (item: Permission) => void;
    onCancel: () => void;
};
const validate = Yup.object({
    path: Yup.string()
        .max(100, 'Value must be less than 100 characters')
        .required("Can't be left blank !!")
        .trim()
        .nullable(),
    name: Yup.string()
        .max(100, 'Value must be less than 100 characters')
        .required("Can't be left blank !!")
        .trim()
        .nullable(),
});

export default function PopupPermssion(props: Props) {
    const formik = useFormik<Permission>({
        initialValues: {} as Permission,
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
            ..._.mapValues(new UserHm(), () => true),
        };
        formik.setTouched(touch);
    };

    useEffect(() => {
        if (props.isDisplay) {
            formik.setValues(
                _.cloneDeep({
                    ...props.item,
                    method: props.item.method || EMethodPermission?.GET,
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
                title="Permission"
            >
                <Grid container direction="column" justify="space-around">
                    <Grid>
                        <TextField
                            value={formik.values.name}
                            helperText={formik.touched.name && formik.errors.name}
                            name="name"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt2, globalStyles.mb2)}
                            label="Name"
                        ></TextField>
                    </Grid>
                    <Grid>
                        <TextField
                            value={formik.values.path}
                            helperText={formik.touched.path && formik.errors.path}
                            name="path"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt2, globalStyles.mb2)}
                            label="Path"
                        ></TextField>
                    </Grid>
                    <Grid>
                        <SelectBox
                            fullWidth
                            label="Method"
                            variant="outlined"
                            className={clsx(globalStyles.mt2, globalStyles.mb2)}
                            value={formik.values.method}
                            data={Object.values(EMethodPermission || {}) || []}
                            labelOption={(label) => label}
                            onChange={(value: any) => {
                                formik.setValues({
                                    ...formik.values,
                                    method: value,
                                });
                            }}
                            valueOption={(value) => value}
                        />
                    </Grid>
                </Grid>
            </BaseDialog>
        </Grid>
    );
}
