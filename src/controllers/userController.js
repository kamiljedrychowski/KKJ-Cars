'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users');

exports.list_all_users = function(req, res) {
    User.find({}, function(err, users) {
        if (err){
          res.status(500).send(err);
        }
        else{
            res.json(users);
        }
    });
};

exports.create_an_users = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err){
      if(err.name=='ValidationError') {
          res.status(422).send(err);
      }
      else{
        res.status(500).send(err);
      }
    }
    else{
      res.json(user);
    }
  });
};

exports.read_an_user = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
    if (err){
      res.status(500).send(err);
    }
    else{
      res.json(user);
    }
  });
};

exports.update_an_user = function(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
      if (err){
        if(err.name=='ValidationError') {
            res.status(422).send(err);
        }
        else{
          res.status(500).send(err);
        }
      }
      else{
          res.json(user);
      }
    });
};

exports.delete_an_user = function(req, res) {
    User.deleteOne({_id: req.params.userId}, function(err, user) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'User successfully deleted' });
        }
    });
};

exports.read_user_contact = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err){
          res.status(500).send(err);
        }
        else{
        //TODO trzeba zrobić jak będzie znany user żeby zwrócić tylko niektóre dane
          res.json(user);
        }
    });
};
