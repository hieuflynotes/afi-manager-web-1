import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Grid, makeStyles } from "@material-ui/core";

type Props = {};
const useStyle = makeStyles((theme) => ({}));
function CheckTrackingHM(props: Props) {
    const classes = useStyle();
    const [state, setState] = useState();
    useEffect(() => {
        return () => {};
    }, []);

    return <Grid></Grid>;
}

export default React.memo(CheckTrackingHM);
