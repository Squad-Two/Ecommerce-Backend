'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Monster = models.monster;

// const authenticate = require('./concerns/authenticate_admin');

const s3Upload = require ('lib/aws-s3-monster');

const multer  = require('multer');
const multerUpload = multer({ dest: '/tmp/' });


const index = (req, res, next) => {
  Monster.find()
    .then(monsters => res.json({ monsters }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Monster.findById(req.params.id)
    .then(monster => monster ? res.json({ monster }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  s3Upload(req.file)
    .then((s3response) =>
    Monster.create({
      url: s3response.Location,
      name: req.body.monster.name,
      description: req.body.monster.description,
      price: req.body.monster.price,
    }))
    // change to monster
    .then((monster) => res.json({ monster}))
    .catch((err) => next(err));

};


const update = (req, res, next) => {
  // for admin update
  // let search = { _id: req.params.id, _owner: req.currentUser._id };
    let search = { _id: req.params.id };
  Monster.findOne(search)
    .then(monster => {
      if (!monster) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return monster.update(req.body.monster)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  // for admin delete
  // let search = { _id: req.params.id, _owner: req.currentUser._id };
  let search = { _id: req.params.id };
  Monster.findOne(search)
    .then(monster => {
      if (!monster) {
        return next();
      }
      return monster.remove()
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
  { method: multerUpload.single('monster[file]'), only: ['create'] },
  // { method: authenticate, except: ['index', 'show'] },
], });
