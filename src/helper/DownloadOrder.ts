import { OrderTracking } from 'src/afi-manager-base-model/model/OrderTracking';
import {
    countBoughtProduct,
    countProduct,
    getProductStatus,
    OrderStatus,
    totalAmount,
    totalCompletedAmount,
} from './CalculatorHmPrice';
import { downloadCSV } from './DownloadUtils';

export interface ExportOrderModel {
    status: OrderStatus | string;
    error: string;
    productId: string;
    size: string;
    price: string;
    orderId: string;
}

export const orderToCSVModel = (orders: OrderTracking[]) => {
    return orders
        .map((o) =>
            o.productOrder
                ?.map((p) => Array.from(new Array(p.quantity || 1)).map((_) => ({ ...p, quantity: 1 })))
                .reduce((p, arr) => (arr = arr.concat(p)), [])
                .map((p) => {
                    let status = getProductStatus(p, o);
                    return {
                        productId: p.productId,
                        size: p.size,
                        price: p.price || '',
                        orderId: o.orderId || '',
                        status,
                        error: status === 'Error' && o.errorDesc ? o.errorDesc : '',
                    } as ExportOrderModel;
                }),
        )
        .reduce((products, arr) => arr?.concat(products || []), []);
};

export const downloadOrders = (orders: OrderTracking[]) => {
    let orderCSV = orderToCSVModel(orders) || [];
    let csv = [];
    csv.push({
        label: 'Total items',
        value: countProduct(orders),
    });

    csv.push({
        label: 'Total completed items',
        value: countBoughtProduct(orders),
    });

    csv.push({
        label: 'Total amount',
        value: totalAmount(orders),
    });

    csv.push({
        label: 'Total completed amount',
        value: totalCompletedAmount(orders),
    });

    csv.push({});

    csv.push({
        productId: 'Variant / Product ID',
        size: 'Size',
        price: 'Price',
        orderId: 'Order Number',
        status: 'Status',
        error: 'Note',
    } as ExportOrderModel);

    csv = csv.concat(orderCSV);

    downloadCSV(csv, orders && orders.length > 0 && orders[0].userHM ? orders[0].userHM.username : undefined);
};
