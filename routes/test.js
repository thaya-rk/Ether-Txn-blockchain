const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

// Route to insert a sample transaction into the database
router.get('/insert-sample', async (req, res) => {
    const sampleTransaction = new Transaction({
        blockNumber: '123456',
        timeStamp: '1620000000',
        hash: '0xabcdef...',
        from: '0x123456...',
        to: '0x7890ab...',
        value: '1000000000000000000', // 1 ETH in Wei
        gas: '21000',
        gasPrice: '1000000000', // 1 Gwei
    });

    try {
        await sampleTransaction.save();
        res.json({ message: 'Sample transaction inserted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error inserting sample transaction' });
    }
});

module.exports = router;
