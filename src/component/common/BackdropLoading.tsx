import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Backdrop, CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../rematch/store';

type Props = {};
const useStyle = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 100000000,
        color: 'rgb(0,0,0,0.01)',
    },
    frImage: {
        borderRadius: '50%',
        // background: 'white',
        width: 400,
        height: 400,
    },
}));
function BackdropLoading(props: Props) {
    const classes = useStyle();
    const [state, setState] = useState();
    const dispath = useDispatch<Dispatch>();
    const loading = useSelector((state: RootState) => state.loading);
    useEffect(() => {
        return () => {};
    }, []);

    return (
        <Grid>
            <Backdrop open={loading} className={classes.backdrop}>
                <Grid className={classes.frImage}>
                    <img src="/image/loading-fast.gif" className={classes.frImage} />
                </Grid>
                {/* <CircularProgress color="primary" /> */}
            </Backdrop>
        </Grid>
    );
}

export default React.memo(BackdropLoading);
