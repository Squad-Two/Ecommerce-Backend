'use strict';

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: {
      type: Array,
      default: [],
      required: true,
  },
      total: {
        type: Number,
        required: true,
  },
      paid: {
        type: Boolean,
    },
      date_completed: {
        type: Date,
        match: /\d{4}-\d{2}-\d{2}/,
    },
      token: {
        type: String,
        // required: true,
      },
    _owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
}
);

  orderSchema.virtual('total_validation').get(function() {
   let front_total = this.total;
   if (!this.total) {
     return 'Error';
   }
   let itemsArray = this.items;
   let sum = 0;
   for(let i=0; i<itemsArray.length; i++){
     sum += itemsArray[i].price * itemsArray[i].quantity;
   }
   if (front_total === sum ){
     return true;
   } else {
     return 'Error';
   }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
