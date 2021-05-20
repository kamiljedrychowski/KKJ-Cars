'use strict'

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')
const Car = mongoose.model('Car')
const User = mongoose.model('User')
const Appointment = mongoose.model('Appointment')
const models = require('../models')
const test = require('../test')
const seed = require('../seeds/modelSeeds')
const { carModels } = require('../seeds/modelSeeds')

exports.average_price_of_service_by_brand = function (req, res) {
    Appointment.aggregate([
        { $unwind: "$services" },
        {
            $lookup: {
                from: "cars",
                localField: "carId",
                foreignField: "_id",
                as: "car"
            }
        },
        { $unwind: "$car" },
        { $project: { "car.brand": 1, "services.price": 1 } },
        { $group: { _id: "$car.brand", serv: { $avg: "$services.price" } } },
    ]).exec((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result)
        }
    })
}

exports.brand_of_cars_with_most_services = function (req, res) {
    Appointment.aggregate([
        { $unwind: "$services" },
        {
            $lookup: {
                from: "cars",
                localField: "carId",
                foreignField: "_id",
                as: "car"
            }
        },
        { $unwind: "$car" },
        { $project: { "car.brand": 1, "services._id": 1 } },
        { $group: { _id: "$car.brand", serv: { $push: "$services._id" } } },
        { $project: { "car.brand": 1, serviceCount: { $size: "$serv" } } },
        { $sort: { "serviceCount": -1 } },
        { $limit: 1 }
    ]).exec((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result)
        }
    })
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

function get_workers(req, res, highest = true) {
    if (highest === true) highest = -1
    else highest = 1
    User.aggregate([
        { $project: { _type: "$type" } },
        { $match: { _type: "WORKER" } },
        { $group: { _id: null, count: { $sum: 1 } } }
    ]).exec((err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            let perc10 = Math.ceil(0.1 * result[0]['count'])
            Appointment.aggregate([
                { $unwind: "$services" },
                { $project: { worker: "$services.workerId", stars: "$stars" } },
                { $group: { _id: "$worker", avgStars: { $avg: "$stars" } } },
                { $sort: { avgStars: highest } },
                { $limit: perc10 }
            ]).exec((err, result) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.json(result)
                }
            })

        }
    })
}

exports.get_workers_with_highest_rating = function (req, res) {
    get_workers(req, res, true)
}

exports.get_workers_with_lowest_rating = function (req, res) {
    get_workers(req, res, false)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
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

const handleErr = (msg) => (err) => {
    if (err) console.log(err)
    else console.log(msg)
}

function newService(workerId) {
    return {
        parts: [seed.stubCarPart],
        name: "Car repair",
        price: 100,
        description: "Very cool car repair",
        workerId: workerId
    }
}

function newAppointment(carId, employeeId, services) {
    return {
        services: services,
        carId: carId,
        date: new Date(),
        deliveryDate: "2021-12-12",
        description: "Very cool appointment",
        stars: getRandomInt(5),
        employee: employeeId
    }
}

function newPersonalData() {
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

function newCar() {
    return {
        VIN: "4S4BRDSC2D2221" + getRandomIntAs3LetterString(),
        licensePlate: "77 LU " + getRandomIntAs3LetterString(),
        model: seed.carModels[getRandomInt(seed.carModels.length)],
        brand: seed.carBrands[getRandomInt(seed.carBrands.length)],
    }
}

function newCustomer() {
    let car1 = new Car(newCar())
    let car2 = new Car(newCar())
    car1.save(handleErr)
    car2.save(handleErr)
    return {
        contact: newPersonalData(),
        cars: [car1, car2]
    }
}

function newUser(type) {
    return {
        username: "cool" + Math.random(),
        password: "guy",
        contact: newPersonalData(),
        type: type
    }
}

test.push("add_documents_to_database", function () {
    let employee = new User(newUser("EMPLOYEE"))
    let worker = new User(newUser("WORKER"))
    let customer = new Customer(newCustomer())
    let appointment = new Appointment(newAppointment(customer.cars[0]._id,
        employee._id, [newService(worker._id)]))

    employee.save(handleErr)
    worker.save(handleErr)
    customer.save(handleErr)
    appointment.save(handleErr)
})

test.push("get_workers_with_highest_rating", function () {
    let res = { json: (a) => { console.log("Workers with highest rating:", a) } }
    get_workers(null, res, true)
})

test.push("brand_of_cars_with_most_services", function () {
    let res = { json: (a) => { console.log("brand_of_cars_with_most_services:", a) } }
    exports.average_price_of_service_by_brand(null, res)
})