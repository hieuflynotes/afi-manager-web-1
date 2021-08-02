import { Divider, Grid, IconButton, Input, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { routers, routersMap } from 'src/constants/Route';
import { localStoryController, menuTeamplateController, roleController } from 'src/controller';
import { useCrudHook } from 'src/hook/useCrudHook';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { GrDrag } from 'react-icons/gr';
import {
    Combine,
    DragDropContext,
    DraggableLocation,
    Droppable,
    DropResult,
    ResponderProvided,
} from 'react-beautiful-dnd';
import Column from '../../component/permssion/ColumnMenu';
import { v4 as uuid } from 'uuid';
import { RouteComponent } from 'src/component/common/NavBar';
import Button from 'src/component/common/Button';
import { AiFillApple, AiFillDashboard, AiOutlineEdit } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import theme from 'src/theme/MuiTheme';
import { handleWithPopupHook } from 'src/hook/HandleWithPopupHook';
import PopUpConfirm from 'src/component/common/PopupConfirm';
import PopupEditRouteMenu from 'src/component/permssion/PopupEditRouteMenu';
import ListGrid from 'src/component/common/ListGrid';
import TextField from 'src/component/common/TextFiled';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MenuTemplate } from 'src/afi-manager-base-model/model/MenuTemplate';
import { MenuTemplateItem } from 'src/afi-manager-base-model/model/MenuTemplateItem';
import { validate as validateUuid } from 'uuid';

type Props = {};
const useStyle = makeStyles((theme) => ({
    rootPermissionItem: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(1),
        padding: theme.spacing(2),
    },
    listDrag: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(1),
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        minWidth: 150,
        position: 'relative',
    },
    itemMenuDrag: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(1),
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
}));

type State = {
    menuDrag: RouteComponent[];
};

interface IOnDragEnd extends DropResult {
    mode: 'FLUID';
    reason: 'DROP';
    source: { droppableId: string; index: number };
    type: 'QUOTE' | 'COLUMN';
    // destination?: (DraggableLocation & { draggableId?: string }) | undefined;
    combine?: (Combine & { draggableId?: string }) | undefined;
}

const validate = Yup.object({
    name: Yup.string()
        .max(100, 'Value must be less than 100 characters')
        .required("Can't be left blank !!")
        .trim()
        .nullable(),
});
function SetupMenu(props: Props) {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const formik = useFormik<MenuTemplate>({
        initialValues: {} as MenuTemplate,
        validationSchema: validate,
        onSubmit: () => {
            menuTeamplateController
                .save({
                    ...formik.values,
                    menu: state.menuDrag,
                })
                .then((res) => {
                    history.push(`/setup-menu/${res.id}`);
                });
        },
    });
    const onSubmit = () => {
        formik.handleSubmit();
        formik.setTouched({
            name: true,
        });
    };

    const handleWithPopupMenu = handleWithPopupHook<RouteComponent>({
        onConfirm: (menu) => {
            if (menu) {
                setState({
                    ...state,
                    menuDrag: state.menuDrag.filter((item) => item.id != menu.id),
                });
            }
        },
        onConfirmByPopup: (menu) => {
            if (menu) {
                const getMenuState = state.menuDrag || [];
                const getIndexDefault = getMenuState.findIndex((item) => item.id === menu.id);
                getMenuState[getIndexDefault] = menu;
                setState({ ...state, menuDrag: getMenuState });
            }
        },
    });
    const handleWithPopupSubMenu = handleWithPopupHook<RouteComponent>({
        onConfirm: (menu) => {
            if (menu) {
                const getStateMenu = state.menuDrag;
                let isDelete = false;
                getStateMenu.forEach((item, indexMenu) => {
                    item.subMenu = item.subMenu || [];
                    item.subMenu?.forEach((sub, indexSub) => {
                        if (sub.id == menu.id) {
                            getStateMenu[indexMenu].subMenu?.splice(indexSub, 1);
                            isDelete = true;
                            return;
                        }
                    });
                    if (isDelete) return;
                });
                setState({ ...state, menuDrag: getStateMenu });
            }
        },
        onConfirmByPopup: (menu) => {
            if (menu) {
                const getStateMenu = state.menuDrag || [];
                let isEdit = false;
                getStateMenu.forEach((item, indexMenu) => {
                    item.subMenu = item.subMenu || [];
                    item.subMenu?.forEach((sub, indexSub) => {
                        if (sub.id == menu.id && getStateMenu[indexMenu] && getStateMenu[indexMenu].subMenu) {
                            getStateMenu[indexMenu].subMenu = getStateMenu[indexMenu].subMenu || [];
                            (getStateMenu[indexMenu] as any).subMenu[indexSub] = menu;
                            isEdit = true;
                            return;
                        }
                    });
                    if (isEdit) return;
                });
                setState({ ...state, menuDrag: getStateMenu });
            }
        },
    });

    const [state, setState] = useState<State>({
        menuDrag: [],
    });

    useEffect(() => {
        if (validateUuid(id)) {
            menuTeamplateController.getById({ id }).then((res) => {
                if (res) {
                    let menu = (res?.menu || [])
                        .map((item) => {
                            return getDefault(item);
                        })
                        .filter((item) => Boolean(item)) as any;

                    setState({ ...state, menuDrag: menu || [] });
                    formik.setValues({
                        ...res,
                    });
                }
            });
        }
    }, []);

    const getDefault = (item: MenuTemplateItem): RouteComponent => {
        const defaultLink = routersMap.get(item.link || '');
        return {
            ...item,
            icon: defaultLink?.icon || <AiFillDashboard />,
            link: defaultLink?.link || '',
            label: item?.label || '',
            subMenu: item.subMenu?.map((sub) => getDefault(sub)) || [],
        };
    };

    const classes = useStyle();
    const globalStyle = useGlobalStyles();

    const onDragEnd = (result: IOnDragEnd, provided: ResponderProvided) => {
        console.log(result);
        const refData = [...state.menuDrag];
        const dataMap = new Map<string, RouteComponent>(refData.map((item) => [item.id || '', item]));
        if (result.type == 'QUOTE') {
            if (!result.destination) {
                setState({ ...state });
                return;
            }
            if (result.draggableId) {
                let getSource = dataMap.get(result.source.droppableId);
                let getValueSelect: RouteComponent | undefined;
                if (getSource && getSource.subMenu) {
                    getValueSelect = getSource.subMenu[result.source.index];
                } else {
                    return;
                }
                getSource?.subMenu?.splice(Number(result.source.index), 1);
                dataMap.set(getSource.id || '', getSource);
                const getDestinaon = dataMap.get(result.destination?.droppableId || '');
                if (getDestinaon && getDestinaon.subMenu) {
                    const newSubItem: RouteComponent[] = [];
                    getDestinaon.subMenu.forEach((item, index) => {
                        if (index == result.destination?.index && getValueSelect) {
                            newSubItem.push({ ...getValueSelect });
                            getValueSelect = undefined;
                        }
                        newSubItem.push(item);
                    });
                    if (getValueSelect) {
                        newSubItem.push(getValueSelect);
                    }

                    getDestinaon.subMenu = newSubItem;
                    dataMap.set(getDestinaon.id || '', getDestinaon);
                    // console.log(Array.from(dataMap.values()));

                    setState({
                        ...state,
                        menuDrag: Array.from(dataMap.values()),
                    });
                }
            }
        }
        if (result.type == 'COLUMN') {
            if (result.source?.droppableId == 'board' && result.destination?.droppableId == 'board') {
                let getRefSource: RouteComponent | undefined = refData[result.source.index];
                refData.splice(result.source.index, 1);
                const newData: RouteComponent[] = [];
                refData.forEach((item, index) => {
                    if (index == result.destination?.index && getRefSource) {
                        newData.push({ ...getRefSource });
                        getRefSource = undefined;
                    }
                    newData.push(item);
                });
                if (getRefSource) {
                    newData.push(getRefSource);
                }

                setState({ ...state, menuDrag: newData });
            } else if (result.source?.droppableId == 'board' && result.combine?.droppableId == 'board') {
                let getSource = refData[result.source.index];

                dataMap.delete(getSource.id || '');
                const getCombine = dataMap.get(result.combine.draggableId);
                if (getCombine && getSource) {
                    getCombine.subMenu = getCombine.subMenu || [];
                    getCombine.subMenu = [...getCombine.subMenu, ...(getSource.subMenu || [])];
                    if (getSource.link) {
                        delete getSource.subMenu;
                        getCombine.subMenu.push(getSource);
                    }
                    dataMap.set(getCombine.id || '', getCombine);
                }
                setState({ ...state, menuDrag: Array.from(dataMap.values()) });
            } else {
                setState({ ...state });
                return;
            }
        }
    };

    const onAddMenu = (item: RouteComponent) => {
        setState({ ...state, menuDrag: [...state.menuDrag, { ...item, id: item.id || uuid(), subMenu: [] }] });
    };

    const onSaveMenu = (menu: RouteComponent[]) => {
        localStoryController.addMenu(menu);
    };

    return (
        <Grid container className={globalStyle.pp2}>
            <PopupEditRouteMenu
                isDisplay={handleWithPopupMenu.isDisplayPopup}
                item={handleWithPopupMenu.itemSelected}
                onCancel={handleWithPopupMenu.handleClosePopup}
                onEdit={handleWithPopupMenu.handleConfirmByPopup}
            />
            <PopUpConfirm
                isDisplay={handleWithPopupMenu.isDisplayConfirm}
                onCancel={handleWithPopupMenu.handleClosePopup}
                onConfirm={() => handleWithPopupMenu.handleConfirm(handleWithPopupMenu.itemSelected)}
            />

            <PopupEditRouteMenu
                isDisplay={handleWithPopupSubMenu.isDisplayPopup}
                item={handleWithPopupSubMenu.itemSelected}
                onCancel={handleWithPopupSubMenu.handleClosePopup}
                onEdit={handleWithPopupSubMenu.handleConfirmByPopup}
            />
            <PopUpConfirm
                isDisplay={handleWithPopupSubMenu.isDisplayConfirm}
                onCancel={handleWithPopupSubMenu.handleClosePopup}
                onConfirm={() => handleWithPopupSubMenu.handleConfirm(handleWithPopupSubMenu.itemSelected)}
            />

            <Grid container className={globalStyle.pp2} justify="space-between">
                <TextField
                    variant="outlined"
                    color="primary"
                    label="Name Menu"
                    InputLabelProps={{ shrink: true }}
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        onSubmit();
                    }}
                >
                    Save
                </Button>
            </Grid>
            <Grid
                container
                className={globalStyle.pp2}
                style={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                {routers.map((item) => {
                    return (
                        <Grid item className={globalStyle.pp1} onClick={() => onAddMenu(item)}>
                            <Button variant="outlined">{item.link}</Button>
                        </Grid>
                    );
                })}
                <Grid
                    item
                    className={globalStyle.pp1}
                    onClick={() => onAddMenu({ icon: <AiFillApple />, label: 'New', id: uuid(), link: '' })}
                >
                    <Button variant="outlined">Empty not link</Button>
                </Grid>
            </Grid>
            <Grid>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="board" type="COLUMN" direction="horizontal" isCombineEnabled={true}>
                        {(provided) => (
                            <Grid ref={provided.innerRef} {...provided.droppableProps} container>
                                {state.menuDrag.map((item, index: number) => (
                                    <Grid>
                                        <Column
                                            key={item.id}
                                            item={item}
                                            index={index}
                                            onDelete={handleWithPopupMenu.handleShowConfirm}
                                            onEdit={handleWithPopupMenu.handleShowPopup}
                                            renderItem={(subMenu) => {
                                                return (
                                                    <Grid
                                                        className={classes.itemMenuDrag}
                                                        container
                                                        alignItems="center"
                                                        alignContent="center"
                                                        justify="space-between"
                                                    >
                                                        <Grid>
                                                            <Grid>{`${subMenu.link} - ${subMenu.label}`}</Grid>
                                                        </Grid>
                                                        <Grid>
                                                            <IconButton
                                                                onClick={() => {
                                                                    handleWithPopupSubMenu.handleShowPopup(subMenu);
                                                                }}
                                                            >
                                                                <AiOutlineEdit />
                                                            </IconButton>
                                                            <IconButton
                                                                onClick={() => {
                                                                    handleWithPopupSubMenu.handleShowConfirm(subMenu);
                                                                }}
                                                            >
                                                                <IoCloseOutline />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                );
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Droppable>
                </DragDropContext>
            </Grid>
        </Grid>
    );
}

export default React.memo(SetupMenu);
