import { makeStyles, Grid, Typography, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import Button from 'src/component/common/Button';
import ListGrid from 'src/component/common/ListGrid';
import PopUpConfirm from 'src/component/common/PopupConfirm';
import TextField from 'src/component/common/TextFiled';
import PopupPermssion from 'src/component/permssion/PopupPermssion';
import { permssionController } from 'src/controller';
import { useCrudHook } from 'src/hook/useCrudHook';
import { useGlobalStyles } from '../../theme/GlobalStyle';

const fileDownload = require('js-file-download');

type Props = {};
const useStyle = makeStyles((theme) => ({
    rootPermissionItem: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(1),
        padding: theme.spacing(2),
    },
}));
type State = {};

function PermissionContainer(props: Props) {
    const history = useHistory();
    const crudPermission = useCrudHook({
        controller: permssionController,
        initQuery: {
            pageSize: 100,
            searchFields: ['name', 'path'],
        },
    });
    const classes = useStyle();
    const globalStyle = useGlobalStyles();
    const [state, setState] = useState<State>();

    useEffect(() => {}, []);

    return (
        <Grid container className={globalStyle.pp2}>
            <PopupPermssion
                isDisplay={crudPermission.isShowPopup}
                item={crudPermission.itemSelected}
                onCancel={crudPermission.onCancelPopup}
                onEdit={crudPermission.onSave}
            />
            <PopUpConfirm
                isDisplay={crudPermission.isShowConfirm}
                onCancel={crudPermission.onCancelConfirm}
                onConfirm={() => crudPermission.onDelete(crudPermission.itemSelected)}
            />
            <Grid container justify="center">
                <Typography variant="h5">Permssion</Typography>
            </Grid>
            <Grid container justify="space-between">
                <Grid className={globalStyle.pp2}>
                    <TextField
                        variant="outlined"
                        label="Search"
                        onChange={(e) => {
                            crudPermission.onQueryChanged(e.target.value);
                        }}
                    />
                </Grid>
                <Grid className={globalStyle.pp2}>
                    <Button variant="contained" color="primary" onClick={() => crudPermission.onShowPopup({})}>
                        New Permssion
                    </Button>
                </Grid>
            </Grid>
            <Grid container className={globalStyle.pp2}>
                <ListGrid gridGap={20} minWidthItem="300px">
                    {crudPermission.pagingList.rows?.map((item) => (
                        <Grid className={classes.rootPermissionItem}>
                            <Grid container justify="space-between">
                                <Grid>
                                    <Typography>{item.method}</Typography>
                                </Grid>
                                <Grid>
                                    <IconButton color="primary" onClick={() => crudPermission.onShowPopup(item)}>
                                        <AiOutlineEdit />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            crudPermission.onConfirm(item);
                                        }}
                                    >
                                        <IoCloseOutline />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Typography color="primary">{item.name}</Typography>
                            <Typography variant="caption">{item.path}</Typography>
                        </Grid>
                    ))}
                </ListGrid>
            </Grid>
        </Grid>
    );
}

export default React.memo(PermissionContainer);
