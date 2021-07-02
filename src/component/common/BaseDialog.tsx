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
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import clsx from "clsx";
import React from "react";
import { useGlobalStyles } from "src/theme/GlobalStyle";

type Props = {
    children: React.ReactElement | React.ReactElement[];
    isDisplay: boolean;
    onCancel: () => void;
    onClickConfirm: () => void;
    title: string;
};

export default function BaseDialog(props: Props) {
    const globalStyles = useGlobalStyles();
    return (
        <Dialog open={props.isDisplay} fullWidth>
            <Grid>
                <DialogTitle>
                    <Grid item xs={12}>
                        <Typography
                            variant="h5"
                            color={"primary"}
                            align={"center"}
                        >
                            {props.title}
                        </Typography>
                    </Grid>
                    <Box
                        style={{
                            position: "absolute",
                            top: "1.5rem",
                            right: "1.5rem",
                        }}
                    >
                        <IconButton aria-label="close" onClick={props.onCancel}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
            </Grid>
            <DialogContent>
                <Grid
                    container
                    xs={12}
                    direction="column"
                    className={clsx(globalStyles.mt1)}
                >
                    {props.children}
                </Grid>
            </DialogContent>
            <Grid>
                <DialogActions>
                    <Grid item container xs={12} justify={"space-between"}>
                        <Grid
                            item
                            container
                            xs={5}
                            justify={"center"}
                            alignItems={"center"}
                        >
                            <Button
                                startIcon={<CloseIcon />}
                                variant="outlined"
                                size="large"
                                color="primary"
                                fullWidth
                                onClick={props.onCancel}
                            >
                                Hủy
                            </Button>
                        </Grid>
                        <Grid
                            item
                            container
                            xs={5}
                            justify={"center"}
                            alignItems={"center"}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                startIcon={<SaveIcon />}
                                type={"submit"}
                                color="primary"
                                onClick={props.onClickConfirm}
                            >
                                Lưu
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Grid>
        </Dialog>
    );
}
