const { SchemaTypes } = require("mongoose")
const mongoose = require("mongoose")

const Schema = require("mongoose").Schema

const stubCarPart = {
    price: 23,
    name: "Spring",
    PID: "31proij039tffe",
    brand: "Brand",
    description: "Very cool"
  }
  
  const stubPersonalData = {
    firstname: "Karol", 
    surname: "Krzosa",
    email: "asdasdadasdsfsdfji@email.com", 
    address: "12edqowd,opqw",
    phoneNumber: "793025232", 
    birthdate: '2012-12-09',
    gender: "MALE"
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