'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// setting up admin through monogo shell

 // Object {user: Object}
 // user
 // :
 // Object
 // __v
 // :
 // 0
 // _id
 // :
 // "57cee67df33317bb47053632"
 // admin
 // :
 // false
 // createdAt
 // :
 // "2016-09-06T15:53:33.363Z"
 // email
 // :
 // "ADMIN@gmail.com"
 // updatedAt
 // :
 // "2016-09-06T15:53:33.363Z"

 // password: 1



//  > db.users.update({_id: ObjectId("57cee67df33317bb47053632")},{ $set:{admin: true} })
// WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
// > db.users.find({email: "ADMIN@gmail.com"}).pretty();
// {
// 	"_id" : ObjectId("57cee67df33317bb47053632"),
// 	"passwordDigest" : "$2a$10$ba1g4UbHTiX9of2u1xYiIOUjyFfXsGRmPskWN7xmidYjOOSi.RQC6",
// 	"updatedAt" : ISODate("2016-09-06T15:53:33.363Z"),
// 	"createdAt" : ISODate("2016-09-06T15:53:33.363Z"),
// 	"email" : "ADMIN@gmail.com",
// 	"token" : "zr3NqX/7nX8sagJWlNnyOQ==",
// 	"admin" : true,
// 	"__v" : 0
// }
// >


const userSchema = new mongoose.Schema({
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

userSchema.plugin(uniqueValidator);

userSchema.methods.comparePassword = function (password) {
  let _this = this;

  return new Promise((resolve, reject) =>
    bcrypt.compare(password, _this.passwordDigest, (err, data) =>
        err ? reject(err) : data ? resolve(data) : reject(new Error('Not Authorized')))
    ).then(() => _this);
};

userSchema.virtual('password').set(function (password) {
  this._password = password;
});

userSchema.pre('save', function (next) {
  let _this = this;

  if (!_this._password) {
    return next();
  }

  new Promise((resolve, reject) =>
    bcrypt.genSalt(null, (err, salt) =>
        err ? reject(err) : resolve(salt))
  ).then((salt) =>
    new Promise((resolve, reject) =>
      bcrypt.hash(_this._password, salt, (err, data) =>
        err ? reject(err) : resolve(data)))
  ).then((digest) => {
    _this.passwordDigest = digest;
    next();
  }).catch((error) => {
    next(error);
  });
});

userSchema.methods.setPassword = function (password) {
  let _this = this;

  return new Promise((resolve, reject) =>
    bcrypt.genSalt(null, (err, salt) =>
        err ? reject(err) : resolve(salt))
  ).then((salt) =>
    new Promise((resolve, reject) =>
      bcrypt.hash(password, salt, (err, data) =>
        err ? reject(err) : resolve(data)))
  ).then((digest) => {
    _this.passwordDigest = digest;
    return _this.save();
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
