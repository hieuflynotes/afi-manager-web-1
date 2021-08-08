/* eslint-disable jsx-a11y/alt-text */
import { Typography, Grid } from '@material-ui/core';
import React from 'react';
import theme from '../../theme/MuiTheme';

export default function SystemMaintenance() {
    return (
        <Grid
            container
            justify="center"
            style={{
                background: 'white',
                position: 'relative',
                padding: theme.spacing(10),
            }}
            direction="column"
        >
            <Grid container justify="center">
                <img
                    style={{
                        width: '100%',
                        maxWidth: 500,
                    }}
                    src="/image/not-result.gif"
                />
            </Grid>
            <Typography align="center" variant="h3" color="primary">
                Hệ thống đang bảo trì
                <br />
            </Typography>
            <Typography align="center" variant="h5" color="primary">
                Bạn quay lại sau nhé !!!
                <br />
            </Typography>
        </Grid>
    );
}
