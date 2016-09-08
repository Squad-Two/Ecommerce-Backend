'use strict';
require('dotenv').load();
const s3Upload = require('../lib/aws-s3-monster');
const mongoose = require('../app/middleware/mongoose');
const Monster = require('../app/models/monster');
const mime = require('mime');

let file  = {
  path: process.argv[2],
  name: process.argv[3],
  description: process.argv[4],
  price: process.argv[5]
};


file.mimetype = mime.lookup(file.path);
file.originalname = file.path;

s3Upload(file)
  .then((s3response) =>
  Monster.create({
    url: s3response.Location,
    name: file.name,
    description: file.description,
    price: file.price,

  }))
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .then(() => mongoose.connection.close());
