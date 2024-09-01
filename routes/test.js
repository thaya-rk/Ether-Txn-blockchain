const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

// Route to insert a sample transaction into the database
router.get('/insert-sample', async (req, res) => {
    const sampleTransaction = new Transaction({
        blockNumber: '123456',
        timeStamp: new Date().toISOString(), // Use ISO format for timestamp
        hash: '0xabcdef...',
        nonce: '0', // Add missing fields if needed
        blockHash: '0xabcdef123456...',
        transactionIndex: '0',
        from: '0x123456...',
        to: '0x7890ab...',
        value: '2000000000000000000', // 2 ETH in Wei
        gas: '21000',
        gasPrice: 1000000000, // 1 Gwei as a number
        isError: '0', // Example value
        txreceipt_status: '1', // Example value
        input: '0x',
        contractAddress: '',
        cumulativeGasUsed: '21000',
        gasUsed: 21000, // Number type
        confirmations: '10', // Example value
        address: '0xce94e5621a5f7068253c42558c147480f38b5e0d' // Example address
    });

    try {
        await sampleTransaction.save();
        res.json({ message: 'Sample transaction inserted successfully' });
    } catch (err) {
        console.error('Error inserting sample transaction:', err);
        res.status(500).json({ error: 'Error inserting sample transaction' });
    }
});

module.exports = router;
