'use strict';

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost/Ecommerce-Backend';
// const uri = process.env.MONGOLAB_URI || 'mongodb://localhost/Ecommerce-Backend';
mongoose.Promise = global.Promise;
mongoose.connect(uri);

module.exports = mongoose;
