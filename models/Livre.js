const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  available_quantity: { type: Number, required: true, min: 0 },
  total_quantity: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Livre', livreSchema);