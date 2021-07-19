/* eslint-disable react-hooks/exhaustive-deps */

import {
    Button,
    FormControlLabel,
    FormGroup,
    Grid,
    Switch,
    TextField,
} from "@material-ui/core";
import clsx from "clsx";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useEffect } from "react";
import SelectBox from "../common/SelectBox";
import * as Yup from "yup";
import BaseDialog from "../common/BaseDialog";
import { useGlobalStyles } from "../../theme/GlobalStyle";
import { UserHm } from "src/afi-manager-base-model/model/UserHm";

type Props = {
    isDisplay: boolean;
    item: UserHm;
    onEdit: (item: UserHm) => void;
    onCancel: () => void;
};
const validate = Yup.object({
    lastName: Yup.string()
        .max(100, "Value must be less than 100 characters")
        .required("Can't be left blank !!")
        .trim()
        .nullable(),
    address: Yup.string()
        .max(100, "Value must be less than 100 characters")
        .required("Can't be left blank !!")
        .trim()
        .nullable(),
    firstName: Yup.string()
        .max(100, "Value must be less than 100 characters")
        .required("Can't be left blank !!")
        .trim()
        .nullable(),
    emailCheckout: Yup.string()
        .max(100, "Value must be less than 100 characters")
        .required("Can't be left blank !!")
        .trim()
        .nullable(),
    password: Yup.string()
        .max(100, "Value must be less than 100 characters")
        .required("Can't be left blank !!")
        .trim()
        .nullable(),
    phone: Yup.string()
        .max(100, "Value must be less than 100 characters")
        .required("Can't be left blank !!")
        .trim()
        .nullable(),
    postcode: Yup.string()
        .max(100, "Value must be less than 100 characters")
        .required("Can't be left blank !!")
        .trim()
        .nullable(),
    town: Yup.string()
        .max(100, "Value must be less than 100 characters")
        .required("Can't be left blank !!")
        .trim()
        .nullable(),
    username: Yup.string()
        .max(100, "Value must be less than 100 characters")
        .required("Can't be left blank !!")
        .trim()
        .nullable(),
});

export default function PopupInsertUser(props: Props) {
    const formik = useFormik<UserHm>({
        initialValues: {} as UserHm,
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
            console.log(props.item);
            formik.setValues(
                _.cloneDeep({
                    ...props.item,
                    isDone: props.item.isDone || false,
                })
            );
            formik.setTouched(_.mapValues(new UserHm(), () => false));
        }
    }, [props]);
    console.log(formik.errors);

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
                    </Grid>
                    <Grid>
                        <TextField
                            value={formik.values.username}
                            helperText={
                                formik.touched.username &&
                                formik.errors.username
                            }
                            name="username"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="User name"
                        ></TextField>
                    </Grid>
                    <Grid>
                        <TextField
                            value={formik.values.password}
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
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
                            helperText={
                                formik.touched.firstName &&
                                formik.errors.firstName
                            }
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
                            helperText={
                                formik.touched.lastName &&
                                formik.errors.lastName
                            }
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
                            helperText={
                                formik.touched.phone && formik.errors.phone
                            }
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
                            helperText={
                                formik.touched.address && formik.errors.address
                            }
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
                            helperText={
                                formik.touched.address2 &&
                                formik.errors.address2
                            }
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
                            helperText={
                                formik.touched.town && formik.errors.town
                            }
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
                            helperText={
                                formik.touched.postcode &&
                                formik.errors.postcode
                            }
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
                            helperText={
                                formik.touched.emailCheckout &&
                                formik.errors.emailCheckout
                            }
                            disabled = {formik.values.isDone}
                            name="emailCheckout"
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="emailCheckout (not @gmail.com)"
                        ></TextField>
                    </Grid>

                    <Grid>
                        <TextField
                            value={formik.values.note}
                            helperText={
                                formik.touched.note && formik.errors.note
                            }
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
