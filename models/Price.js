// models/Price.js

const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    price_in_inr: { type: Number, required: true }
});

const Price = mongoose.model('Price', PriceSchema);

module.exports = Price;