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
import { IoCloseOutline } from 'react-icons/io5';
import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import theme from '../../theme/MuiTheme';
import clsx from 'clsx';
import { useGlobalStyles } from 'src/theme/GlobalStyle';

const useStyles = makeStyles((theme: Theme) => ({
    digActions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    buttonAlert: {
        paddingRight: theme.spacing(5),
        paddingLeft: theme.spacing(5),
    },
    title: {},
}));

function PopUpConfirm(props: Props) {
    const classes = useStyles();
    const globalStyles = useGlobalStyles();
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            props.onConfirm();
        }
        if (e.key === 'Escape') {
            props.onCancel();
        }
    };
    return (
        <Dialog open={props.isDisplay} fullWidth={true} maxWidth={'sm'} onKeyDown={handleKeyDown}>
            <DialogTitle className={clsx(globalStyles.pp0, globalStyles.mm0)}>
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
                            props.onCancel();
                        }}
                        color="inherit"
                    >
                        <IoCloseOutline />
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
                                {props.title || 'Are you sure ?'}
                            </Typography>
                        </Grid>
                        <Grid container className={clsx(globalStyles.pp1)} justify="center">
                            <Typography
                                className={classes.title}
                                variant="subtitle1"
                                align="center"
                                // color="textPrimary"
                            >
                                {props.title || 'You will not be able to recover ?'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Grid item xs={12} className={classes.digActions}>
                    <Grid item container xs={12} direction="row" justify="space-evenly" alignItems="center">
                        <Button
                            // className={globalStyles.buttonOutline}
                            startIcon={<IoCloseOutline />}
                            variant="outlined"
                            size="small"
                            color={'primary'}
                            onClick={() => {
                                props.onCancel();
                            }}
                        >
                            {'Cancel'}
                        </Button>

                        <Button
                            variant="contained"
                            className={globalStyles.buttonAlert}
                            size="small"
                            startIcon={<IoCloseOutline />}
                            color="primary"
                            onClick={() => {
                                props.onConfirm();
                            }}
                        >
                            {props.labelButtonConfirm || 'Confirm'}
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}

export default PopUpConfirm;

type Props = {
    isDisplay: boolean;
    title?: string;
    labelButtonConfirm?: string;
    onConfirm: () => void;
    onCancel: () => void;
};
