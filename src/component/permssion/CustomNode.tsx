import React from 'react';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { NodeModel, useDragOver } from '@minoru/react-dnd-treeview';
import { CustomData } from '../../container/permission/SetupMenu';
import { Grid } from '@material-ui/core';

type Props = {
    node: NodeModel<CustomData>;
    depth: number;
    isOpen: boolean;
    onToggle: (id: NodeModel['id']) => void;
};

export const CustomNode: React.FC<Props> = (props) => {
    const { id } = props.node;

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        props.onToggle(props.node.id);
    };

    const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

    return (
        <Grid container {...dragOverProps} onClick={handleToggle}>
            <Typography variant="body2">{props.node.text}</Typography>
        </Grid>
    );
};
