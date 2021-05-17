'use strict';

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')
const models = require('../models')
const test = require('../test')

// test.push("Add customer to db", () => {
//     let customer = new Customer(models.stubCustomer)
//     customer.save()
// })

// test.push("Test get_customers_most_cancelled_appointments", () => {
//     Customer.find({}, function (err, users) {
//         if (err) {
//             // res.status(500).send(err);
//             console.log("error")
//         }
//         else {
//             let appointments = []
//             users.map(user => {
//                 for (let i in user.cars) {
//                     console.log(user.cars[i].appointmentId)
//                 }
//             })
//         }
//     })
// })
//TODO poprawić według najnowszej wersji wymagań (pdf)
exports.get_customers_most_cancelled_appointments = function (req, res) {
    //tu powinno być average_price_of_service_by_brand Dawid
}

exports.get_customers_least_cancelled_appointments = function (req, res) {
    //tu powinno być brand_of_cars_with_most_services Karol
}

exports.get_top_brands_by_gender = function (req, res) {
    Customer.aggregate([
        { $unwind: '$cars' },
        { $group: { _id: { gender: '$contact.gender', brand: '$cars.brand' }, numberOfCars: { $sum: 1 } } },
        { $sort: { 'numberOfCars': -1 } },
        {
            $group: {
                _id: '$_id.gender', topCarBrands: {
                    $push: {
                        brand: '$_id.brand', numberOfCars: '$numberOfCars'
                    }
                }
            }
        }
    ], function (err, top_brands_by_gender) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(top_brands_by_gender);
        }
    });
}

exports.get_workers_with_highest_rating = function (req, res) {
    //Karol
}

exports.get_workers_with_lowest_rating = function (req, res) {
    //Karol
}