import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Grid, makeStyles, Zoom, Typography, Divider } from "@material-ui/core";
import ListGrid from "src/component/common/ListGrid";
import TrackingInfoHMItem from "src/component/tracking/TrackingInfoHMItem";
import { useGlobalStyles } from "src/theme/GlobalStyle";
import TextFiled from "src/component/common/TextFiled";
import Button from "src/component/common/Button";
import { useCrudHook } from "src/hook/useCrudHook";
import {
    hMController,
    orderTrackingController,
    userController,
} from "src/controller";
import PopUpConfirm from "src/component/common/PopupConfirm";
import PopupFlowTrackingHM from "src/component/tracking/PopupFlowTrackingHM";
import { Pagination } from "@material-ui/lab";
import {
    EStatusOrderTracking,
    OrderTracking,
} from "../afi-manager-base-model/model/OrderTracking";
import { ListFilter } from "luong-base-model/lib";
import SelectBox from "src/component/common/SelectBox";
import PopupFlowManyTrackingHM from "src/component/tracking/PopupFlowManyTrackingHM";
import PopupFlowManyByOrdersEmailsCustomersTrackingHM from "src/component/tracking/PopupFlowManyByOrdersEmailsCustomersTrackingHM";

import { handleWithPopupHook } from "src/hook/HandleWithPopupHook";
import { OrderTrackingController } from "src/controller/OrderTrackingController";
import { PropsCreateManyFlow } from "src/afi-manager-base-model/controllers/IOrderTrackingController";
import { useSelector } from "react-redux";
import { RootState } from "src/rematch/store";

type Props = {};
const useStyle = makeStyles((theme) => ({
    frFilter: {
        background: "white",
        borderRadius: theme.spacing(3),
        padding: theme.spacing(3),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
}));
function CheckTrackingHM(props: Props) {
    const classes = useStyle();
    const handleWithPopupMany = handleWithPopupHook<PropsCreateManyFlow>({
        onConfirmByPopup: (item) => {
            if (item)
                orderTrackingController
                    .createManyFlow({
                        ...item,
                    })
                    .then((res) => {
                        crudTrackingHM.onRefreshList();
                    });
        },
    });
    const handleWithPopupManyByEmails =
        handleWithPopupHook<PropsCreateManyFlow>({
            onConfirmByPopup: (item) => {
                if (item)
                    orderTrackingController
                        .createManyByEmailsAndOrders({
                            ...item,
                        })
                        .then((res) => {
                            crudTrackingHM.onRefreshList();
                        });
            },
        });
    const crudTrackingHM = useCrudHook<
        OrderTracking,
        ListFilter<OrderTracking>
    >({
        controller: orderTrackingController,
        initQuery: {
            searchFields: ["orderId", "trackingId", "customerName", "email"],
            pageSize: 100,
        },
    });
    const globalStyles = useGlobalStyles();
    const [state, setState] = useState();
    useEffect(() => {
        return () => {};
    }, []);

    const syncSort = () => {
        orderTrackingController.syncSortTracking({}).then((res) => {
            crudTrackingHM.onRefreshList();
        });
    };
    const authen = useSelector((state: RootState) => state.authen);

    return (
        <Grid className={globalStyles.pp3}>
            <PopUpConfirm
                isDisplay={crudTrackingHM.isShowConfirm}
                onCancel={crudTrackingHM.onCancelConfirm}
                onConfirm={() =>
                    crudTrackingHM.onDelete(crudTrackingHM.itemSelected)
                }
            />
            <PopupFlowTrackingHM
                isDisplay={crudTrackingHM.isShowPopup}
                item={crudTrackingHM.itemSelected}
                onCancel={crudTrackingHM.onCancelPopup}
                onEdit={crudTrackingHM.onSave}
            />
            <PopupFlowManyTrackingHM
                isDisplay={handleWithPopupMany.isDisplayPopup}
                onCancel={handleWithPopupMany.handleClosePopup}
                onEdit={handleWithPopupMany.handleConfirmByPopup}
            />
            <PopupFlowManyByOrdersEmailsCustomersTrackingHM
                isDisplay={handleWithPopupManyByEmails.isDisplayPopup}
                onCancel={handleWithPopupManyByEmails.handleClosePopup}
                onEdit={handleWithPopupManyByEmails.handleConfirmByPopup}
            />

            <Typography variant="h4" align="center">
                Order Tracking H&M
            </Typography>
            <Typography variant="subtitle1" align="center">
                ({authen.info.fullName})
            </Typography>
            <Grid className={classes.frFilter}>
                <Grid
                    container
                    justify="space-between"
                    className={clsx(globalStyles.pt1, globalStyles.pb1)}
                >
                    <TextFiled
                        variant="outlined"
                        label="Search"
                        onChange={(e) =>
                            crudTrackingHM.onQueryChanged(e.target.value)
                        }
                    ></TextFiled>
                    <Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => crudTrackingHM.onShowPopup({})}
                        >
                            New Flow
                        </Button>
                    </Grid>
                </Grid>
                {/* <Divider className={clsx(globalStyles.mt1, globalStyles.mb1)} /> */}
                <Grid
                    container
                    justify="space-between"
                    className={clsx(globalStyles.pt1, globalStyles.pb1)}
                    alignItems="center"
                >
                    <Pagination
                        count={crudTrackingHM.pagingList.totalPages}
                        onChange={(e, page) => {
                            crudTrackingHM.setQuery({
                                ...crudTrackingHM.query,
                                page: page,
                            });
                        }}
                        color="primary"
                    />
                    <Grid>
                        <Grid container alignItems="center">
                            <Button
                                className={clsx(
                                    globalStyles.ml2,
                                    globalStyles.mr2
                                )}
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    handleWithPopupManyByEmails.handleShowPopup(
                                        {} as any
                                    );
                                }}
                            >
                                Flow many by Emails and Orders
                            </Button>
                            <SelectBox
                                variant="outlined"
                                data={[
                                    "All",
                                    ...Object.values(EStatusOrderTracking),
                                ]}
                                labelOption={(label) => label}
                                valueOption={(value) => value}
                                onChange={(value: any) => {
                                    crudTrackingHM.setFilter({
                                        status:
                                            value == "All" ? undefined : value,
                                    });
                                }}
                                label={"Status"}
                                value={
                                    crudTrackingHM.query.filter?.status || "All"
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <ListGrid minWidthItem={"300px"} gridGap={15}>
                {crudTrackingHM.pagingList.rows?.map((item, index) => (
                    <Zoom in={true} timeout={index * 100}>
                        <Grid container justify="center">
                            <TrackingInfoHMItem
                                index={index}
                                onDelete={crudTrackingHM.onConfirm}
                                item={item}
                                searchString={crudTrackingHM.query.search || ""}
                                onEdit={crudTrackingHM.onShowPopup}
                            />
                        </Grid>
                    </Zoom>
                ))}
            </ListGrid>
        </Grid>
    );
}

export default React.memo(CheckTrackingHM);
