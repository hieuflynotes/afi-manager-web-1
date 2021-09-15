export const mathCeilWithRound = (n: number, decimal: number) => {
    return Math.ceil(n * Math.pow(10, decimal)) / Math.pow(10, decimal);
};
