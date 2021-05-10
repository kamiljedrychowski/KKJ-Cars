'use strict';

var mongoose = require('mongoose'),
  Customer = mongoose.model('Customer');

exports.list_all_customers = function(req, res) {
    Customer.find({}, function(err, customers) {
        if (err){
          res.status(500).send(err);
        }
        else{
            res.json(customers);
        }
    });
};

exports.create_an_customer = function(req, res) {
  var new_customer = new Customer(req.body);
  new_customer.save(function(err, customer) {
    if (err){
      if(err.name=='ValidationError') {
          res.status(422).send(err);
      }
      else{
        res.status(500).send(err);
      }
    }
    else{
      res.json(customer);
    }
  });
};

exports.read_an_customer = function(req, res) {
    Customer.findById(req.params.customerId, function(err, customer) {
    if (err){
      res.status(500).send(err);
    }
    else{
      res.json(customer);
    }
  });
};

exports.update_an_customer = function(req, res) {
    Customer.findOneAndUpdate({_id: req.params.customerId}, req.body, {new: true}, function(err, customer) {
      if (err){
        if(err.name=='ValidationError') {
            res.status(422).send(err);
        }
        else{
          res.status(500).send(err);
        }
      }
      else{
          res.json(customer);
      }
    });
};

exports.delete_an_customer = function(req, res) {
    Customer.deleteOne({_id: req.params.customerId}, function(err, customer) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'Customer successfully deleted' });
        }
    });
};

exports.list_user_cars = function(req, res) {
    Customer.findById(req.params.customerId, function(err, customer) {
        if (err){
          res.status(500).send(err);
        }
        else{
        //TODO trzeba zrobić jak będzie znany customer żeby zwrócić jego auta
          res.json(customer);
        }
    });
};
