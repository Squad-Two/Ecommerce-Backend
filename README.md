Squad Two: Alex Braun, Joshua Mitchell, Natasa Peic

WDI 13, Boston 01/09/2016
Please see the deployed website at:
https://project3-squad2.github.io/ecommerce-front/#
This is the API for Monster for Hire

This holds databases for users, monsters, and orders.

```
user Schema:
  email: {
    type: String,
    unique: true,
    required: true,
  },
  admin: {
    type: 'boolean',
    default: false,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  passwordDigest: String,
}, {
  timestamps: true,
});
```
Users have a boolean value for admin priviledges that defaults to false.  This
key can be set to true for individuals who need to be able to update or delete
products.  We decided not to make admins able to delete order histories.
```
Orders:
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
```
A history of orders can be found for each user when they are signed in.
```
Monsters:
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
```
