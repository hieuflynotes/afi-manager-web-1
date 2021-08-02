import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';
import React from 'react';
import { useGlobalStyles } from 'src/theme/GlobalStyle';

type Props = {
    children: React.ReactElement | React.ReactElement[];
    isDisplay: boolean;
    onCancel: () => void;
    onClickConfirm: () => void;
    title: string;
};

export default function BaseDialog(props: Props) {
    const globalStyles = useGlobalStyles();
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            props.onClickConfirm();
        }
        if (e.key === 'Escape') {
            props.onCancel();
        }
    };
    return (
        <Dialog open={props.isDisplay} fullWidth onKeyDown={handleKeyDown}>
            <Grid className={clsx(globalStyles.pp3)}>
                <Grid>
                    <DialogTitle>
                        <Grid item xs={12}>
                            <Typography variant="h5" color={'primary'} align={'center'}>
                                {props.title}
                            </Typography>
                        </Grid>
                        <Box
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                            }}
                        >
                            <IconButton aria-label="close" onClick={props.onCancel}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </DialogTitle>
                </Grid>
                <DialogContent>
                    <Grid container xs={12} direction="column" className={clsx(globalStyles.mt1)}>
                        {props.children}
                    </Grid>
                </DialogContent>
                <Grid className={clsx(globalStyles.ml2, globalStyles.mr2)}>
                    <DialogActions>
                        <Grid item container xs={12} justify={'space-between'}>
                            <Grid item container xs={5} justify={'center'} alignItems={'center'}>
                                <Button
                                    startIcon={<CloseIcon />}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    fullWidth
                                    onClick={props.onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item container xs={5} justify={'center'} alignItems={'center'}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    fullWidth
                                    startIcon={<SaveIcon />}
                                    type={'submit'}
                                    color="primary"
                                    onClick={props.onClickConfirm}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Grid>
            </Grid>
        </Dialog>
    );
}
