const express = require('express')
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 3000;

const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactions');
const testRoutes = require('./routes/test');
const expenseRoutes = require('./routes/expenses'); // New route

// Connect to MongoDB
connectDB();

app.use(cors()); 

// Middleware
app.use(express.json());

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/test', testRoutes);
app.use('/api', expenseRoutes); // Use new route

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});