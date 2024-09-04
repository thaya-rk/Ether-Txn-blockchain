const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

// Route to insert a sample transaction into the database
router.get('/insert-sample', async (req, res) => {
    const sampleTransaction = new Transaction({
        blockNumber: '123456',
        timeStamp: new Date().toISOString(), 
        hash: '0xabcdef...',
        nonce: '0',
        blockHash: '0xabcdef123456...',
        transactionIndex: '0',
        from: '0x123456...',
        to: '0x7890ab...',
        value: '2000000000000000000', // 2 ETH in Wei
        gas: '21000',
        gasPrice: 1000000000,
        isError: '0', 
        txreceipt_status: '1', 
        input: '0x',
        contractAddress: '',
        cumulativeGasUsed: '21000',
        gasUsed: 21000, 
        confirmations: '10', 
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
