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
import { TrackingHMHelper } from "src/helper/TrackingHMHelper";
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
        .min(11, "ID của HM có trên 11 kí tự")
        .trim()
        .nullable(),
});

const useStyle = makeStyles((theme) => ({
    containerDetail: {
        background: "#fff",
        position: "relative",
        border: `1px solid ${theme.palette.grey[400]}`,
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        boxShadow: "none",
    },
    iconDelete: {
        color: theme.palette.error.main,
        margin: 0,
        padding: 4,
    },
    iconEdit: {
        color: theme.palette.primary.main,
        margin: 0,
        padding: 4,
    },
}));
export default function PopupEditProgressAutoOrder(props: Props) {
    const classes = useStyle();
    const globalsStyle = useGlobalStyles();
    const formik = useFormik<OrderTracking>({
        initialValues: {},
        validationSchema: validate,
        onSubmit: () => {
            // .filter((item) => Boolean(item))
            props.onEdit({
                ...formik.values,
                productLink: formik.values?.productLink?.filter((item) =>
                    Boolean(item)
                ),
            });
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
                    status: props.item.status || EStatusOrderTracking.FLOWING,
                })
            );
            formik.setTouched(_.mapValues(new OrderTracking(), () => false));
        }
    }, [props]);

    useEffect(() => {
        getDataOrderTracking(formik.values.orderId || "", formik.values);
    }, [formik.values.orderId]);

    const getDataOrderTracking = useCallback(
        _.debounce((id: string, values) => {
            return hMController
                .getTrackingByOrderNo({
                    orderNo: id,
                })
                .then((res) => {
                    const firstData = res.body && res.body[0];
                    formik.setValues({
                        ...values,
                        infoHM: res,
                        orderId: values.orderId,
                        trackingId: res?.header?.tracking_number,
                        lastTimeTracking: new Date(
                            firstData?.timestamp || new Date()
                        ),
                        status:
                            res.header?.last_delivery_status.code == "Delivered"
                                ? EStatusOrderTracking.COMPLETED
                                : EStatusOrderTracking.FLOWING,
                    });
                })
                .catch((err) => {
                    formik.setValues({
                        ...values,
                        infoHM: undefined as any,
                        orderId: values.orderId,
                        trackingId: undefined as any,
                    });
                });
        }, 400),
        []
    );

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
                            value={formik.values.errorDesc}
                            helperText={
                                formik.touched.errorDesc &&
                                formik.errors.errorDesc
                            }
                            name="errorDesc"
                            onChange={(e) => {
                                if (e.target.value) {
                                    formik.setValues({
                                        ...formik.values,
                                        errorDesc: e.target.value,
                                    });
                                } else {
                                    formik.setValues({
                                        ...formik.values,
                                        errorDesc: null as any,
                                    });
                                }
                            }}
                            onBlur={formik.handleBlur}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb2)}
                            label="Mô tả lỗi"
                        ></TextField>
                    </Grid>

                    {formik.values.isOrder && (
                        <Grid container>
                            <Grid>
                                <TextField
                                    value={formik.values.orderId}
                                    helperText={
                                        formik.touched.orderId &&
                                        formik.errors.orderId
                                    }
                                    name="orderId"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    className={clsx(
                                        globalStyles.mt1,
                                        globalStyles.mb2
                                    )}
                                    label="OrderID"
                                    rows={4}
                                ></TextField>
                            </Grid>
                            {!formik.values.infoHM ? (
                                <Grid
                                    container
                                    justify="center"
                                    className={clsx(globalsStyle.pp1)}
                                >
                                    <Grid container justify="center">
                                        <BiErrorCircle
                                            style={{
                                                fontSize: "6rem",
                                                color: theme.palette.error.main,
                                                fontWeight: 200,
                                            }}
                                        />
                                    </Grid>
                                    <Grid container justify="center">
                                        <Typography
                                            variant="h4"
                                            align="center"
                                            // color="textPrimary"
                                        >
                                            {"Order Error"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Accordion className={classes.containerDetail}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Grid container>
                                            <Grid
                                                container
                                                justify="space-between"
                                                alignItems="center"
                                            >
                                                <Typography variant="body2">
                                                    {"#" +
                                                        formik.values.orderId}
                                                </Typography>
                                            </Grid>
                                            {/* <Divider className={clsx(globalsStyle.mt1, globalsStyle.mb1)} /> */}
                                            <Grid container>
                                                <PrettoSlider
                                                    value={TrackingHMHelper.getOrderProcess(
                                                        formik.values.infoHM
                                                            ?.header
                                                            ?.last_delivery_status
                                                            .code || ""
                                                    )}
                                                />
                                                <Grid
                                                    container
                                                    justify="space-between"
                                                >
                                                    <Typography variant="subtitle1">
                                                        In Warehouse
                                                    </Typography>
                                                    <Typography color="secondary">
                                                        {
                                                            formik.values.infoHM
                                                                ?.header
                                                                ?.last_delivery_status
                                                                .status
                                                        }
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                container
                                                direction="column"
                                                justify="space-around"
                                            >
                                                <Grid>
                                                    <Typography>
                                                        {
                                                            formik.values.infoHM
                                                                ?.header
                                                                ?.tracking_number
                                                        }
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container>
                                            {formik.values?.infoHM?.body?.map(
                                                (item) => (
                                                    <Grid
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <Divider
                                                            className={clsx(
                                                                globalsStyle.mt1,
                                                                globalsStyle.mb1
                                                            )}
                                                        />
                                                        <Grid>
                                                            <Typography>
                                                                {moment(
                                                                    item.timestamp
                                                                ).format(
                                                                    "DD/MM/YYYY, hh:mm"
                                                                )}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid>
                                                            <Typography variant="body2">
                                                                {
                                                                    item.status_text
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                        <Grid>
                                                            <Typography>
                                                                {
                                                                    item.status_details
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            )}
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                        </Grid>
                    )}
                    <Grid></Grid>
                </Grid>
            </BaseDialog>
        </Grid>
    );
}
