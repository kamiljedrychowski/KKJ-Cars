'use strict';

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')
const User = mongoose.model('User')
const Appointment = mongoose.model('Appointment')
const models = require('../models')
const test = require('../test')
const seed = require('../seeds/modelSeeds')

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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomIntAs3LetterString() {
    let num = getRandomInt(999)
    let result = ""
    if (num < 10) {
        result += "00" + String(num)
    } else if (num < 100) {
        result += "0" + String(num)
    } else {
        result += String(num)
    }

    return result
}

function getPersonalData() {
    return {
        firstname: "Karol",
        surname: "Krzosa",
        email: Math.random() + `asdasdadasdsfsdfji${getRandomInt(20000000)}@email.com`,
        address: "12edqowd,opqw",
        phoneNumber: "793025232",
        birthdate: '2000-12-09',
        gender: "MALE"
    }
}

function getCar() {
    return {
        VIN: "4S4BRDSC2D2221" + getRandomIntAs3LetterString(),
        licensePlate: "77 LU " + getRandomIntAs3LetterString(),
        model: "Octavia",
        brand: "Skoda"
    }
}

function getCustomer() {
    return {
        contact: getPersonalData(),
        cars: [getCar(), getCar()]
    }
}

function getUser() {
    return { username: "cool" + Math.random(), password: "guy", contact: getPersonalData(), type: "EMPLOYEE" }
}

test.push("get_workers_with_highest_rating", function () {
    // User.deleteMany()
    // User.find({}, function (err, customers) {
    //     if (err) {
    //       console.log(err)
    //     }
    //     else {
    //       customers.de
    //     }
    //   })
    let employee = new User(getUser())
    let customer = new Customer(getCustomer())
    // employee.save(function (err) { console.log(err) })
    // customer.save(function (err) { console.log(err) })
    console.log(employee, customer)
})