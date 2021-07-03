/* eslint-disable react-hooks/exhaustive-deps */
import { OrderTracking } from "../../afi-manager-base-model/model/OrderTracking";
import { Grid, TextField } from "@material-ui/core";
import clsx from "clsx";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useEffect } from "react";
import { useGlobalStyles } from "src/theme/GlobalStyle";
import * as Yup from "yup";
import BaseDialog from "../common/BaseDialog";

const CKEditor = require("ckeditor4-react");

type Props = {
    isDisplay: boolean;
    item: OrderTracking;
    onEdit: (item: OrderTracking) => void;
    onCancel: () => void;
};
const validate = Yup.object({
    orderId: Yup.string()
        .max(100, "Chữ không được quá 100 kí tự")
        .required("Is require !!")
        .trim()
        .nullable(),
});

export default function PopupFlowTrackingHM(props: Props) {
    const formik = useFormik<OrderTracking>({
        initialValues: {},
        validationSchema: validate,
        onSubmit: () => {
            props.onEdit(formik.values);
        },
    });
    const onSubmit = () => {
        formik.handleSubmit();
        formik.setTouched(_.mapValues(new OrderTracking(), () => true));
    };

    useEffect(() => {
        if (props.isDisplay) {
            formik.setValues(
                _.cloneDeep({
                    ...props.item,
                })
            );
            formik.setTouched(_.mapValues(new OrderTracking(), () => false));
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
                title="Edit New Flow"
            >
                <Grid container direction="column" justify="space-around">
                    <Grid>
                        <TextField
                            value={formik.values.orderId}
                            helperText={
                                formik.touched.orderId && formik.errors.orderId
                            }
                            name="orderId"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="OrderID"
                            rows={4}
                        ></TextField>
                    </Grid>
                    <Grid>
                        <TextField
                            value={formik.values.customerName}
                            helperText={
                                formik.touched.customerName &&
                                formik.errors.customerName
                            }
                            name="customerName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Tên khách hàng"
                        ></TextField>
                    </Grid>
                    {/* <Grid>
                        <CKEditor
                            className={clsx(globalStyles.mt2, globalStyles.mb2)}
                            data={formik.values.desc}
                            onChange={(e: any) => {
                                formik.setValues({
                                    ...formik.values,
                                    desc: e.editor.getData(),
                                });
                            }}
                        />
                    </Grid> */}
                </Grid>
            </BaseDialog>
        </Grid>
    );
}
