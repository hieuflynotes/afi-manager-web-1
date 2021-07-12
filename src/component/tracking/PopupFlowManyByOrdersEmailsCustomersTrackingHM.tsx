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
import React, { useCallback, useEffect, useState } from "react";
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
import { PropsCreateManyFlow } from "src/afi-manager-base-model/controllers/IOrderTrackingController";
const CKEditor = require("ckeditor4-react");

type Props = {
    isDisplay: boolean;
    onEdit: (item: PropsCreateManyFlow) => void;
    onCancel: () => void;
};
const validate = Yup.object({});

const useStyle = makeStyles((theme) => ({}));
export default function PopupFlowManyByOrdersEmailsCustomersTrackingHM(
    props: Props
) {
    const classes = useStyle();
    const [state, setState] = useState<{
        error: string;
    }>({
        error: "",
    });
    const globalsStyle = useGlobalStyles();
    const formik = useFormik<PropsCreateManyFlow>({
        initialValues: {
            orderId: "",
            orderIds: [],
            email: "",
            link: "",
            customerName: "",
        },
        validationSchema: validate,
        onSubmit: () => {
            const customerNames = formik.values.customerName.trim().split("\n");
            const orderIds = formik.values.orderId.trim().split("\n");
            const emails = formik.values.email.trim().split("\n");
            const links = formik.values.link.trim().split("\n");

            if (
                !formik.values.orderId ||
                !formik.values.customerName ||
                !formik.values.email
            ) {
                setState({
                    error: ` Can't be left blank orderID and customer name and email,Please  `,
                });
            } else if (
                customerNames.length != orderIds.length ||
                emails.length != orderIds.length
            ) {
                setState({
                    error: `Inconsistent data, Please check again data`,
                });
            } else {
                props.onEdit({
                    ...formik.values,
                    orderIds: orderIds,
                    emails: emails,
                    links: links,
                    customerNames: customerNames,
                });
            }
        },
    });
    const customerNamesCount = !formik.values.customerName
        ? 0
        : formik.values.customerName.trim().split("\n").length;
    const orderIdsCount = !formik.values.orderId
        ? 0
        : formik.values.orderId.trim().split("\n").length;
    const emailsCount = !formik.values.email
        ? 0
        : formik.values.email.trim().split("\n").length;

    const linksCount = !formik.values.link
        ? 0
        : formik.values.link.trim().split("\n").length;
    const onSubmit = () => {
        formik.handleSubmit();
        formik.setTouched({
            orderId: true,
        });
    };

    useEffect(() => {
        if (props.isDisplay) {
            formik.setValues({} as any);
            setState({
                error: "",
            });
        }
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
                    <Grid className={clsx(globalStyles.mt1, globalStyles.mb2)}>
                        <Typography color={"error"}>{state.error}</Typography>
                        <Typography color={"error"}>
                            Order: {orderIdsCount}
                        </Typography>
                        <Typography color={"error"}>
                            Customer name : {customerNamesCount}
                        </Typography>
                        <Typography color={"error"}>
                            Email : {emailsCount}
                        </Typography>
                        <Typography color={"error"}>
                            Link : {linksCount}
                        </Typography>
                    </Grid>
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
                    <Grid>
                        <TextField
                            helperText={
                                formik.touched.customerName &&
                                formik.errors.customerName
                            }
                            name="customerName"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            fullWidth
                            multiline
                            rows={8}
                            value={formik.values.customerName}
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Name customer"
                        ></TextField>
                    </Grid>
                    <Grid>
                        <TextField
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                            value={formik.values.email}
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            fullWidth
                            multiline
                            rows={8}
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Email"
                        ></TextField>
                    </Grid>

                    <Grid>
                        <TextField
                            helperText={
                                formik.touched.link && formik.errors.link
                            }
                            value={formik.values.link}
                            name="link"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            fullWidth
                            multiline
                            rows={8}
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Link"
                        ></TextField>
                    </Grid>
                </Grid>
            </BaseDialog>
        </Grid>
    );
}
