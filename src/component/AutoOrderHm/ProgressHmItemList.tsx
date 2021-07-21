import React, { useEffect } from "react";
import clsx from "clsx";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useGlobalStyles } from "../../theme/GlobalStyle";
import { IoCopyOutline, IoCreateOutline } from "react-icons/io5";
import { IconButton } from "@material-ui/core";
import TextDesc from "../common/TextDesc";
import { OrderTracking } from "src/afi-manager-base-model/model/OrderTracking";
import theme from "src/theme/MuiTheme";
import { checkoutCode } from "src/constants/IMacros";
import { dispatch } from "../../rematch/store";
import { Giftcard } from "../../container/hm-manager/ProgressAutoOrder";
import { calcBuyPrice } from "src/helper/CalculatorHmPrice";
type Props = {
    item: OrderTracking;
    giftCard: Giftcard;
    updateOrderId: (item: OrderTracking) => void;
};
const useStyle = makeStyles((theme) => ({
    root: {
        borderRadius: theme.spacing(1),
    },
    lessThan5: {
        border: `1px solid ${theme.palette.success.main}`,
    },
    greaterThan5: {
        border: `1px solid ${theme.palette.primary.main}`,
    },
    nameUserHm: {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        padding: theme.spacing(2),
        position: "relative",
    },
    frInfo: {
        padding: theme.spacing(2),
    },
    frIconClose: {
        position: "absolute",
        top: 1,
        right: theme.spacing(2),
        fontSize: "1.2rem",
        color: theme.palette.error.main,
    },
    iconClose: {
        color: theme.palette.error.main,
    },
}));
function ProgressHmItemList(props: Props) {
    const classes = useStyle();
    const globalStyle = useGlobalStyles();

    const getStatus = (item: OrderTracking) => {
        if (!item.isRegister) {
            return "Khởi tạo";
        }
        if (item.isRegister && !item.isOrder) {
            return "Đã tạo tài khoản";
        }
        if (item.isOrder && item.orderId) {
            return "Đã thanh toán";
        }
        if (item.isOrder) {
            return "Đã thêm vào giỏ hàng";
        }
    };
    useEffect(() => {
        return () => {};
    }, []);

    return (
        <Grid
            container
            justify="center"
            className={`${classes.root} ${
                props.item.totalPrice && props.item.totalPrice > 5
                    ? classes.greaterThan5
                    : classes.lessThan5
            }`}
        >
            <Grid
                container
                justify="space-between"
                alignItems="center"
                className={clsx(classes.nameUserHm)}
            >
                <Typography variant="body2">{getStatus(props.item)}</Typography>
                <Grid>
                    <IconButton
                        onClick={() => {
                            navigator.clipboard.writeText(
                                checkoutCode(
                                    props.item.email || "email@gmail.com",
                                    props.item.userHM?.password || "123456a@",
                                    props.giftCard.serialNumber,
                                    props.giftCard.pin,
                                    Number(props.item.totalPrice || "0")
                                )
                            );
                            dispatch.notification.success(
                                "Copy to clipboard successfully!"
                            );
                        }}
                        size="small"
                    >
                        <IoCopyOutline />
                    </IconButton>

                    <IconButton
                        onClick={() => {
                            props.updateOrderId(props.item);
                        }}
                        size="small"
                        color="primary"
                    >
                        <IoCreateOutline />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container className={clsx(classes.frInfo)}>
                {props.item.errorDesc && (
                    <Grid
                        container
                        style={{
                            color: theme.palette.error.main,
                        }}
                    >
                        <TextDesc
                            title={"Lỗi"}
                            desc={props.item.errorDesc || ""}
                        />
                    </Grid>
                )}
                <TextDesc
                    title={"OrderId"}
                    desc={
                        props.item.orderId == "1"
                            ? "Rỗng"
                            : props.item.orderId || "   "
                    }
                />
                <TextDesc
                    title={"Tổng giá"}
                    desc={`${props.item.totalPrice}` || ""}
                />
                <TextDesc
                    title={"Phải trả"}
                    desc={
                        `${calcBuyPrice(props.item.totalPrice || 0)}` || ""
                    }
                />
                <TextDesc title={"Email"} desc={props.item.email || ""} />
                <TextDesc
                    title={"Password"}
                    desc={props.item.userHM?.password || ""}
                />
            </Grid>
            {props.item.productOrder &&
                props.item.productOrder.map((item) => (
                    <Grid container className={clsx(classes.frInfo)}>
                        <TextDesc
                            title={"Id sản phẩm"}
                            desc={item.productId || ""}
                        />
                        {(item.quantity || 0) > 1 && (
                            <TextDesc
                                title={"Số lượng"}
                                desc={item.quantity?.toString() || ""}
                            />
                        )}
                        <TextDesc title={"Size"} desc={item.size || ""} />
                        <TextDesc
                            title={"Giá gốc"}
                            desc={item.price?.toString() || ""}
                        />
                        <TextDesc
                            title={"Giá mua"}
                            desc={
                                calcBuyPrice(item.price || 0).toString() || ""
                            }
                        />
                    </Grid>
                ))}
        </Grid>
    );
}

export default React.memo(ProgressHmItemList);
