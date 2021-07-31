import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Typography, IconButton, FormControlLabel, Checkbox } from '@material-ui/core';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'src/component/common/Button';
import ListGrid from 'src/component/common/ListGrid';
import PopUpConfirm from 'src/component/common/PopupConfirm';
import TextField from 'src/component/common/TextFiled';
import PopupPermssion from 'src/component/permssion/PopupPermssion';
import { permssionController, roleController } from 'src/controller';
import { useCrudHook } from 'src/hook/useCrudHook';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import clsx from 'clsx';
import { Permission, Role } from 'luong-base-model/lib';
import { validate as validateUuid } from 'uuid';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import _ from 'lodash';
import { MetaDataRole } from 'src/afi-manager-base-model/model/MetaDataRolePermision';
type Props = {};
const useStyle = makeStyles((theme) => ({
    rootPermissionItem: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(1),
        padding: theme.spacing(2),
    },
}));
type State = {
    permssion: Permission[];
};

const validate = Yup.object({
    name: Yup.string()
        .max(100, 'Value must be less than 100 characters')
        .required("Can't be left blank !!")
        .trim()
        .nullable(),
    redirect: Yup.string().required("Can't be left blank !!").trim().nullable(),
});

function SetupRoleContainer(props: Props) {
    const { id } = useParams<{ id: string }>();

    const formik = useFormik<Role<MetaDataRole> & { redirect?: string }>({
        initialValues: {} as Permission,
        validationSchema: validate,
        onSubmit: () => {
            roleController
                .save({
                    ...formik.values,
                    permission: Array.from(role.roleSelect.values()),
                    metaData: {
                        ...formik.values.metaData,
                        redirect: formik.values.redirect,
                    },
                })
                .then((res) => {
                    history.push(`/role/${res.id}`);
                });
        },
    });
    const onSubmit = () => {
        formik.handleSubmit();
        const touch = {
            redirect: true,
            name: true,
        };
        formik.setTouched(touch);
    };

    const history = useHistory();
    const [role, setRole] = useState<{
        role: Role;
        roleSelect: Map<string, Permission>;
    }>({
        role: {},
        roleSelect: new Map(),
    });
    const crudPermission = useCrudHook({
        controller: permssionController,
        initQuery: {
            pageSize: 100,
        },
    });
    const classes = useStyle();
    const globalStyle = useGlobalStyles();
    const [state, setState] = useState<State>({
        permssion: [],
    });

    useEffect(() => {
        if (validateUuid(id)) {
            roleController
                .getById({
                    id: id,
                })
                .then((res) => {
                    if (res) {
                        setRole({
                            ...role,
                            role: res || {},
                            roleSelect: new Map<string, Permission>(
                                res && res.permission?.map((item) => [item.id || '', item]),
                            ),
                        });
                        formik.setValues({
                            ...res,
                            redirect: res.metaData?.redirect,
                        });
                    }
                });
        }
        permssionController.find({}).then((res) => {
            setState({
                permssion: res,
            });
        });
    }, []);

    return (
        <Grid container className={globalStyle.pp2}>
            <Grid container justify="center" className={globalStyle.pp2}>
                <Typography variant="h5">Setup Role</Typography>
            </Grid>
            <Grid container justify="flex-end" className={globalStyle.pb2}>
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
            <Grid container justify="space-between">
                <Grid xs={5}>
                    <TextField
                        variant="outlined"
                        color="primary"
                        fullWidth
                        label="Name Role"
                        name="name"
                        value={role.role.name}
                        error={Boolean(formik.touched.name && formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        onChange={formik.handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid xs={5}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        color="primary"
                        label="Path redirect"
                        name="redirect"
                        value={formik.values.redirect}
                        error={Boolean(formik.touched.redirect && formik.errors.redirect)}
                        helperText={formik.touched.redirect && formik.errors.redirect}
                        onChange={formik.handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            </Grid>
            <Grid container className={clsx(globalStyle.pp2, globalStyle.pt5)}>
                <ListGrid minWidthItem="200px" heightItem={'100px'} gridGap={20}>
                    {state.permssion.map((item) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Boolean(role.roleSelect.get(item.id || ''))}
                                    onChange={(e, checked) => {
                                        const getNowSelect = role.roleSelect;
                                        if (checked) {
                                            getNowSelect.set(item.id || '', item);
                                        } else {
                                            getNowSelect.delete(item.id || '');
                                        }
                                        setRole({
                                            ...role,
                                            roleSelect: getNowSelect,
                                        });
                                    }}
                                />
                            }
                            label={`${item.method} - ${item.name}`}
                        />
                    ))}
                </ListGrid>
            </Grid>
        </Grid>
    );
}

export default React.memo(SetupRoleContainer);
