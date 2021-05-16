const { SchemaTypes } = require("mongoose")
const mongoose = require("mongoose")

const Schema = require("mongoose").Schema

const stubCarPart = {
    price: 23.43,
    name: "Spring",
    PID: "31proij039tffe"
  }
  
  const stubPersonalData = {
    "firstname": "Karol",
    "surname": "Krzosa",
    "email": "asdamdad@gmail.com",
    "address": "123 aspofmapof ",
    "phoneNumber": "123 345 676",
    "birthdate": new Date(),
    "gender": "male"
  }
  
  const stubCar = {
    VIN: "4S4BRDSC2D2221585",
    licensePlate: "77 LU 555",
    model: "Octavia",
    brand: "Skoda"
  }
  
  const stubCustomer = {
    contact: stubPersonalData,
    cars: [stubCar]
  }

  module.exports = {
    stubCar: stubCar,
    stubCustomer: stubCustomer,
    stubPersonalData: stubPersonalData
  }