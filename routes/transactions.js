const express = require('express');
const axios = require('axios');
const Transaction = require('../models/Transaction');

const router = express.Router();

// Route to fetch and store transactions
router.post('/transactions', async (req, res) => {
    const { address } = req.body;

    try {
        const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`);
        
        const transactions = response.data.result;
        
        if (transactions.length === 0) {
            return res.status(404).json({ error: "No transactions found" });
        }

        // Store each transaction in the database
        for (const txn of transactions) {
            const newTransaction = new Transaction(txn);
            await newTransaction.save();
        }

        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;