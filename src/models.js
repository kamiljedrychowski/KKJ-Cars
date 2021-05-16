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
  phoneNumber: { 
    type: String, 
    required: true,
    match: [/(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/, 'Please fill a valid phone number']
  },
  birthdate: {
    type: Date,
    required: true,
    // TODO correct this validator
    // validate: function (input) {
    //   return typeof new Date(input) === 'date' && new Date(input) >= new Date() //check if registering person has over 18yo
    // },
    message: input => `${input} must be greater than or equal to the current date!`
  },
  gender: {
    type: String,
    required: true,
    enum: ["MALE", "FEMALE", "OTHER"]
  }
})

const User = new Schema({
  contact: { type: PersonalData, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, enum: ["ADMIN", "EMPLOYEE", "WORKER"], required: true }
})

const Car = new Schema({
  appointmentId: [SchemaTypes.ObjectId], // to car
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

const CarPart = new Schema({
  price: {
    type: Number,
    required: true,
    set: function (v) { return Math.round(v); } //think about this - where to round this
  },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  PID: { type: String, required: true }
})

const Service = new Schema({
  parts: [CarPart],
  workerId: { type: SchemaTypes.ObjectId, required: true },  //reference to other model
  name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    set: function (v) { return Math.round(v); }
  },
  description: { type: String, required: false }
})

const Appointment = new Schema({
  carId: { type: SchemaTypes.ObjectId, required: true }, //reference to car & index to all cars in all user
  services: [Service],
  date: { type: Date, required: true },
  cost: { type: Number, default: 0 }, // Compute this 
  cancellationDate: { type: Date, required: false },
  deliveryDate: { type: Date, required: false },
  description: { type: String, required: false },
  stars: { type: Number, min: 0, max: 5, required: false },
  employee: [SchemaTypes.ObjectId] // referenced to 
})

PersonalData.index({ surname: 1, firstname: 1 }) //make text index
Car.index({ licensePlate: 1 }) //_id make index!! for searching all cars
Service.index({ workerId: 1 })
User.index({ username: 1 })
CarPart.index({ PID: 1 })

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
  User: mongoose.model("User", User),
  Customer: mongoose.model("Customer", Customer),
  Service: mongoose.model("Service", Service),
  Appointment: mongoose.model("Appointment", Appointment),
}

