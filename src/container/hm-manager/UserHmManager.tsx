import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Grid, makeStyles, Typography, Zoom } from '@material-ui/core';
import TextField from '../../component/common/TextFiled';
import Button from '../../component/common/Button';
import ListGrid from '../../component/common/ListGrid';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { useCrudHook } from '../../hook/useCrudHook';
import { Pagination } from '@material-ui/lab';
import PopUpConfirm from '../../component/common/PopupConfirm';
import { useHistory } from 'react-router-dom';
import { UserHm } from 'src/afi-manager-base-model/model/UserHm';
import { orderTrackingController, userHmController } from 'src/controller';
import UserHmItemList from 'src/component/AutoOrderHm/UserHmItemList';
import PopupInsertUser from 'src/component/AutoOrderHm/PopupInsertUser';
import theme from 'src/theme/MuiTheme';
import { handleWithPopupHook } from 'src/hook/HandleWithPopupHook';
import PopupMergeToUser from 'src/component/AutoOrderHm/PopupMergeToUser';
import { OrderTracking } from 'src/afi-manager-base-model/model/OrderTracking';
import SelectBox from 'src/component/common/SelectBox';
import DialogShowImage from './DialogShowImage';

type Props = {};
const useStyle = makeStyles((theme) => ({}));
function UserHmManager(props: Props) {
    const history = useHistory();

    const crudCompany = useCrudHook<UserHm>({
        controller: userHmController,
        initQuery: {
            pageSize: 50,
        },
    });
    const [showPopupImage, setShowPopupImage] = useState<{
        img: string;
        isDisplay: boolean;
    }>({
        img: '',
        isDisplay: false,
    });
    const classes = useStyle();
    const globalStyle = useGlobalStyles();
    const [state, setState] = useState();
    useEffect(() => {
        return () => {};
    }, []);

    return (
        <Grid
            container
            style={{
                minHeight: '100vh',
                background: 'white',
                padding: theme.spacing(2),
            }}
        >
            <DialogShowImage
                isDisplay={showPopupImage?.isDisplay}
                linkImage={showPopupImage?.img}
                onCancel={() => {
                    setShowPopupImage({
                        img: '',
                        isDisplay: false,
                    });
                }}
            />
            <Grid container justify="center" className={clsx(globalStyle.pp2)}>
                <PopUpConfirm
                    isDisplay={crudCompany.isShowConfirm}
                    onCancel={crudCompany.onCancelConfirm}
                    onConfirm={() => crudCompany.onDelete(crudCompany.itemSelected)}
                />

                <PopupInsertUser
                    isDisplay={crudCompany.isShowPopup}
                    item={crudCompany.itemSelected}
                    onCancel={crudCompany.onCancelPopup}
                    onEdit={crudCompany.onSave}
                />
                <Grid md={10}>
                    <Grid container justify="center" className={globalStyle.pb2}>
                        <Typography align="center" variant="h4">
                            Danh sách đơn hàng
                        </Typography>
                    </Grid>
                    <Grid container justify="space-between">
                        {/* <TextField
                            onChange={(e) =>
                                crudCompany.onQueryChanged(e.target.value)
                            }
                            className={clsx(globalStyle.mt2, globalStyle.mb2)}
                            label="search"
                            variant="outlined"
                        ></TextField> */}
                        <SelectBox
                            data={['Tất cả', 'Đã chạy tool', 'Chưa chạy tool']}
                            labelOption={(op) => op}
                            variant="outlined"
                            label="Filter"
                            fullWidth
                            // inputLabelProps={{
                            //     shrink: true,
                            // }}
                            valueOption={(value) => value}
                            onChange={(e: any) => {
                                switch (e) {
                                    case 'Đã chạy tool':
                                        crudCompany.setFilter({
                                            isDone: true,
                                        });
                                        break;
                                    case 'Chưa chạy tool':
                                        crudCompany.setFilter({
                                            isDone: [false, null as any],
                                        });
                                        break;
                                    default:
                                        crudCompany.setFilter({});
                                        break;
                                }
                            }}
                        />
                        <TextField
                            style={{ marginTop: 24 }}
                            fullWidth
                            variant="outlined"
                            placeholder="Tìm theo username, email, note"
                            value={crudCompany.query?.search}
                            onChange={(e) => {
                                crudCompany.setQuery({
                                    search: e.target.value.trim(),
                                    searchFields: ['note', 'username', 'emailCheckout'],
                                });
                            }}
                            className={clsx(globalStyle.mt2, globalStyle.mb2)}
                        ></TextField>
                        <Button
                            // className={clsx(globalStyle.mt2, globalStyle.mb2)}
                            variant="contained"
                            color="primary"
                            onClick={() => crudCompany.onShowPopup({})}
                        >
                            Tạo Order Hm
                        </Button>
                    </Grid>
                    <Grid
                        container
                        // justify="center"
                        className={clsx(globalStyle.pt2, globalStyle.pb2)}
                    >
                        <ListGrid minWidthItem={'350px'} gridGap={20}>
                            {crudCompany.pagingList?.rows?.map((item, index) => (
                                <Zoom in={true} timeout={300}>
                                    <Grid>
                                        <UserHmItemList
                                            onSeeImge={(itemImg) => {
                                                if (itemImg.imgScreenShot) {
                                                    setShowPopupImage({
                                                        img: item.imgScreenShot || '',
                                                        isDisplay: true,
                                                    });
                                                }
                                            }}
                                            item={item}
                                            onDelete={crudCompany.onConfirm}
                                            onEdit={crudCompany.onShowPopup}
                                            onSeeDetail={(item) => {
                                                history.push(`/progress-order/${item.id}`);
                                            }}
                                        />
                                    </Grid>
                                </Zoom>
                            ))}
                        </ListGrid>
                    </Grid>
                    <Grid container className={clsx(globalStyle.pt2, globalStyle.pb2)}>
                        <Pagination
                            count={crudCompany.pagingList.totalPages || 1}
                            page={crudCompany.pagingList.page || 1}
                            onChange={(e, page) => {
                                crudCompany.setQuery({
                                    ...crudCompany.query,
                                    page: page,
                                });
                            }}
                            color="primary"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default React.memo(UserHmManager);
