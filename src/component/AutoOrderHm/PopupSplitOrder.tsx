/* eslint-disable react-hooks/exhaustive-deps */

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { OrderTracking, ProductOrder } from 'src/afi-manager-base-model/model/OrderTracking';
import { mathCeilWithRound } from 'src/helper/NumberUtils';
import * as Yup from 'yup';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { v4 as uuid } from 'uuid';
import theme from 'src/theme/MuiTheme';

type Props = {
    isDisplay: boolean;
    item: OrderTracking;
    onSplitWithMerge: (params: {
        orderTrackingOld: OrderTracking;
        orderTrackingNew: OrderTracking;
        productOrder: ProductOrder;
    }) => void;
    onSplitWithNew: (params: { orderTrackingOld: OrderTracking; productOrder: ProductOrder }) => void;
    orderTrackings: OrderTracking[];
    onCancel: () => void;
};
export default function PopupSplitOrder(props: Props) {
    const [state, setState] = useState<{
        flatItemProductOrder: ProductOrder[];
        productSelected: ProductOrder;
        orderWillSplitTo?: OrderTracking;
    }>({
        flatItemProductOrder: [],
        productSelected: {},
    });
    useEffect(() => {
        if (props.isDisplay) {
            const flatProduct: ProductOrder[] = [];
            props.item.productOrder?.forEach((item) => {
                for (let i = 0; i < (item?.quantity || 0); i++) {
                    flatProduct.push({
                        ...item,
                        quantity: 1,
                        id: uuid(),
                    });
                }
            });
            setState({
                ...state,
                flatItemProductOrder: flatProduct,
                productSelected: flatProduct[0],
                orderWillSplitTo: checkOrderCanMerge(props.orderTrackings),
            });
        }
    }, [props]);

    const checkOrderCanMerge = (orderTrackings: OrderTracking[]): OrderTracking | undefined => {
        let orderSelected: OrderTracking | undefined = undefined;
        orderTrackings.forEach((item) => {
            if (!item.orderId && item.id != props.item.id) {
                if (!orderSelected) {
                    orderSelected = item;
                }
                if (mathCeilWithRound(item.totalPrice || 0, 2) < mathCeilWithRound(orderSelected.totalPrice || 0, 2)) {
                    orderSelected = item;
                }
            }
        });
        return orderSelected;
    };

    const handleClickSplitNewOrder = () => {
        props.onSplitWithNew({
            orderTrackingOld: props.item,
            productOrder: state.productSelected,
        });
    };

    const handleClickSplitWithMergeOrder = () => {
        props.onSplitWithMerge({
            orderTrackingOld: props.item,
            productOrder: state.productSelected,
            orderTrackingNew: state.orderWillSplitTo || {},
        });
    };

    const globalStyles = useGlobalStyles();
    return (
        <Dialog open={props.isDisplay} fullWidth>
            <Grid className={clsx(globalStyles.pp3)}>
                <Grid>
                    <DialogTitle>
                        <Grid item xs={12}>
                            <Typography variant="h5" color={'primary'} align={'center'}>
                                Tách order
                            </Typography>
                        </Grid>
                        <Box
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                            }}
                        >
                            <IconButton aria-label="close" onClick={props.onCancel}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </DialogTitle>
                </Grid>
                <DialogContent>
                    <Grid container xs={12} direction="column" className={clsx(globalStyles.mt1)}>
                        <Grid className={clsx(globalStyles.mt1, globalStyles.mb2)}>
                            <Typography variant="h6" color="error">
                                Lưu ý (Đọc kỹ trước mỗi lần sử dụng)
                            </Typography>
                            <Typography>
                                * Cả 2 sản phẩm có trở lại không (nếu có hãy thực hiện checkout không cần tách)
                            </Typography>
                            <Typography>* Sản phẩm cần tách đã thực sự có lại chưa (Kiểm tra cả size)</Typography>
                            <Typography>* Sau khi tách hãy gọi đội chạy tool để chạy lại cho đơn hàng này</Typography>
                            <Typography color="error">
                                * Sau khi tách đơn không thể trở lại ban đầu,vui lòng cân nhắc khi sử dụng
                            </Typography>
                        </Grid>
                        <Grid>
                            <FormControl>
                                <FormLabel>Chọn sản phẩm cần tách</FormLabel>
                                <RadioGroup
                                    value={JSON.stringify(state.productSelected)}
                                    onChange={(e, value) => {
                                        if (value) {
                                            setState({
                                                ...state,
                                                productSelected: JSON.parse(value),
                                            });
                                        }
                                    }}
                                >
                                    {state.flatItemProductOrder.map((item) => {
                                        return (
                                            <FormControlLabel
                                                value={JSON.stringify(item)}
                                                control={<Radio />}
                                                label={`${item.productId} - Size: ${item.size}`}
                                            />
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid>
                            {!state.orderWillSplitTo && (
                                <Grid>
                                    <Typography>Không tìm thấy order đủ điều kiện để merge vào</Typography>
                                </Grid>
                            )}
                            {state.orderWillSplitTo && (
                                <Grid className={clsx(globalStyles.pt1, globalStyles.pb1)}>
                                    <Typography color="secondary">
                                        Hệ thống sẽ tách tới : {state.orderWillSplitTo.email}
                                    </Typography>
                                    <Typography variant="caption">(Nếu chọn chuyển sang order khác)</Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
                <Grid className={clsx(globalStyles.ml2, globalStyles.mr2)}>
                    <DialogActions>
                        <Grid item container xs={12} justify={'space-between'}>
                            <Grid item container xs={5} justify={'center'} alignItems={'center'}>
                                <Button
                                    startIcon={<CloseIcon />}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    fullWidth
                                    onClick={() => {
                                        handleClickSplitNewOrder();
                                    }}
                                >
                                    Tạo mới một order
                                </Button>
                            </Grid>
                            <Grid item container xs={5} justify={'center'} alignItems={'center'}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    disabled={!state.orderWillSplitTo}
                                    fullWidth
                                    startIcon={<SaveIcon />}
                                    type={'submit'}
                                    onClick={() => {
                                        handleClickSplitWithMergeOrder();
                                    }}
                                    color="primary"
                                >
                                    Tách sang order khác
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Grid>
            </Grid>
        </Dialog>
    );
}
