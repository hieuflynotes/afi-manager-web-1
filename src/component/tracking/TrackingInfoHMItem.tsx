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
import { OrderTracking } from "@Core/model/OrderTracking";

const useStyle = makeStyles((theme) => ({
    root: {
        width: 310,
        height: 220,
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
}));
type Props = {
    onDelete: (item: OrderTracking) => void;
    item: OrderTracking;
};
export default function TrackingInfoHMItem(props: Props) {
    const classes = useStyle();
    const globalsStyle = useGlobalStyles();
    useEffect(() => {}, []);
    return (
        <Grid>
            <Grid
                className={clsx(classes.root)}
                container
                direction="column"
                // justify="space-around"
            >
                <Grid container justify="space-between" alignItems="center">
                    <Typography variant="body2">#33840317500</Typography>
                    <Grid>
                        <Grid container>
                            <IconButton className={classes.iconEdit}>
                                <AiOutlineEdit />
                            </IconButton>
                            <IconButton
                                className={classes.iconDelete}
                                onClick={() => props.onDelete(props.item)}
                            >
                                <IoCloseOutline />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Divider className={clsx(globalsStyle.mt1, globalsStyle.mb1)} /> */}
                <Grid container>
                    <PrettoSlider value={70} />
                    <Grid container justify="space-between">
                        <Typography variant="subtitle1">
                            In Warehouse
                        </Typography>
                        <Typography color="secondary">Delivered</Typography>
                    </Grid>
                </Grid>
                <Divider className={clsx(globalsStyle.mt1, globalsStyle.mb1)} />
                <Grid container direction="column" justify="space-around">
                    <Grid>
                        <Typography>In transit</Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="body2">In transit</Typography>
                    </Grid>
                    <Grid>
                        <Typography>The goods are on the way.</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
