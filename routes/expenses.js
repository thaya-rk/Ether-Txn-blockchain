const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const fetchPrice = require('../services/priceFetcher');
const { calculateTotalExpenses } = require('../utils/calculateExpenses');

// GET endpoint to get total expenses and current price of Ether
router.get('/expenses', async (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        // Fetch transactions from MongoDB
        const transactions = await Transaction.find({ address: address });

        // Calculate total expenses
        const totalExpenses = calculateTotalExpenses(transactions);

        // Fetch current price of Ether
        const priceData = await fetchPrice();
        const etherPrice = priceData.ethereum.inr;

        // Send the response
        res.json({
            address: address,
            totalExpenses: totalExpenses,
            currentPrice: etherPrice
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;