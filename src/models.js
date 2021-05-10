const { SchemaTypes } = require("mongoose")
const mongoose = require("mongoose")

const Schema = require("mongoose").Schema
const PersonalData = new Schema({
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  birthdate: {
    type: Date,
    required: true,
    // TODO correct this validator
    // validate: function (input) {
    //   return typeof new Date(input) === 'date' && new Date(input) >= new Date()
    // },
    message: input => `${input} must be greater than or equal to the current date!`
  },
  gender: {
    type: String,
    required: true,
    enum: ["MALE", "FEMALE", "OTHER"]
  }
})

const Car = new Schema({
  appointmentId: [SchemaTypes.ObjectId],
  VIN: {
    type: String,
    required: true,
    unique: true,
    match: [/^(?=.*[0-9])(?=.*[A-z])[0-9A-z-]{17}$/, 'Please fill a valid VIN number']
  },
  licensePlate: { type: String, required: true },
  model: { type: String, required: true },
  brand: { type: String, required: true }
})

const Customer = new Schema({
  contact: { type: PersonalData, required: true },
  cars: [Car]
})

const CarParts = new Schema({
  price: {
    type: Number,
    required: true,
    set: function (v) { return Math.round(v); }
  },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  PID: { type: String, required: true }
})

const Services = new Schema({
  parts: [CarParts],
  workerId: { type: SchemaTypes.ObjectId, required: true },
  name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    set: function (v) { return Math.round(v); }
  },
  description: { type: String, required: false }
})

const User = new Schema({
  contact: { type: PersonalData, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, enum: ["ADMIN", "EMPLOYEE", "WORKER"], required: true }
})

const Appointment = new Schema({
  carId: { type: SchemaTypes.ObjectId, required: true }, // to a car
  services: [Services],
  date: { type: Date, required: true },
  cost: { type: Number, default: 0 }, // This can be computed on retrival 
  cancellationDate: { type: Date, required: false },
  deliveryDate: { type: Date, required: false },
  description: { type: String, required: false },
  stars: { type: Number, min: 0, max: 5, required: false },
  employee: [SchemaTypes.ObjectId]
})

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

PersonalData.index({ surname: 1, firstname: 1 })
Customer.index({ 'contact.surname': 1 })
Car.index({ licensePlate: 1 })
Services.index({ workerId: 1 })
User.index({ username: 1 })
CarParts.index({ PID: 1 })

const bcrypt = require('bcrypt')
User.pre('save', function (callback) {
  let user = this
  if (!user.isModified('password')) return callback()

  bcrypt.genSalt(5, function (err, salt) {
    if (err) return callback(err)

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return callback(err)
      user.password = hash
      callback()
    })
  })
})

User.methods.verifyPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    console.log('verifying password in actorModel: ' + password)
    if (err) return callback(err)
    console.log('iMatch: ' + isMatch)
    callback(null, isMatch)
  })
}

module.exports = {
  PersonalData: mongoose.model("PersonalData", PersonalData),
  Car: mongoose.model("Car", Car),
  User: mongoose.model("User", User),
  Customer: mongoose.model("Customer", Customer),
  Services: mongoose.model("Services", Services),
  CarParts: mongoose.model("CarParts", CarParts),
  Appointment: mongoose.model("Appointment", Appointment),
  stubCar: stubCar,
  stubCustomer: stubCustomer,
  stubPersonalData: stubPersonalData
}

