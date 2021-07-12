/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import {
    Button,
    Divider,
    Grid,
    IconButton,
    makeStyles,
    Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useGlobalStyles } from "src/theme/GlobalStyle";
import PrettoSlider from "../common/PrettoSlider";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import {
    EStatusOrderTracking,
    OrderTracking,
} from "../../afi-manager-base-model/model/OrderTracking";
import { hMController } from "src/controller";
import moment from "moment";
import { BiErrorCircle } from "react-icons/bi";
import theme from "src/theme/MuiTheme";
import { CircularProgress } from "@material-ui/core";
import { TrackingHMHelper } from "src/helper/TrackingHMHelper";
import { StringUtil } from "src/helper/StringUtil";
import { HMTracking } from "src/afi-manager-base-model/model/HMTracking";
import CheckTrackingHM from "src/container/CheckTrackingHM";

const useStyle = makeStyles((theme) => ({
    root: {
        minWidth: 300,
        minHeight: 260,
        background: "#fff",
        position: "relative",
        border: `1px solid ${theme.palette.grey[200]}`,
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
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
    iconStatus: {
        background: theme.palette.success.main,
        height: 15,
        width: 15,
        // padding: 10,
        borderRadius: "50%",
        margin: 0,
    },
}));
type Props = {
    onDelete: (item: OrderTracking) => void;
    item: OrderTracking;
    onEdit: (item: OrderTracking) => void;
    searchString: string;
    index: number;
};
export default function TrackingInfoHMItem(props: Props) {
    const classes = useStyle();
    const [state, setState] = useState<{
        infoOrderTracking: OrderTracking;
        isGet: boolean;
        isError: boolean;
    }>({
        infoOrderTracking: {},
        isGet: false,
        isError: false,
    });
    const globalsStyle = useGlobalStyles();

    const updateInfoProduct = async (item: HMTracking) => {
        if (
            props.item.productLink &&
            props.item.productLink?.length > 0 &&
            !props.item.productInfo
        ) {
            let info;
            for (const link of props.item.productLink) {
                try {
                    const id = link.split("productpage.")[1].split(".html")[0];
                    info = await hMController.getInfoProduct(id);
                } catch (error) {
                    info = undefined;
                }
                if (info) {
                    props.item.productInfo = props.item.productInfo || [];
                    props.item.productInfo?.push(info);
                }
            }
            // orderTrackingController.save(props.item);
            setState({
                infoOrderTracking: {
                    ...props.item,
                    infoHM: item,
                    trackingId: item.header?.tracking_number,
                },
                isError: false,
                isGet: true,
            });
        } else {
            setState({
                infoOrderTracking: {
                    ...props.item,
                    infoHM: item,
                    trackingId: item.header?.tracking_number,
                },
                isError: false,
                isGet: true,
            });
        }
    };

    const updateValue = () => {
        hMController
            .getTrackingByOrderNo({
                orderNo: props.item.orderId || "",
            })
            .then((res) => {
                updateInfoProduct(res);
            })
            .catch((err) => {
                setState({
                    infoOrderTracking: props.item,
                    isError: true,
                    isGet: true,
                });
            });
    };
    useEffect(() => {
        setState({
            infoOrderTracking: {},
            isError: false,
            isGet: false,
        });
        setTimeout(updateValue, props.index * 200);
    }, [props.item]);
    const main = () => {
        return (
            <Grid container>
                <Grid container justify="space-between" alignItems="center">
                    <div
                        className={classes.iconStatus}
                        style={{
                            background:
                                state.infoOrderTracking.status ==
                                EStatusOrderTracking.COMPLETED
                                    ? theme.palette.success.main
                                    : theme.palette.grey[500],
                        }}
                    ></div>
                    <Typography variant="body2">
                        #
                        {StringUtil.getHighlightedText(
                            state.infoOrderTracking.orderId,
                            props.searchString
                        )}
                    </Typography>
                    <Grid>
                        <Grid container>
                            <IconButton
                                onClick={() =>
                                    props.onEdit(state.infoOrderTracking)
                                }
                                className={classes.iconEdit}
                            >
                                <AiOutlineEdit />
                            </IconButton>
                            <IconButton
                                className={classes.iconDelete}
                                onClick={() =>
                                    props.onDelete(state.infoOrderTracking)
                                }
                            >
                                <IoCloseOutline />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider className={clsx(globalsStyle.mt1, globalsStyle.mb1)} />
                {state.isError ? (
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
                    <>
                        <Grid container>
                            <PrettoSlider
                                value={TrackingHMHelper.getOrderProcess(
                                    state.infoOrderTracking.infoHM?.header
                                        ?.last_delivery_status.code || ""
                                )}
                            />
                            <Grid container justify="space-between">
                                <Typography variant="subtitle1">
                                    In Warehouse
                                </Typography>
                                <Typography color="secondary">
                                    {
                                        state.infoOrderTracking.infoHM?.header
                                            ?.last_delivery_status.status
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider
                            className={clsx(globalsStyle.mt1, globalsStyle.mb1)}
                        />
                        <Grid
                            container
                            direction="column"
                            justify="space-around"
                        >
                            {state.infoOrderTracking?.infoHM?.body?.map(
                                (item, index) => {
                                    if (index == 0) {
                                        return (
                                            <Grid style={{ width: "100%" }}>
                                                <Grid>
                                                    <Typography variant="caption">
                                                        {moment(
                                                            item.timestamp
                                                        ).format(
                                                            "DD/MM/YYYY, hh:mm"
                                                        )}
                                                    </Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography variant="body2">
                                                        {item.status_text}
                                                    </Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography>
                                                        {item.status_details}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        );
                                    }
                                }
                            )}
                        </Grid>
                        <Divider
                            className={clsx(globalsStyle.mt1, globalsStyle.mb1)}
                        />
                        <Grid
                            container
                            direction="column"
                            style={{
                                borderTop: `1px solid ${theme.palette.divider}`,
                            }}
                            justify="space-around"
                        >
                            <Grid>
                                <Typography variant="body2">
                                    {StringUtil.getHighlightedText(
                                        state.infoOrderTracking.trackingId,
                                        props.searchString
                                    )}
                                </Typography>
                                <Typography>
                                    {StringUtil.getHighlightedText(
                                        state.infoOrderTracking.customerName,
                                        props.searchString
                                    )}
                                </Typography>
                                <Typography>
                                    {StringUtil.getHighlightedText(
                                        state.infoOrderTracking.email,
                                        props.searchString
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider
                            className={clsx(globalsStyle.mt1, globalsStyle.mb1)}
                        />
                        {state.infoOrderTracking.productInfo?.map((info) => (
                            <Grid
                                style={{
                                    borderTop: `1px solid ${theme.palette.divider}`,
                                    padding: theme.spacing(2),
                                }}
                                container
                                alignItems="center"
                                alignContent="center"
                                justify="space-around"
                            >
                                <Grid>
                                    <img
                                        style={{
                                            width: 50,
                                        }}
                                        src={
                                            info._embedded.base_image.images
                                                .normal
                                        }
                                    />
                                </Grid>
                                <Grid>
                                    <Typography variant="body2">
                                        {info.name}
                                    </Typography>
                                    <Typography>
                                        <a
                                            href={info.product_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                color: theme.palette.secondary
                                                    .main,
                                            }}
                                        >
                                            See detail
                                        </a>
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))}
                        <Grid
                            container
                            justify="center"
                            style={{
                                borderTop: `1px solid ${theme.palette.divider}`,
                                padding: theme.spacing(2),
                            }}
                        >
                            <Typography>
                                <a
                                    style={{
                                        color: theme.palette.secondary.main,
                                    }}
                                    href={`https://hm.delivery-status.com/gb/en/?orderNo=${state.infoOrderTracking.orderId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    See Tracking
                                </a>
                            </Typography>
                        </Grid>
                    </>
                )}
            </Grid>
        );
    };
    return (
        <Grid>
            <Grid className={clsx(classes.root)} container>
                {state.isGet ? (
                    main()
                ) : (
                    <Grid container justify="center" alignContent="center">
                        <CircularProgress />
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}
