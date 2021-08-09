import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import theme from '../../theme/MuiTheme';
import clsx from 'clsx';
import { Dispatch, RootState } from '../../rematch/store';
import { useDispatch, useSelector } from 'react-redux';
import { useGlobalStyles } from '../../theme/GlobalStyle';

const useStyles = makeStyles((theme: Theme) => ({
    digActions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
    },
    buttonAlert: {
        paddingRight: theme.spacing(5),
        paddingLeft: theme.spacing(5),
    },
    title: {},
}));

function PopupNotification() {
    const classes = useStyles();
    const globalStyles = useGlobalStyles();
    const dispatch = useDispatch<Dispatch>();
    const statePopup = useSelector((state: RootState) => state.notificationPopup);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
            dispatch.notificationPopup.close();
        }
    };
    return (
        <Dialog open={statePopup.isDisplay} fullWidth={true} maxWidth={'sm'} onKeyDown={handleKeyDown}>
            <DialogTitle className={clsx(globalStyles.pt2, globalStyles.mm0)}>
                <Grid item xs={12}>
                    {/* <Typography variant="h4" color="error" align="center">
						Cảnh báo
					</Typography> */}
                </Grid>
                <Box
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                    }}
                >
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            dispatch.notificationPopup.close();
                        }}
                        color="inherit"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Grid container direction="column">
                    <Grid item xs={12}>
                        <Grid container justify="center" className={clsx(globalStyles.pp1)}>
                            <BiErrorCircle
                                style={{
                                    fontSize: '6rem',
                                    color: theme.palette.error.main,
                                    fontWeight: 200,
                                }}
                            />
                        </Grid>
                        <Grid container justify="center" className={clsx(globalStyles.pp1)}>
                            <Typography
                                className={classes.title}
                                variant="h4"
                                align="center"
                                // color="textPrimary"
                            >
                                {statePopup.title || 'Bạn ăn cơm chưa ?'}
                            </Typography>
                        </Grid>
                        <Grid container className={clsx(globalStyles.pp1)} justify="center">
                            <Typography
                                className={classes.title}
                                variant="subtitle1"
                                align="center"
                                // color="textPrimary"
                            >
                                {statePopup.message || 'Lo ăn đi nhá, ăn nhiều rồi mập nhá '}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Grid item xs={12} className={classes.digActions}>
                    <Grid item container direction="row" justify="space-evenly" alignItems="center">
                        <Grid xs={6}>
                            <Button
                                variant="contained"
                                className={globalStyles.buttonAlert}
                                size="small"
                                fullWidth
                                // startIcon={<DeleteIcon />}
                                color="primary"
                                onClick={() => {
                                    dispatch.notificationPopup.close();
                                }}
                            >
                                {'Ok nà'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}

export default PopupNotification;

type Props = {
    isDisplay: boolean;
    title?: string;
    labelButtonConfirm?: string;
    onCancel: () => void;
};
