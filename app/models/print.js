'use strict';

const mongoose = require('mongoose');

const printSchema = new mongoose.Schema({
    url: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
  },
    description: {
      type: String,
      required: true
  },
    price: {
      type: Number,
      required: true
    },
}, {
  timestamps: true,
});


const Print = mongoose.model('Print', printSchema);

module.exports = Print;
