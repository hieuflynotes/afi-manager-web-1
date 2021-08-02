import { Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { v4 as uuid } from 'uuid';
import { RouteComponent } from 'src/component/common/NavBar';
import Button from 'src/component/common/Button';
import { AiFillApple, AiOutlineEdit } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import theme from 'src/theme/MuiTheme';
import { handleWithPopupHook } from 'src/hook/HandleWithPopupHook';
import PopUpConfirm from 'src/component/common/PopupConfirm';
import PopupEditRouteMenu from 'src/component/permssion/PopupEditRouteMenu';
import ListGrid from 'src/component/common/ListGrid';
import TextField from 'src/component/common/TextFiled';

type Props = {};
const useStyle = makeStyles((theme) => ({
    rootMenuItem: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(1),
        padding: theme.spacing(2),
    },
}));

type State = {
    menuDrag: RouteComponent[];
};

function SetupMenuContainer(props: Props) {
    const history = useHistory();
    const crudRole = useCrudHook({
        controller: menuTeamplateController,
        initQuery: {
            pageSize: 100,
        },
    });
    const classes = useStyle();
    const globalStyle = useGlobalStyles();
    const [state, setState] = useState<State>();

    useEffect(() => {}, []);

    return (
        <Grid container className={globalStyle.pp2}>
            <PopUpConfirm
                isDisplay={crudRole.isShowConfirm}
                onCancel={crudRole.onCancelConfirm}
                onConfirm={() => crudRole.onDelete(crudRole.itemSelected)}
            />
            <Grid container justify="center">
                <Typography variant="h5">Menu</Typography>
            </Grid>
            <Grid container justify="space-between">
                <Grid className={globalStyle.pp2}>
                    <TextField variant="outlined" label="Search" />
                </Grid>
                <Grid className={globalStyle.pp2}>
                    <Button variant="contained" color="primary" onClick={() => history.push(`/setup-menu/create`)}>
                        New Menu
                    </Button>
                </Grid>
            </Grid>
            <Grid container className={globalStyle.pp2}>
                <ListGrid gridGap={20} minWidthItem="300px">
                    {crudRole.pagingList.rows?.map((item) => (
                        <Grid className={classes.rootMenuItem}>
                            <Grid container justify="space-between" alignItems="center">
                                <Grid>
                                    <Typography variant="h6">{item.name}</Typography>
                                </Grid>
                                <Grid>
                                    <IconButton color="primary" onClick={() => history.push(`/setup-menu/${item.id}`)}>
                                        <AiOutlineEdit />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            crudRole.onConfirm(item);
                                        }}
                                    >
                                        <IoCloseOutline />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </ListGrid>
            </Grid>
        </Grid>
    );
}

export default React.memo(SetupMenuContainer);
