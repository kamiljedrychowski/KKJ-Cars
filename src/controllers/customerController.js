'use strict';

var mongoose = require('mongoose'),
  Customer = mongoose.model('Customer');

exports.list_all_customers = function (req, res) {
  Customer.find({}, function (err, customers) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(customers);
    }
  });
};

exports.create_an_customer = function (req, res) {
  var new_customer = new Customer(req.body);
  new_customer.save(function (err, customer) {
    if (err) {
      if (err.name == 'ValidationError') {
        res.status(422).send(err);
      }
      else {
        res.status(500).send(err);
      }
    }
    else {
      res.json(customer);
    }
  });
};

exports.read_an_customer = function (req, res) {
  Customer.findById(req.params.customerId, function (err, customer) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(customer);
    }
  });
};

exports.update_an_customer = function (req, res) {
  Customer.findOneAndUpdate({ _id: req.params.customerId }, req.body, { new: true }, function (err, customer) {
    if (err) {
      if (err.name == 'ValidationError') {
        res.status(422).send(err);
      }
      else {
        res.status(500).send(err);
      }
    }
    else {
      res.json(customer);
    }
  });
};

exports.delete_an_customer = function (req, res) {
  Customer.deleteOne({ _id: req.params.customerId }, function (err, customer) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json({ message: 'Customer successfully deleted' });
    }
  });
};

exports.list_user_cars = function (req, res) {
  Customer.findById({ _id: req.params.customerId }, { cars: 1, _id: 0 }, function (err, cars) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(cars);
    }
  });
};

exports.add_user_cars = function (req, res) {
  Customer.findOneAndUpdate({ _id: req.params.customerId }, { $push: { cars: req.body } }, function (err, cars) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      cars.cars.push(req.body);
      res.json(cars);
    }
  });
};

exports.delete_user_cars = function (req, res) {
  Customer.findOneAndUpdate({ _id: req.params.customerId }, { $pull: { "cars": { "_id": req.params.carId } } }, function (err, cars) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      cars.cars.pull({ "cars": { "_id": req.params.carId } });
      res.json(cars);
    }
  });
};

exports.search = function(req, res) {
 var query = {};
 
 if (req.query.name) {
   query.$text = {$search: req.query.name};
 }

 console.log("Query: "+query.$text);

 Customer.find(query)
     .exec(function(err, items){
         if (err){
           res.send(err);
         }
         else{
           res.json(items);
         }
       });
};
