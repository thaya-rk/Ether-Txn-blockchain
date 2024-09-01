const axios = require('axios');

// Function to fetch current price of Ether
async function fetchPrice() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
        return response.data;
    } catch (err) {
        console.error('Error fetching price:', err);
        throw err;
    }
}

module.exports = fetchPrice;