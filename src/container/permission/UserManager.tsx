import {
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ListFilter } from 'luong-base-model/lib';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import { StatisticByUserHm } from 'src/afi-manager-base-model/controllers/IOrderTrackingController';
import { UserAccount } from 'src/afi-manager-base-model/model/User';
import PopUpConfirm from 'src/component/common/PopupConfirm';
import TableCrud, { ColumnTable } from 'src/component/common/TableCrud';
import PopupUserAccount from 'src/component/permssion/PopupUserAccount';
import { orderTrackingController, userController } from 'src/controller';
import { useCrudHook } from 'src/hook/useCrudHook';
import theme from 'src/theme/MuiTheme';

export default function UserManager() {
    const [column, setColumn] = useState<ColumnTable<UserAccount>[]>([
        {
            id: 'username',
            label: 'User Name',
        },
        {
            id: 'fullName',
            label: 'Full Name',
            isSort: true,
        },
        {
            id: 'email',
            label: 'Email',
            isSort: true,
        },
        {
            id: 'phoneNumber',
            label: 'Phone',
            isSort: true,
        },
        {
            id: 'action' as any,
            label: 'Action',
        },
    ]);
    const crudUserAccount = useCrudHook<UserAccount>({
        controller: userController,
        listController: userController.listUserForAdmin,
        saveController: userController.saveUserForAdmin,
        initQuery: {
            pageSize: 50,
            searchFields: ['fullName', 'phoneNumber'],
        },
    });

    const actionCpn = (item: UserAccount): React.ReactElement => {
        return (
            <Grid>
                <IconButton color="primary" onClick={() => crudUserAccount.onShowPopup(item)}>
                    <AiOutlineEdit />
                </IconButton>
                <IconButton
                    style={{
                        color: theme.palette.error.main,
                    }}
                    onClick={() => {
                        crudUserAccount.onConfirm(item);
                    }}
                >
                    <IoCloseOutline />
                </IconButton>
            </Grid>
        );
    };

    return (
        <Grid
            style={{
                padding: theme.spacing(1),
            }}
        >
            <PopupUserAccount
                isDisplay={crudUserAccount.isShowPopup}
                item={crudUserAccount.itemSelected}
                onCancel={crudUserAccount.onCancelPopup}
                onEdit={crudUserAccount.onSave}
            />
            <PopUpConfirm
                isDisplay={crudUserAccount.isShowConfirm}
                onCancel={crudUserAccount.onCancelConfirm}
                onConfirm={() => crudUserAccount.onDelete(crudUserAccount.itemSelected)}
            />
            <Grid
                style={{
                    background: theme.palette.background.paper,
                    padding: theme.spacing(6),
                }}
                container
            >
                <Grid item xs={12} container justify="space-between">
                    <Typography variant="h4">User</Typography>
                    <Button variant="contained" color="primary" onClick={(e) => crudUserAccount.onShowPopup({})}>
                        Thêm mới
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TableCrud<UserAccount>
                        column={column}
                        data={crudUserAccount.pagingList}
                        onQuery={(query) => {
                            crudUserAccount.setQuery({
                                ...crudUserAccount.query,
                                ...query,
                            });
                        }}
                        pageSize={[50, 100, 200, 500]}
                        isShowHighlightText={true}
                        query={crudUserAccount.query}
                        onCustomerCell={(item) => {
                            return {
                                ...item,
                                action: actionCpn(item),
                            };
                        }}
                    ></TableCrud>
                </Grid>
            </Grid>
        </Grid>
    );
}
