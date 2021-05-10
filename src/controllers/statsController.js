'use strict';

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')

exports.get_customers_most_cancelled_appointments = function (req, res) {
    //   User.find({}, function (err, users) {
    //     if (err) {
    //       res.status(500).send(err);
    //     }
    //     else {
    //       res.json(users);
    //     }
    //   });
}

exports.get_customers_least_cancelled_appointments = function (req, res) {
}

exports.get_most_valuable_car_brands = function (req, res) {
}

exports.get_workers_with_highest_rating = function (req, res) {
}

exports.get_workers_with_lowest_rating = function (req, res) {
}