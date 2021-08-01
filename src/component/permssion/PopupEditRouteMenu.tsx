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
import { RouteComponent } from '../common/NavBar';

type Props = {
    isDisplay: boolean;
    item: RouteComponent;
    onEdit: (item: RouteComponent) => void;
    onCancel: () => void;
};
const validate = Yup.object({
    label: Yup.string()
        .max(100, 'Value must be less than 100 characters')
        .required("Can't be left blank !!")
        .trim()
        .nullable(),
});

export default function PopupEditRouteMenu(props: Props) {
    const formik = useFormik<RouteComponent>({
        initialValues: {} as RouteComponent,
        validationSchema: validate,
        onSubmit: () => {
            props.onEdit({
                ...formik.values,
            });
        },
    });
    const onSubmit = () => {
        formik.handleSubmit();
        formik.setTouched({
            label: true,
        });
    };

    useEffect(() => {
        if (props.isDisplay) {
            formik.setValues(
                _.cloneDeep({
                    ...props.item,
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
                    <Grid>
                        <TextField
                            value={formik.values.label}
                            helperText={formik.touched.label && formik.errors.label}
                            name="label"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Label"
                        ></TextField>
                    </Grid>
                </Grid>
            </BaseDialog>
        </Grid>
    );
}
