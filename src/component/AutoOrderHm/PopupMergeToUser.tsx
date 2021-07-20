/* eslint-disable react-hooks/exhaustive-deps */

import { Button, FormControlLabel, FormGroup, Grid, Switch, TextField } from '@material-ui/core';
import clsx from 'clsx';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import SelectBox from '../common/SelectBox';
import * as Yup from 'yup';
import BaseDialog from '../common/BaseDialog';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { UserHm } from 'src/afi-manager-base-model/model/UserHm';
import { User } from 'src/afi-manager-base-model/model/User';
import { userController } from 'src/controller';
import { Autocomplete } from '@material-ui/lab';

type Props = {
    isDisplay: boolean;
    item: { userHmId?: string; userId?: string };
    onEdit: (item: { userHmId?: string; userId?: string }) => void;
    onCancel: () => void;
};
const validate = Yup.object({});

export default function PopupMergeToUser(props: Props) {
    const formik = useFormik<{ userHmId?: string; userId?: string }>({
        initialValues: {},
        validationSchema: validate,
        onSubmit: () => {
            props.onEdit({
                ...formik.values,
            });
        },
    });
    const [user, setUser] = useState<Map<string, User>>(new Map<string, User>());
    const onSubmit = () => {
        formik.handleSubmit();
    };

    useEffect(() => {
        if (props.isDisplay) {
            formik.setValues(
                _.cloneDeep({
                    ...props.item,
                }),
            );

            userController.find({}).then((res) => {
                setUser(new Map(res.map((item) => [item.id || '', item])));
            });
        }
    }, [props]);

    const globalStyles = useGlobalStyles();
    return (
        <Grid>
            <BaseDialog
                isDisplay={props.isDisplay}
                onCancel={props.onCancel}
                onClickConfirm={() => {
                    onSubmit();
                }}
                title="User HM"
            >
                <Grid container direction="column" justify="space-around">
                    <Grid>
                        <Autocomplete
                            options={Array.from(user.values())}
                            getOptionLabel={(option) => option.email || 'Lỗi email'}
                            onChange={(e, value) => {
                                formik.setValues({
                                    ...formik.values,
                                    userId: value?.id,
                                });
                            }}
                            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                        />
                    </Grid>
                </Grid>
            </BaseDialog>
        </Grid>
    );
}
