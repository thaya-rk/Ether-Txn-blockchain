
function calculateTotalExpenses(transactions) {
    return transactions.reduce((total, tx) => {
        // Convert gasUsed * gasPrice from Wei to Ether
        const expense = (tx.gasUsed * tx.gasPrice) / 1e18;
        return total + expense;
    }, 0);
}

module.exports = { calculateTotalExpenses };