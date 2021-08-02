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
import { permssionController, roleController } from 'src/controller';
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

function RoleContainer(props: Props) {
    const history = useHistory();
    const crudRole = useCrudHook({
        controller: roleController,
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
                <Typography variant="h5">Role</Typography>
            </Grid>
            <Grid container justify="space-between">
                <Grid className={globalStyle.pp2}>
                    <TextField variant="outlined" label="Search" />
                </Grid>
                <Grid className={globalStyle.pp2}>
                    <Button variant="contained" color="primary" onClick={() => history.push(`role/create`)}>
                        New Role
                    </Button>
                </Grid>
            </Grid>
            <Grid container className={globalStyle.pp2}>
                <ListGrid gridGap={20} minWidthItem="300px">
                    {crudRole.pagingList.rows?.map((item) => (
                        <Grid className={classes.rootPermissionItem}>
                            <Grid container justify="space-between" alignItems="center">
                                <Grid>
                                    <Typography variant="h6">{item.name}</Typography>
                                </Grid>
                                <Grid>
                                    <IconButton color="primary" onClick={() => history.push(`role/${item.id}`)}>
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

export default React.memo(RoleContainer);
