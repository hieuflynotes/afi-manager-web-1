import { Grid, makeStyles, Typography } from '@material-ui/core';
import { DragLayerMonitorProps, NodeModel, Tree } from '@minoru/react-dnd-treeview';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RouteComponent, routers, routersMap } from 'src/constants/Route';
import { roleController } from 'src/controller';
import { useCrudHook } from 'src/hook/useCrudHook';
import { CustomNode } from '../../component/permssion/CustomNode';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { GrDrag } from 'react-icons/gr';
type Props = {};
const useStyle = makeStyles((theme) => ({
    rootPermissionItem: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(1),
        padding: theme.spacing(2),
    },
    listDrag: {
        listStyle: 'none',
    },
    itemMenuDrag: {
        padding: theme.spacing(2),
    },
}));

export type CustomData = {
    fileType: string;
    fileSize: string;
};

type State = {
    treeData: NodeModel<unknown>[];
};

function SetupMenu(props: Props) {
    const history = useHistory();
    const crudRole = useCrudHook({
        controller: roleController,
        initQuery: {
            pageSize: 100,
        },
    });
    const classes = useStyle();
    const globalStyle = useGlobalStyles();
    const [state, setState] = useState<State>({
        treeData: [],
    });
    const handleDrop = (newTree: NodeModel[]) => {
        newTree = newTree.map((item) => ({
            ...item,
            droppable: !Boolean(item.parent),
        }));

        setState({
            ...state,
            treeData: newTree,
        });
    };

    useEffect(() => {
        const getRoute = routers;
        const routeTree: NodeModel<RouteComponent>[] = getRoute.map((item, index) => {
            return {
                id: index + 1,
                parent: 0,
                text: item.label,
                droppable: true,
                data: item,
            };
        });
        setState({
            treeData: routeTree,
        });
    }, []);

    return (
        <Grid container className={globalStyle.pp2}>
            {/* <Tree
                tree={state.treeData}
                rootId={0}
                render={
                    ((
                        node: NodeModel<CustomData>,
                        params: { depth: number; isOpen: boolean; onToggle: (id: string | number) => void },
                    ) => {
                        if (!params.isOpen) {
                            params.onToggle(node.id);
                        }
                        return (
                            <Grid className={classes.itemMenuDrag} container {...params}>
                                <GrDrag />
                                <Typography variant="body2">{node.text}</Typography>
                            </Grid>
                        );
                    }) as any
                }
                dragPreviewRender={
                    ((monitorProps: DragLayerMonitorProps<CustomData>) => (
                        <div>
                            <div>{monitorProps.item.text}</div>
                        </div>
                    )) as any
                }
                classes={{
                    root: classes.listDrag,
                }}
                onDrop={handleDrop}
                sort={false}
            /> */}
        </Grid>
    );
}

export default React.memo(SetupMenu);
