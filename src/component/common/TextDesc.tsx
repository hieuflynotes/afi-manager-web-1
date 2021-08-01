import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import theme from '../../theme/MuiTheme';

type Props = {
    title: string;
    desc: string;
    pp?: number;
};
const useStyle = makeStyles((theme) => ({}));
function TextDesc(props: Props) {
    const classes = useStyle();
    const [state, setState] = useState();
    useEffect(() => {
        return () => {};
    }, []);

    return (
        <Grid
            container
            style={{
                padding: theme.spacing(props.pp || 1),
            }}
            justify="space-between"
        >
            <Grid>
                <Typography
                    style={{
                        color: 'rgba(0, 0, 0, 0.54)',
                        fontWeight: 400,
                    }}
                    variant="subtitle1"
                >
                    {props.title}
                </Typography>
            </Grid>
            <Grid>
                <Typography>{props.desc}</Typography>
            </Grid>
        </Grid>
    );
}

export default React.memo(TextDesc);
