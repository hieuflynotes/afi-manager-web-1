import { OrderTracking } from 'src/afi-manager-base-model/model/OrderTracking';

export const calcBuyPrice = (price: number) =>
    price > 6
        ? Math.ceil((price - 3 - price * 0.25) * 100) / 100
        : price > 5
        ? Math.ceil((price - 3 - (price - 3) * 0.25) * 100) / 100
        : price >= 4
        ? Math.ceil((price - 3) * 100) / 100
        : -1;

export const countProduct = (orders: OrderTracking[]) =>
    orders
        ?.map((r) => r.productOrder?.map((p) => 1).reduce((i, sum) => (sum += i), 0))
        .reduce((i, sum) => (sum = (sum || 0) + (i || 0)), 0) || 0;

export const countBoughtProduct = (orders: OrderTracking[]) =>
    orders
        ?.filter((r) => r.orderId != null && r.orderId.length > 0)
        .map((r) => {
            const countProd = r.productOrder?.map((p) => 1).reduce((i, sum) => (sum += i), 0) || 1;
            if (r.errorDesc != null && r.errorDesc.length > 0) return countProd - 1;
            return countProd;
        })
        .reduce((i, sum) => (sum = (sum || 0) + (i || 0)), 0) || 0;
