'use strict';

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')
const models = require('../models')
const test = require('../test')

test.push("Add customer to db", () => {
    let customer = new Customer(models.stubCustomer)
    customer.save()
})

test.push("Test get_customers_most_cancelled_appointments", () => {
    Customer.find({}, function (err, users) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            let appointments = []
            users.map(user => {
                for (let i in user.cars) {
                    console.log(user.cars[i].appointmentId)
                }
            })
        }
    })
})

exports.get_customers_most_cancelled_appointments = function (req, res) {
}

exports.get_customers_least_cancelled_appointments = function (req, res) {
}

exports.get_most_valuable_car_brands = function (req, res) {
}

exports.get_workers_with_highest_rating = function (req, res) {
}

exports.get_workers_with_lowest_rating = function (req, res) {
}