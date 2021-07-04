/* eslint-disable react-hooks/exhaustive-deps */
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Grid,
    makeStyles,
    TextField,
    Switch,
    Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useCallback, useEffect } from "react";
import { hMController } from "src/controller";
import { useGlobalStyles } from "src/theme/GlobalStyle";
import * as Yup from "yup";
import {
    OrderTracking,
    EStatusOrderTracking,
} from "../../afi-manager-base-model/model/OrderTracking";
import BaseDialog from "../common/BaseDialog";
import PrettoSlider from "../common/PrettoSlider";
import moment from "moment";
import { BiErrorCircle } from "react-icons/bi";
import theme from "src/theme/MuiTheme";
const CKEditor = require("ckeditor4-react");

type Props = {
    isDisplay: boolean;
    onEdit: (item: { orderId: string[] }) => void;
    onCancel: () => void;
};
const validate = Yup.object({
    orderId: Yup.string()
        .min(11, "ID của HM có trên 11 kí tự")
        .required("Is require !!")
        .trim()
        .nullable(),
});

const useStyle = makeStyles((theme) => ({}));
export default function PopupFlowManyTrackingHM(props: Props) {
    const classes = useStyle();
    const globalsStyle = useGlobalStyles();
    const formik = useFormik<{ orderId: string }>({
        initialValues: {
            orderId: "",
        },
        validationSchema: validate,
        onSubmit: () => {
            const values = formik.values.orderId;
            props.onEdit({
                orderId: values.split("\n"),
            });
        },
    });
    const onSubmit = () => {
        formik.handleSubmit();
        formik.setTouched({
            orderId: true,
        });
    };

    useEffect(() => {
        formik.setTouched({});
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
                            helperText={
                                formik.touched.orderId && formik.errors.orderId
                            }
                            name="orderId"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            fullWidth
                            rows={8}
                            multiline
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="OrderID"
                        ></TextField>
                    </Grid>
                </Grid>
            </BaseDialog>
        </Grid>
    );
}
