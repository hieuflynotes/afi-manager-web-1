import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import theme from '../../theme/MuiTheme';
import { Variant } from '@material-ui/core/styles/createTypography';

type Props = {
    icon: React.ReactElement;
    desc?: string;
    pp?: number;
    color?: 'inherit' | 'initial' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';
    variant?: 'inherit' | Variant;
};
const useStyle = makeStyles((theme) => ({
    icon: {
        paddingRight: theme.spacing(1),
    },
}));
function TextDescWithIcon(props: Props) {
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
            alignItems="center"
            alignContent="center"
        >
            <Grid className={classes.icon}>{props.icon}</Grid>
            <Grid>
                <Typography variant={props.variant} color={props.color}>
                    {props.desc}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default React.memo(TextDescWithIcon);
