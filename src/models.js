const Schema = require(mongoose).Schema

let User = new Schema({
  username: {type: String},
  email: {type: String},  // , format: email
  id: {type: String},     // , format: uuid
})
let Services = new Schema({
  parts: [String],
  worker_id: {type: String},  // , format: uuid
  name: {type: String},
  description: {type: String}
})
let Car = new Schema({
  appointment_id: [String],  // format uuid,
  VIN: {type: String},
  licensePlate: {type: String},
  model: {type: String},
  brand: {type: String}
})
let CarParts = new Schema(
    {price: {type: Number}, name: {type: String}, PID: {type: String}})
let Contact = new Schema({
  firstname: {type: String},
  surname: {type: String},
  email: {type: String},
  address: {type: String},
  phoneNumber: {type: String},
  birthdate: {type: String},
  gender: {type: String}
})
let Appointment = new Schema({
  services: [String],  // format uuid,
  date: {type: String},
  cost: {type: Number},
  cancellationDate: {type: String},
  deliveryDate: {type: String},
  description: {type: String},
  stars: {type: Number, min: 0, max: 5}
})
