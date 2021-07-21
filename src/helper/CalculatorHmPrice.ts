export const calcBuyPrice = (price: number) =>
    price > 5
        ? Math.ceil((price - 3 - price * 0.25) * 100) / 100
        : price >= 4
        ? price - 3
        : -1;
