import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
    Typography,
    Button,
    Grid,
    makeStyles,
    TextField,
    IconButton,
    Chip,
} from "@material-ui/core";
import { IoAttachOutline, IoCloseOutline } from "react-icons/io5";
import { useGlobalStyles } from "src/theme/GlobalStyle";
import { localStoryController } from "src/controller";

type Props = {};
const useStyle = makeStyles((theme) => ({
    frVariable: {
        borderRadius: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(3),
    },
}));
type State = {
    variables: {
        variable: string;
        values: string;
    }[];
    text: {
        title: string;
        value: string;
    }[];
    textIndex: number;
};
function ToolAutoChangeTextHM(props: Props) {
    const classes = useStyle();
    const globalStyles = useGlobalStyles();
    const [state, setState] = useState<State>(
        localStoryController.getStateTool()
    );
    useEffect(() => {
        return () => {};
    }, []);

    const addNewVariable = () => {
        setState({
            ...state,
            variables: [
                ...state.variables,
                {
                    values: "",
                    variable: "",
                },
            ],
        });
    };

    const removeVariable = (index: number) => {
        let variable = state.variables;
        variable.splice(index, 1);
        setState({
            ...state,
            variables: variable,
        });
    };
    const removeText = (index: number) => {
        let text = state.text;
        if (text.length > 1) {
            text.splice(index, 1);
        }
        setState({
            ...state,
            text: text,
            textIndex: 0,
        });
    };

    const onChangeValue = (value: string, index: number) => {
        let variable = state.variables;
        variable[index].values = value;
        setState({
            ...state,
            variables: variable,
        });
    };
    const onChangeVariable = (value: string, index: number) => {
        let variable = state.variables;
        variable[index].variable = value;
        setState({
            ...state,
            variables: variable,
        });
    };

    const replaceText = (text: string): string => {
        let variable = state.variables;
        variable.forEach((item) => {
            try {
                text = text.replace(
                    new RegExp(`{${item.variable}}`, "ig"),
                    item.values
                );
            } catch (error) {}
        });
        return text;
    };

    useEffect(() => {
        localStoryController.setStateTool(state);
    }, [state]);
    return (
        <Grid
            style={{
                width: "100%",
                minHeight: "100vh",
                background: "white",
            }}
        >
            <Grid container direction="row">
                <Grid className={classes.frVariable} justify="center">
                    {state.variables.map((item, index) => (
                        <Grid
                            container
                            justify="space-around"
                            alignItems="center"
                            className={globalStyles.pp1}
                        >
                            <Grid xs={5}>
                                <TextField
                                    label="Tên biến"
                                    variant="outlined"
                                    fullWidth
                                    value={item.variable}
                                    onChange={(e) => {
                                        onChangeVariable(e.target.value, index);
                                    }}
                                />
                            </Grid>
                            <IoAttachOutline
                                style={{
                                    fontSize: "2rem",
                                }}
                            />
                            <Grid xs={5}>
                                <TextField
                                    label="Giá trị"
                                    variant="outlined"
                                    value={item.values || ""}
                                    fullWidth
                                    onChange={(e) => {
                                        onChangeValue(e.target.value, index);
                                    }}
                                />
                            </Grid>
                            <IconButton onClick={() => removeVariable(index)}>
                                <IoCloseOutline />
                            </IconButton>
                        </Grid>
                    ))}
                    <Grid
                        container
                        justify="center"
                        className={globalStyles.pp1}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addNewVariable()}
                        >
                            Thêm biến
                        </Button>
                    </Grid>
                </Grid>
                <Grid
                    style={{
                        flex: 1,
                    }}
                >
                    <Grid container className={globalStyles.pp2}>
                        <Grid container justify="space-between">
                            <Grid>
                                {state.text.map((item, index) => (
                                    <Chip
                                        label={item.title}
                                        onDelete={() => {
                                            removeText(index);
                                        }}
                                        onClick={() => {
                                            setState({
                                                ...state,
                                                textIndex: index,
                                            });
                                        }}
                                    />
                                ))}
                            </Grid>
                            <Grid>
                                <Button
                                    onClick={() => {
                                        setState({
                                            ...state,
                                            text: [
                                                ...state.text,
                                                {
                                                    title: "text",
                                                    value: "",
                                                },
                                            ],
                                        });
                                    }}
                                >
                                    Thêm text
                                </Button>
                            </Grid>
                        </Grid>
                        <TextField
                            fullWidth
                            label="Name"
                            value={state.text[state.textIndex || 0].title}
                            onChange={(e) => {
                                const text = state.text;
                                text[state.textIndex || 0].title =
                                    e.target.value;
                                setState({
                                    ...state,
                                    text: text,
                                });
                            }}
                            variant="outlined"
                            className={clsx(globalStyles.mt1, globalStyles.mb1)}
                        />
                        <TextField
                            fullWidth
                            label="Value"
                            variant="outlined"
                            multiline
                            value={state.text[state.textIndex || 0].value}
                            onChange={(e) => {
                                const text = state.text;
                                text[state.textIndex || 0].value =
                                    e.target.value;
                                setState({
                                    ...state,
                                    text: text,
                                });
                            }}
                            rows={10}
                        />
                    </Grid>
                    <Grid className={clsx(globalStyles.pp2)}>
                        <Grid
                            className={clsx(
                                globalStyles.pp2,
                                classes.frVariable
                            )}
                        >
                            <Grid container justify="space-between">
                                <Typography variant="h3">Output</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        try {
                                            navigator.clipboard.writeText(
                                                replaceText(
                                                    state.text[
                                                        state.textIndex || 0
                                                    ].value
                                                )
                                            );
                                        } catch (error) {}
                                    }}
                                >
                                    Copy text
                                </Button>
                            </Grid>
                            <Grid>
                                <TextField
                                    fullWidth
                                    label="Value"
                                    variant="outlined"
                                    multiline
                                    value={replaceText(
                                        state.text[state.textIndex || 0].value
                                    )}
                                    rows={20}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default React.memo(ToolAutoChangeTextHM);
