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
    linkImage: string;
    isDisplay: boolean;
    onCancel: () => void;
};

export default function DialogShowImage(props: Props) {
    const globalStyles = useGlobalStyles();
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            props.onCancel();
        }
        if (e.key === 'Escape') {
            props.onCancel();
        }
    };
    return (
        <Dialog maxWidth="xl" open={props.isDisplay} fullWidth onKeyDown={handleKeyDown}>
            <Grid className={clsx(globalStyles.pp3)}>
                <Grid>
                    <DialogTitle>
                        <Grid item xs={12}>
                            <Typography variant="h5" color={'primary'} align={'center'}>
                                {'Hỉnh ảnh'}
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
                        <img
                            style={{
                                width: '100%',
                            }}
                            src={props.linkImage}
                        ></img>
                    </Grid>
                </DialogContent>
                <Grid className={clsx(globalStyles.ml2, globalStyles.mr2)}>
                    <DialogActions>
                        <Grid item container xs={12} justify={'space-between'}>
                            <Grid item container xs={12} justify={'center'} alignItems={'center'}>
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
                        </Grid>
                    </DialogActions>
                </Grid>
            </Grid>
        </Dialog>
    );
}
