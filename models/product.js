const mongoose = require('mongoose');
const db = require('../dbConnection');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    index: true,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  ratings: {
    type: Number,
    min: 1,
    max: 5,
    index: true,
  },
});

module.exports = db.model('Product', productSchema, 'products');;
