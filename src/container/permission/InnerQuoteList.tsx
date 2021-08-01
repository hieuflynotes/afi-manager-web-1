import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    rootItem: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(1),
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
}));

function InnerQuoteList(props: any) {
    const classes = useStyle();
    return props.quotes.map((quote: any, index: any) => (
        <Draggable key={quote.id} draggableId={quote.id} index={index}>
            {(dragProvided, dragSnapshot) => (
                <Grid
                    className={classes.rootItem}
                    ref={dragProvided.innerRef}
                    {...{ isDragging: dragSnapshot.isDragging, isGroupedOver: Boolean(dragSnapshot.combineTargetFor) }}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                >
                    <Grid>
                        <Grid>
                            <Grid>{`${quote.link} - ${quote.label}`}</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Draggable>
    ));
}

export default function QuoteList(props: any) {
    return (
        <Droppable
            droppableId={props.listId}
            type={props.listType}
            ignoreContainerClipping={props.ignoreContainerClipping}
            isDropDisabled={props.isDropDisabled}
            isCombineEnabled={props.isCombineEnabled}
        >
            {(dropProvided) => (
                <div {...dropProvided.droppableProps}>
                    <Grid>
                        <Grid ref={dropProvided.innerRef}>
                            <InnerQuoteList quotes={props.quotes} />
                            {dropProvided.placeholder}
                        </Grid>
                    </Grid>
                </div>
            )}
        </Droppable>
    );
}
