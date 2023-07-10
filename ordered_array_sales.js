const sales = [
    { amount: 10000, quantity: 10 },
    { amount: 5000, quantity: 5 },
    { amount: 20000, quantity: 2 }
];

function getorderedSales(sales) {
    const orderedSales = sales.map(sale => ({
        amount: sale.amount,
        quantity: sale.quantity,
        Total: sale.amount * sale.quantity
    })).sort((a, b) => a.Total - b.Total);


    return orderedSales;
}

console.log(getorderedSales(sales));