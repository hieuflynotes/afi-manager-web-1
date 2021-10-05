import { OrderTracking, ProductOrder } from 'src/afi-manager-base-model/model/OrderTracking';
import { mathCeilWithRound } from './NumberUtils';
import { StringUtil } from './StringUtil';

export enum OrderStatus {
    completed = 'Completed',
    error = 'Error',
}

export const calcBuyPrice = (price: number) =>
    price > 12
        ? Math.round((price - 3 - price * 0.25) * 100) / 100
        : (price >= 7 && price <=12 )
        ? Math.round((price - 6) * 100) / 100
        : price >= 5.99
        ? Math.round((price - 3 - price * 0.25) * 100) / 100
        : price > 5
        ? Math.round((price - 3 - (price - 3) * 0.25) * 100) / 100
        : price >= 4
        ? Math.round((price - 3) * 100) / 100
        : price;

export const getProductStatus = (product: ProductOrder, order: OrderTracking): OrderStatus => {
    return StringUtil.nullOrEmpty(order.orderId)
        ? OrderStatus.error
        : StringUtil.nullOrEmpty(order.errorDesc)
        ? OrderStatus.completed
        : (order.productOrder?.length || 0) <= 1
        ? OrderStatus.completed
        : order.errorDesc?.includes(`${product.productId}: ${product.size}`)
        ? OrderStatus.error
        : OrderStatus.completed;
};

export const calcBuyPriceOrder = (products: ProductOrder[]) => {
    // let totalPrice = products.map((p) => p.price || 0).reduce((p, sum) => (sum = sum + p), 0);    
    // if (totalPrice <= 5) return calcBuyPrice(totalPrice);

    products = products
        .map((p) => Array.from(new Array(p.quantity)).map((i) => p))
        .reduce((arr, sumArr) => sumArr.concat(arr), []);

    if (!products || products.length === 0) return 0;
    if (products.length === 1) return calcBuyPrice(products[0].price || 0);
    
    if (products.length === 2) {
        const priceP1 = products[0].price || 0;
        const priceP2 = products[1].price || 0;

        if(priceP1+priceP2 >= 7 && priceP1 + priceP2< 12) 
            return calcBuyPrice(products.map((p) => p.price || 0).reduce((item, sum) => sum + item, 0));

        let result = mathCeilWithRound((priceP1+priceP2>5)?Math.min(priceP1 * 0.75 + priceP2 - 3, priceP2 * 0.75 + priceP1 - 3):(priceP1+priceP2-3), 2);
        console.log({ priceP1, priceP2, result });
        return result;
    }
    return calcBuyPrice(products.map((p) => p.price || 0).reduce((item, sum) => sum + item, 0));
};

export const countProduct = (orders: OrderTracking[]) =>
    orders
        ?.map((r) => r.productOrder?.map((p) => p.quantity || 1).reduce((i, sum) => (sum += i), 0))
        .reduce((i, sum) => (sum = (sum || 0) + (i || 0)), 0) || 0;

export const countBoughtProduct = (orders: OrderTracking[]) =>
    orders
        ?.filter((r) => r.orderId != null && r.orderId.length > 0)
        .map((r) => {
            const countProd = r.productOrder?.map((p) => p.quantity || 1).reduce((i, sum) => (sum += i), 0) || 1;
            if (r.errorDesc != null && r.errorDesc.length > 0) return countProd - 1;
            return countProd;
        })
        .reduce((i, sum) => (sum = (sum || 0) + (i || 0)), 0) || 0;

export const totalCompletedAmount = (orders: OrderTracking[]) => {
    return mathCeilWithRound(
        orders
            ?.filter((i) => i.orderId != null && i.orderId.length > 0)
            .map(
                (o) =>
                    o.productOrder
                        ?.map((p) => Array.from(new Array(p.quantity || 1)).map((_) => ({ ...p, quantity: 1 })))
                        .reduce((p, arr) => (arr = arr.concat(p)), [])
                        ?.map((p) => {
                            let status = getProductStatus(p, o);
                            if (status === OrderStatus.completed) return p.price || 0;
                            return 0;
                        })
                        .reduce((price, total) => (total += price), 0) || 0,
            )
            .reduce((price, total) => (total += price), 0) || 0,
        2,
    );
};

export const totalAmount = (orders: OrderTracking[]) => {
    return mathCeilWithRound(
        orders?.map((r) => r.totalPrice || 0).reduce((price, total) => (total += price), 0) || 0,
        2,
    );
};
