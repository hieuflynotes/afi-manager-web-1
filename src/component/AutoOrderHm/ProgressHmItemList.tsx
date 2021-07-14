import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useGlobalStyles } from "../../theme/GlobalStyle";
import { IoClose } from "react-icons/io5";
import { IconButton } from "@material-ui/core";
import { UserHm } from "src/afi-manager-base-model/model/UserHm";
import TextDesc from "../common/TextDesc";
import { OrderTracking } from "src/afi-manager-base-model/model/OrderTracking";

type Props = {
    item: OrderTracking;
    updateOrderId: (item: OrderTracking) => void;
};
const useStyle = makeStyles((theme) => ({
    root: {
        width: 400,
        borderRadius: theme.spacing(1),
        border: `1px solid ${theme.palette.divider}`,
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
    const [state, setState] = useState();
    const globalStyle = useGlobalStyles();
    const getStatus = (item: OrderTracking) => {
        if (!item.isRegister) {
            return "Order này chưa được tạo tài khoản";
        }
        if (item.isRegister && !item.isOrder) {
            return "Order này chưa tiến hành order";
        }
        if (item.isOrder && item.orderId) {
            return "Sản phẩm đã được thanh toán, Liên hệ với Lương để phát triển thêm... Cảm ơn";
        }
        if (item.isOrder) {
            return "Order này đã đựợc order sẵn, Đợi thanh toán";
        }
    };
    useEffect(() => {
        return () => {};
    }, []);

    return (
        <Grid container justify="center" className={clsx(classes.root)}>
            <Grid
                container
                justify="center"
                className={clsx(classes.nameUserHm)}
            >
                <Typography variant="body2">{getStatus(props.item)}</Typography>
            </Grid>
            <Grid container className={clsx(classes.frInfo)}>
                {props.item.errorDesc && (
                    <TextDesc title={"Lỗi"} desc={props.item.errorDesc || ""} />
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
                    title={"Tổng chi gift"}
                    desc={`${props.item.totalPriceBuy}` || ""}
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
                            desc={item.buyPrice?.toString() || ""}
                        />
                    </Grid>
                ))}
            {props.item.isOrder && (
                <Grid
                    container
                    justify="space-between"
                    className={clsx(globalStyle.pp2)}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => props.updateOrderId(props.item)}
                    >
                        Edit
                    </Button>
                </Grid>
            )}
        </Grid>
    );
}

export default React.memo(ProgressHmItemList);
