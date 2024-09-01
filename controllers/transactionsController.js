const axios = require('axios');
const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
    const { address } = req.params;
    const apiKey = process.env.ETHERSCAN_API_KEY;

    try {
        const response = await axios.get('https://api.etherscan.io/api', {
            params: {
                module: 'account',
                action: 'txlist',
                address: address,
                startblock: 0,
                endblock: 99999999,
                sort: 'asc',
                apikey: apiKey
            }
        });

        if (response.data.status === '0') {
            return res.status(400).json({ error: response.data.message });
        }

        const newTransaction = new Transaction({
            address: address,
            transactions: response.data.result,
        });

        await newTransaction.save();

        res.status(200).json(response.data.result);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};
