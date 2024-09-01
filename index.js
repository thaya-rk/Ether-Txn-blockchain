// index.js

const express = require('express');
const connectDB = require('./config/db');
const fetchAndStorePrice = require('./services/priceFetcher');

// Load environment variables
require('dotenv').config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api', require('./routes/transactions'));
app.use('/api/test', require('./routes/test'));

// Fetch and store price immediately upon server start
fetchAndStorePrice();

// Periodic task to fetch and store Ethereum price every 10 minutes
setInterval(fetchAndStorePrice, 10 * 60 * 1000); // 10 minutes in milliseconds

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
