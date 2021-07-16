import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useGlobalStyles } from "../../theme/GlobalStyle";
import { IoClose } from "react-icons/io5";
import { IconButton } from "@material-ui/core";
import { UserHm } from "src/afi-manager-base-model/model/UserHm";
import TextDesc from "../common/TextDesc";

type Props = {
    item: UserHm;
    onEdit: (item: UserHm) => void;
    onDelete: (item: UserHm) => void;
    onSeeDetail: (item: UserHm) => void;
    onMergeUser: (item: UserHm) => void;
};
const useStyle = makeStyles((theme) => ({
    root: {
        // width: 300,
        borderRadius: theme.spacing(1),
        border: `1px solid ${theme.palette.divider}`,
    },
    nameUserHm: {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        padding: theme.spacing(2),
        position: "relative",
    },
    frInfo: {
        padding: theme.spacing(2),
    },
    frIconClose: {
        position: "absolute",
        top: 1,
        right: theme.spacing(2),
        fontSize: "1.2rem",
        color: theme.palette.error.main,
    },
    iconClose: {
        color: theme.palette.error.main,
    },
}));
function UserHmItemList(props: Props) {
    const classes = useStyle();
    const [state, setState] = useState();
    const globalStyle = useGlobalStyles();
    useEffect(() => {
        return () => {};
    }, []);

    return (
        <Grid container justify="center" className={clsx(classes.root)}>
            <Grid
                container
                justify="center"
                className={clsx(classes.nameUserHm)}
            >
                <Typography variant="body2">{props.item.username}</Typography>
                <Grid className={classes.frIconClose}>
                    <IconButton
                        className={classes.iconClose}
                        onClick={() => props.onDelete(props.item)}
                    >
                        <IoClose />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container className={clsx(classes.frInfo)}>
                <TextDesc
                    title={"firstName"}
                    desc={props.item.firstName || ""}
                />
                <TextDesc title={"lastName"} desc={props.item.lastName || ""} />
                <TextDesc title={"address"} desc={props.item.address || ""} />
                <TextDesc title={"phone"} desc={props.item.phone || ""} />
                <TextDesc title={"username"} desc={props.item.username || ""} />
                <TextDesc title={"password"} desc={props.item.password || ""} />
                <TextDesc title={"postcode"} desc={props.item.postcode || ""} />
                <TextDesc title={"town"} desc={props.item.town || ""} />
                <TextDesc title={"Note"} desc={props.item.note || ""} />
            </Grid>
            <Grid
                container
                justify="space-between"
                className={clsx(globalStyle.pp2)}
            >
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => props.onEdit(props.item)}
                >
                    Edit
                </Button>

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => props.onMergeUser(props.item)}
                >
                    Merge user
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.onSeeDetail(props.item)}
                >
                    See Detail
                </Button>
            </Grid>
        </Grid>
    );
}

export default React.memo(UserHmItemList);
