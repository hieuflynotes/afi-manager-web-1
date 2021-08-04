import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import QuoteList from '../../container/permission/InnerQuoteList';
import { RouteComponent } from 'src/component/common/NavBar';
import { IoCloseOutline } from 'react-icons/io5';
import { AiOutlineEdit } from 'react-icons/ai';

type PropsColum = {
    item: RouteComponent;
    index: number;
    onDelete: (item: RouteComponent) => void;
    onEdit: (item: RouteComponent) => void;
    renderItem?: (item: RouteComponent) => React.ReactElement;
};
const useStyle = makeStyles((theme) => ({
    listDrag: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(1),
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        minWidth: 150,
        position: 'relative',
        minHeight: 100,
    },
}));
export default function ColumnMenu<T = any>(props: PropsColum) {
    const classes = useStyle();
    return (
        <Draggable draggableId={props.item.id || ''} index={props.index} disableInteractiveElementBlocking={true}>
            {(provided, snapshot) => {
                return (
                    <Grid>
                        <Grid ref={provided.innerRef} {...provided.draggableProps} className={classes.listDrag}>
                            <Grid {...provided.dragHandleProps}>
                                <Grid container justify="space-between" alignItems="center">
                                    <Grid>
                                        <Typography color="primary">{props.item.label}</Typography>
                                    </Grid>
                                    <Grid>
                                        <IconButton onClick={() => props.onEdit(props.item)}>
                                            <AiOutlineEdit />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                props.onDelete(props.item);
                                            }}
                                        >
                                            <IoCloseOutline />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <QuoteList
                                listId={props.item.id}
                                listType="QUOTE"
                                quotes={props.item.subMenu}
                                isCombineEnabled={true}
                                renderItem={props.renderItem}
                            />
                        </Grid>
                    </Grid>
                );
            }}
        </Draggable>
    );
}
