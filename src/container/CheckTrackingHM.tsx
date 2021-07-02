import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Grid, makeStyles, Zoom, Typography } from "@material-ui/core";
import ListGrid from "src/component/common/ListGrid";
import TrackingInfoHMItem from "src/component/tracking/TrackingInfoHMItem";
import { useGlobalStyles } from "src/theme/GlobalStyle";
import TextFiled from "src/component/common/TextFiled";
import Button from "src/component/common/Button";
import { useCrudHook } from "src/hook/useCrudHook";
import { userController } from "src/controller";
import PopUpConfirm from "src/component/common/PopupConfirm";
import PopupFlowTrackingHM from "src/component/tracking/PopupFlowTrackingHM";

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
    const crudTrackingHM = useCrudHook({
        controller: userController,
    });
    const globalStyles = useGlobalStyles();
    const [state, setState] = useState();
    useEffect(() => {
        return () => {};
    }, []);

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
            <Typography variant="h4">Order Tracking H&M</Typography>
            <Grid className={classes.frFilter}>
                <Grid
                    container
                    justify="space-between"
                    className={clsx(globalStyles.pt1, globalStyles.pb1)}
                >
                    <TextFiled variant="outlined" label="Search"></TextFiled>
                    <Button variant="contained" color="primary">
                        New Flow
                    </Button>
                </Grid>
            </Grid>
            <ListGrid minWidthItem={"300px"} gridGap={15}>
                {new Array(20).fill(2)?.map((item, index) => (
                    <Zoom in={true} timeout={index * 100}>
                        <Grid container justify="center">
                            <TrackingInfoHMItem
                                onDelete={crudTrackingHM.onConfirm}
                                item={{}}
                            />
                        </Grid>
                    </Zoom>
                ))}
            </ListGrid>
        </Grid>
    );
}

export default React.memo(CheckTrackingHM);
