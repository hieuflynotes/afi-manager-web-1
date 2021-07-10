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
    Avatar,
} from "@material-ui/core";
import { IoAdd, IoAttachOutline, IoCloseOutline } from "react-icons/io5";
import { useGlobalStyles } from "src/theme/GlobalStyle";
import { localStoryController, metaDataController } from "src/controller";
import theme from "src/theme/MuiTheme";
import { AiOutlineCloudSync } from "react-icons/ai";
import { IoMdCopy } from "react-icons/io";
import { dispatch } from "src/rematch/store";

type Props = {};
const useStyle = makeStyles((theme) => ({
    frVariable: {
        borderRadius: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(3),
        width: 500,
    },
    iconAdd: {
        border: `1px solid ${theme.palette.primary.main}`,
        marginLeft: theme.spacing(2),
        padding: theme.spacing(0.5),
    },
}));
type State = {
    variables: {
        name: string;
        variable: {
            variable: string;
            values: string;
        }[];
    }[];

    text: {
        title: string;
        value: string;
    }[];
    variableIndex: number;
    textIndex: number;
};
const templateDataSate = {
    variables: [
        {
            name: "main",
            variable: [],
        },
    ],
    text: [
        {
            title: "text1",
            value: "",
        },
    ],
    textIndex: 0,
    variableIndex: 0,
};
function ToolAutoChangeTextHM(props: Props) {
    const classes = useStyle();
    const globalStyles = useGlobalStyles();
    const [state, setState] = useState<State>(templateDataSate);
    useEffect(() => {
        return () => {};
    }, []);

    // const getStateVariable = () => {
    //     const variables = state.variables;
    //     if (variables.length == 0) {
    //         setState({
    //             ...state,
    //             variables: [[]],
    //             variableIndex: 0,
    //         });
    //     } else if (!state.variables[state.variableIndex]) {
    //     }
    // };

    const addNewVariable = () => {
        let variable = state.variables;
        variable[state.variableIndex].variable.push({
            values: "",
            variable: "",
        });
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

    const removeVariable = (index: number) => {
        // Kiểm bug
        let variable = state.variables;
        variable[state.variableIndex].variable.splice(index, 1);
        setState({
            ...state,
            variables: variable,
        });
    };

    const onChangeValue = (value: string, index: number) => {
        let variables = state.variables;
        const variable = variables[state.variableIndex].variable;
        variable[index].values = value;
        variables[state.variableIndex].variable = variable;
        setState({
            ...state,
            variables: variables,
        });
    };
    const onChangeVariable = (value: string, index: number) => {
        let variables = state.variables;
        const variable = variables[state.variableIndex].variable;
        variable[index].variable = value;
        variables[state.variableIndex].variable = variable;
        setState({
            ...state,
            variables: variables,
        });
    };

    const addVariableTemplate = () => {
        let variables = state.variables || [];
        variables.push({
            name: "variable Next",
            variable: [],
        });
        setState({
            ...state,
            variables,
        });
    };

    const duplicateVariableTemplate = (item: any) => {
        let variables = state.variables || [];
        variables.push(JSON.parse(JSON.stringify(item)));
        setState({
            ...state,
            variables,
        });
    };

    const removeVariableTemplate = (index: number) => {
        let variables = state.variables || [];
        variables.splice(index, 1);
        setState({
            ...state,
            variables,
        });
    };

    const replaceText = (text: string): string => {
        let variable = state.variables[state.variableIndex] || [];
        variable.variable.forEach((item) => {
            try {
                text = text.replace(
                    new RegExp(`{${item.variable}}`, "ig"),
                    item.values
                );
            } catch (error) {}
        });
        return text;
    };

    const syncOnline = () => {
        metaDataController.saveByKey({
            key: "tool-replace-text",
            data: state,
        });
    };

    const addText = () => {
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
    };
    const duplicateText = (item: any) => {
        setState({
            ...state,
            text: [...state.text, item],
        });
    };

    useEffect(() => {
        metaDataController
            .getByKey({ key: "tool-replace-text" })
            .then((res) => {
                setState(res.data || templateDataSate);
            });
    }, []);

    const autoCheck = () => {
        const getState = state;
        let error = false;
        if (!getState.variables[getState.variableIndex]) {
            getState.variableIndex = 0;
            error = true;
        }
        if (
            !getState.variables[getState.variableIndex] ||
            !getState.variables[getState.variableIndex].variable
        ) {
            getState.variables = [
                {
                    name: "main",
                    variable: [],
                },
            ];
            error = true;
        }
        if (error) {
            console.log(getState);
            setState({
                ...state,
                ...getState,
            });
        }
    };
    autoCheck();

    return (
        <Grid
            style={{
                minHeight: "100vh",
                background: "white",
                padding: theme.spacing(2),
            }}
        >
            <Grid container className={globalStyles.pp2} justify="flex-end">
                <Button
                    startIcon={<AiOutlineCloudSync />}
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        syncOnline();
                    }}
                >
                    Đồng bộ online
                </Button>
            </Grid>
            <Grid container direction="row">
                <Grid className={classes.frVariable} justify="center">
                    <Grid
                        container
                        justify="space-between"
                        className={globalStyles.pp1}
                    >
                        <Grid>
                            <Grid container className={globalStyles.pp1}>
                                {state.variables.map((item, index) => (
                                    <Chip
                                        avatar={
                                            <Avatar
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    duplicateVariableTemplate(
                                                        item
                                                    );
                                                }}
                                            >
                                                <IoMdCopy />
                                            </Avatar>
                                        }
                                        color={
                                            index == state.variableIndex
                                                ? "primary"
                                                : undefined
                                        }
                                        className={clsx(
                                            globalStyles.mr1,
                                            globalStyles.mb1
                                        )}
                                        label={item.name}
                                        onDelete={() => {
                                            removeVariableTemplate(index);
                                        }}
                                        onClick={() => {
                                            setState({
                                                ...state,
                                                variableIndex: index,
                                            });
                                        }}
                                    />
                                ))}
                                <IconButton
                                    className={classes.iconAdd}
                                    color="primary"
                                    onClick={() => {
                                        addVariableTemplate();
                                    }}
                                >
                                    <IoAdd />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className={clsx(globalStyles.pp1, globalStyles.pt3)}
                        >
                            <TextField
                                label="Giá trị"
                                variant="outlined"
                                value={
                                    state.variables[state.variableIndex]
                                        ?.name || ""
                                }
                                onChange={(e) => {
                                    const getState = state;
                                    getState.variables[
                                        state.variableIndex
                                    ].name = e.target.value;
                                    setState({
                                        ...getState,
                                    });
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid className={globalStyles.pt4}>
                        {(
                            state.variables[state.variableIndex]?.variable || []
                        ).map((item, index) => (
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
                                            onChangeVariable(
                                                e.target.value,
                                                index
                                            );
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
                                            onChangeValue(
                                                e.target.value,
                                                index
                                            );
                                        }}
                                    />
                                </Grid>
                                <IconButton
                                    onClick={() => removeVariable(index)}
                                >
                                    <IoCloseOutline />
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
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
                    className={clsx(globalStyles.pp2, globalStyles.pt0)}
                >
                    <Grid container>
                        <Grid
                            container
                            className={globalStyles.pp2}
                            style={{
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: theme.spacing(2),
                            }}
                        >
                            <Typography variant="h3">Template</Typography>
                            <Grid container justify="space-between">
                                <Grid>
                                    {state.text.map((item, index) => (
                                        <Chip
                                            avatar={
                                                <Avatar
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        duplicateText(item);
                                                    }}
                                                >
                                                    <IoMdCopy />
                                                </Avatar>
                                            }
                                            color={
                                                index == state.textIndex
                                                    ? "primary"
                                                    : undefined
                                            }
                                            className={clsx(
                                                globalStyles.mr1,
                                                globalStyles.mb1
                                            )}
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
                                    <IconButton
                                        className={classes.iconAdd}
                                        color="primary"
                                        onClick={() => {
                                            addText();
                                        }}
                                    >
                                        <IoAdd />
                                    </IconButton>
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
                                className={clsx(
                                    globalStyles.mt1,
                                    globalStyles.mb1
                                )}
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
                    </Grid>
                    <Grid container className={clsx(globalStyles.pt2)}>
                        <Grid
                            className={clsx(
                                globalStyles.pp2,
                                classes.frVariable
                            )}
                            style={{
                                flex: 1,
                            }}
                        >
                            <Grid container>
                                <Typography variant="h3">Output</Typography>
                                <Grid>
                                    <IconButton
                                        className={classes.iconAdd}
                                        color="secondary"
                                        style={{
                                            borderColor:
                                                theme.palette.secondary.main,
                                        }}
                                        onClick={() => {
                                            try {
                                                navigator.clipboard
                                                    .writeText(
                                                        replaceText(
                                                            state.text[
                                                                state.textIndex ||
                                                                    0
                                                            ].value
                                                        )
                                                    )
                                                    .then((res) => {
                                                        dispatch.notification.success(
                                                            "Copy thành success"
                                                        );
                                                    });
                                            } catch (error) {}
                                        }}
                                    >
                                        <IoMdCopy />
                                    </IconButton>
                                </Grid>
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
