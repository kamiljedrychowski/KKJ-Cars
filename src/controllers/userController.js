'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.list_all_users = function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(users);
    }
  });
};


exports.create_an_user = function(req, res) {

  var new_user = new User(req.body);
  new_user.save(function (err, user) {
    if (err) {
      if (err.name == 'ValidationError') {
        res.status(422).send(err);
      }
      else {
        res.status(500).send(err);
      }
    }
    else {
      res.json(user);
    }
  });
};

exports.read_an_user = function (req, res) {
  User.findById(req.params.userId, function (err, user) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(user);
    }
  });
};

exports.update_an_user = function (req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function (err, user) {
    if (err) {
      if (err.name == 'ValidationError') {
        res.status(422).send(err);
      }
      else {
        res.status(500).send(err);
      }
    }
    else {
      res.json(user);
    }
  });
};

exports.delete_an_user = function (req, res) {
  User.deleteOne({ _id: req.params.userId }, function (err, user) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json({ message: 'User successfully deleted' });
    }
  });
};

exports.read_user_contact = function (req, res) {
  User.findById(req.params.userId, { contact: 1, _id: 0 }, function (err, contact) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(contact);
    }
  });
};

exports.search = function(req, res) {
  var query = {};
  
  if (req.query.name) {
    query.$text = {$search: req.query.name};
  }
 
  console.log("Query: "+query.$text);
 
  User.find(query)
      .exec(function(err, items){
          if (err){
            res.send(err);
          }
          else{
            res.json(items);
          }
        });
 };

 