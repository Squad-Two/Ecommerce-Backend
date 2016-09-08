'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Print = models.print;

// const authenticate = require('./concerns/authenticate_admin');

const s3Upload = require ('lib/aws-s3-print');

const multer  = require('multer');
const multerUpload = multer({ dest: '/tmp/' });


const index = (req, res, next) => {
  Print.find()
    .then(prints => res.json({ prints }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Print.findById(req.params.id)
    .then(print => print ? res.json({ print }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  s3Upload(req.file)
    .then((s3response) =>
    Print.create({
      url: s3response.Location,
      name: req.body.print.name,
      description: req.body.print.description,
      price: req.body.print.price,
    }))
    // change to print
    .then((print) => res.json({ print}))
    .catch((err) => next(err));

};


const update = (req, res, next) => {
  // for admin update
  // let search = { _id: req.params.id, _owner: req.currentUser._id };
    let search = { _id: req.params.id };
  Print.findOne(search)
    .then(print => {
      if (!print) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return print.update(req.body.print)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  // for admin delete
  // let search = { _id: req.params.id, _owner: req.currentUser._id };
  let search = { _id: req.params.id };
  Print.findOne(search)
    .then(print => {
      if (!print) {
        return next();
      }
      return print.remove()
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};


module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: multerUpload.single('print[file]'), only: ['create'] },
  // { method: authenticate, except: ['index', 'show'] },
], });
