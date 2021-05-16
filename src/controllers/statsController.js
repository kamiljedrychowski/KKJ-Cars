'use strict';

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')
const User = mongoose.model('User')
const Appointment = mongoose.model('Appointment')
const models = require('../models')
const test = require('../test')
const seed = require('../seeds/modelSeeds')

test.push("Add customer to db", () => {
    let customer = new Customer(seed.stubCustomer)
    customer.save()
})

test.push("get_workers_with_highest_rating", () => {
    // Customer.find({}, function (err, users) {
    //     if (err) {
    //         // res.status(500).send(err);
    //         console.log("error")
    //     }
    //     else {
    //         let appointments = []
    //         users.map(user => {
    //             for (let i in user.cars) {
    //                 console.log(user.cars[i].appointmentId)
    //             }
    //         })
    //     }
    // })
})
//TODO poprawić według najnowszej wersji wymagań (pdf)
exports.get_customers_most_cancelled_appointments = function (req, res) {
    //tu powinno być average_price_of_service_by_brand Dawid
}

exports.get_customers_least_cancelled_appointments = function (req, res) {
    //tu powinno być brand_of_cars_with_most_services Karol
}

exports.get_most_valuable_car_brands = function (req, res) {
    //tu powinno być top_brands_by_gender Kamil
}

exports.get_workers_with_highest_rating = function (req, res) {
    //Karol
}

exports.get_workers_with_lowest_rating = function (req, res) {
    //Karol
}

const service = {
    parts: [seed.stubCarPart],
    name: "Car repair",
    price: 100,
    description: "Very cool car repair",
    workerId: "needs to be filled"
}

const appointment = {
    services: [service, service],
    carId: "...",
    date: new Date(),
    deliveryDate: "2021-12-12",
    description: "Very cool appointment",
    stars: 5,
    employee: "..."
}

test.push("get_workers_with_highest_rating", function() {
    // User.deleteMany()
    // User.find({}, function (err, customers) {
    //     if (err) {
    //       console.log(err)
    //     }
    //     else {
    //       customers.de
    //     }
    //   })
    let employee = new User({login: "cool", password: "guy", contact: seed.stubPersonalData, type: "EMPLOYEE"})
    let customer = new Customer(seed.stubCustomer)
    employee.save(function(err) { console.log(err)})
    customer.save(function(err) { console.log(err)})
    console.log(employee, customer)
})