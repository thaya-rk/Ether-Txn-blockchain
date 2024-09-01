const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    blockNumber: String,
    timeStamp: String,
    hash: String,
    nonce: String,
    blockHash: String,
    transactionIndex: String,
    from: String,
    to: String,
    value: String,
    gas: String,
    gasPrice: Number, 
    isError: String,
    txreceipt_status: String,
    input: String,
    contractAddress: String,
    cumulativeGasUsed: String,
    gasUsed: Number, 
    confirmations: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
