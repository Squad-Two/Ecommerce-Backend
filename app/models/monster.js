'use strict';

const mongoose = require('mongoose');

const monsterSchema = new mongoose.Schema({
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


const Monster = mongoose.model('Monster', monsterSchema);

module.exports = Monster;
