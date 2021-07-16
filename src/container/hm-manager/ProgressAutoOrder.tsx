import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import TextField from "../../component/common/TextFiled";
import Button from "../../component/common/Button";
import ListGrid from "../../component/common/ListGrid";
import { useGlobalStyles } from "../../theme/GlobalStyle";
import { useCrudHook } from "../../hook/useCrudHook";
import { Pagination } from "@material-ui/lab";
import PopUpConfirm from "../../component/common/PopupConfirm";
import { useHistory, useParams } from "react-router-dom";
import { UserHm } from "src/afi-manager-base-model/model/UserHm";
import { orderTrackingController, userHmController } from "src/controller";
import UserHmItemList from "src/component/AutoOrderHm/UserHmItemList";
import PopupInsertUser from "src/component/AutoOrderHm/PopupInsertUser";
import theme from "src/theme/MuiTheme";
import { OrderTracking } from "src/afi-manager-base-model/model/OrderTracking";
import ProgressHmItemList from "src/component/AutoOrderHm/ProgressHmItemList";
import PopupAddOrderId from "src/component/AutoOrderHm/PopupEditProgressAutoOrder";
import { ListFilter } from "luong-base-model/lib";

type Props = {};
const useStyle = makeStyles((theme) => ({
    statuses: {
        "& p": {
            padding: 10,
        },
    },
}));
function ProgressAutoOrder(props: Props) {
    const { userHmId } = useParams<{ userHmId: string }>();
    const history = useHistory();

    const crudTrackingHM = useCrudHook<
        OrderTracking,
        ListFilter<OrderTracking>
    >({
        controller: orderTrackingController,
        listController: orderTrackingController.listForProgress,
        initQuery: {
            searchFields: ["orderId", "trackingId", "customerName", "email"],
            sort: ["totalPrice"],
            pageSize: 100,
            filter: {
                userHMId: userHmId,
            },
        },
    });
    const classes = useStyle();
    const globalStyle = useGlobalStyles();
    const [state, setState] = useState();
    useEffect(() => {
        return () => {};
    }, []);

    return (crudTrackingHM.pagingList?.rows?.length || 0) > 0 ? (
        <Grid
            container
            style={{
                minHeight: "100vh",
                background: "white",
                padding: theme.spacing(2),
            }}
        >
            <PopupAddOrderId
                isDisplay={crudTrackingHM.isShowPopup}
                item={crudTrackingHM.itemSelected}
                onCancel={crudTrackingHM.onCancelPopup}
                onEdit={crudTrackingHM.onSave}
            />
            <Grid container justify="center" className={clsx(globalStyle.pp2)}>
                <Grid md={10}>
                    <Grid container justify="center">
                        <Typography align="center" variant="h4">
                            Check order
                        </Typography>
                        <Grid
                            container
                            className={classes.statuses}
                            justify="center"
                        >
                            <Typography>
                                Total account:{" "}
                                {crudTrackingHM.pagingList?.rows?.length}
                            </Typography>
                            <Typography>
                                Created account:{" "}
                                {
                                    crudTrackingHM.pagingList?.rows?.filter(
                                        (i) => i.isRegister
                                    ).length
                                }
                            </Typography>
                            <Typography>
                                Added to cart:{" "}
                                {
                                    crudTrackingHM.pagingList?.rows?.filter(
                                        (i) => i.isOrder
                                    ).length
                                }
                            </Typography>
                            <Typography>
                                Done:{" "}
                                {
                                    crudTrackingHM.pagingList?.rows?.filter(
                                        (i) => i.errorDesc
                                    ).length
                                }
                            </Typography>
                            <Typography>
                                Error:{" "}
                                {
                                    crudTrackingHM.pagingList?.rows?.filter(
                                        (i) => i.errorDesc
                                    ).length
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        // justify="center"
                        className={clsx(globalStyle.pt2, globalStyle.pb2)}
                    >
                        <ListGrid minWidthItem={"420px"} gridGap={20}>
                            {crudTrackingHM.pagingList?.rows?.map((item) => (
                                <Grid>
                                    <ProgressHmItemList
                                        item={item}
                                        updateOrderId={
                                            crudTrackingHM.onShowPopup
                                        }
                                    />
                                </Grid>
                            ))}
                        </ListGrid>
                    </Grid>
                    <Grid
                        container
                        className={clsx(globalStyle.pt2, globalStyle.pb2)}
                    >
                        <Pagination
                            count={crudTrackingHM.pagingList.totalPages || 1}
                            page={crudTrackingHM.pagingList.page || 1}
                            onChange={(e, page) => {
                                crudTrackingHM.setQuery({
                                    ...crudTrackingHM.query,
                                    page: page,
                                });
                            }}
                            color="primary"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ) : (
        <Grid container justify="center">
            <Typography variant="h2">
                Tài khoản này chưa tiến hành lấy order hoặc order bị trống
            </Typography>
        </Grid>
    );
}

export default React.memo(ProgressAutoOrder);
