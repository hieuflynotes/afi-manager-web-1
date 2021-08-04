import { OrderTracking, ProductOrder } from 'src/afi-manager-base-model/model/OrderTracking';

export const calcBuyPrice = (price: number) =>
    price >= 6
        ? Math.round((price - 3 - price * 0.25) * 100) / 100
        : price > 5
        ? Math.round((price - 3 - (price - 3) * 0.25) * 100) / 100
        : price >= 4
        ? Math.round((price - 3) * 100) / 100
        : -1;

export const calcBuyPriceOrder = (products: ProductOrder[]) => {
    if(!products || products.length===0)
        return 0;
    if(products.length===1)
        return calcBuyPrice(products[0].price || 0)
    
    if(products.length===2){
        const maxPriceProduct = ((products[0].price || 0)>(products[1].price||0)?products[0].price : products[1].price) || 0;
        const minPriceProduct = ((products[0].price || 0)<(products[1].price||0)?products[0].price : products[1].price) || 0;
        return maxPriceProduct*0.75 + Math.max(minPriceProduct - 3, 0);
    }
    return calcBuyPrice(products.map(p => p.price || 0).reduce((item , sum )=> sum + item,0 ))
}

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

console.log('calcBuyPrice', calcBuyPrice(4.99))