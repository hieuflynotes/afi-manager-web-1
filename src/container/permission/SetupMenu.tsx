import { Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { routers, routersMap } from 'src/constants/Route';
import { localStoryController, roleController } from 'src/controller';
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
import Column from './Column';
import { v4 as uuid } from 'uuid';
import { RouteComponent } from 'src/component/common/NavBar';
import Button from 'src/component/common/Button';
import { AiFillApple } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import theme from 'src/theme/MuiTheme';
import { handleWithPopupHook } from 'src/hook/HandleWithPopupHook';
import PopUpConfirm from 'src/component/common/PopupConfirm';
import PopupEditRouteMenu from 'src/component/permssion/PopupEditRouteMenu';
import ListGrid from 'src/component/common/ListGrid';

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
        padding: theme.spacing(2),
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

function SetupMenu(props: Props) {
    const history = useHistory();

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

    const [state, setState] = useState<State>({
        menuDrag: [],
    });

    const crudRole = useCrudHook({
        controller: roleController,
        initQuery: {
            pageSize: 100,
        },
    });

    useEffect(() => {
        setState({ ...state, menuDrag: localStoryController.getMenu() });
    }, []);

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
            <Grid container className={globalStyle.pp2} justify="flex-end">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        onSaveMenu(state.menuDrag);
                    }}
                >
                    Save
                </Button>
            </Grid>
            <Grid
                style={{
                    width: 300,
                    borderRight: `1px solid ${theme.palette.divider}`,
                }}
            >
                {routers.map((item) => {
                    return (
                        <Grid item className={globalStyle.pb1} onClick={() => onAddMenu(item)}>
                            <Button variant="outlined">{item.link}</Button>
                        </Grid>
                    );
                })}
                <Grid
                    item
                    className={globalStyle.pb1}
                    onClick={() => onAddMenu({ icon: <AiFillApple />, label: 'New', id: uuid(), link: '' })}
                >
                    <Button variant="outlined">Empty not link</Button>
                </Grid>
            </Grid>
            <Grid>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="board" type="COLUMN" direction="vertical" isCombineEnabled={true}>
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
