// services/priceFetcher.js

const axios = require('axios');
const Price = require('../models/Price');

const fetchAndStorePrice = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
        const priceInInr = response.data.ethereum.inr;

        // Create a new Price document
        const price = new Price({
            price_in_inr: priceInInr
        });

        // Save the document to MongoDB
        await price.save();
        console.log(`Ethereum price saved: ₹${priceInInr}`);
    } catch (error) {
        console.error('Error fetching or saving Ethereum price:', error.message);
    }
};

module.exports = fetchAndStorePrice;
