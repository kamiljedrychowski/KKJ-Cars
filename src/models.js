const { SchemaTypes } = require("mongoose")
const mongoose = require("mongoose")

const Schema = require("mongoose").Schema
/* 
User to admin i pracownik
  Klienta wykorzeniłem do osobnego modelu, nie jestem pewny czy dobrze to.
    Klient ma auta
      Auta mają odniesienia id do spotkań

Spotkania
  Spotkania mają pracownikow jako id
  Spotkania mają serwisy
    Serwisy mają części (Serwisy mają swoją cenę i części mają swoją cenę)
      Serwisy maja id mechanika
*/
let Contact = new Schema({
  firstname: { type: String },
  surname: { type: String },
  email: { type: String },
  address: { type: String },
  phoneNumber: { type: String },
  birthdate: { type: Date },
  gender: { type: String }
})
let Car = new Schema({
  appointmentId: [SchemaTypes.ObjectId],  // format uuid,
  VIN: { type: String },
  licensePlate: { type: String },
  model: { type: String },
  brand: { type: String }
})
let Customer = new Schema({
  contact: Contact,
  cars: [Car]
})
let CarParts = new Schema(
  { price: { type: Number }, name: { type: String }, PID: { type: String } })
let Services = new Schema({
  parts: [CarParts],
  workerId: { type: String },  // , format: uuid
  name: { type: String },
  price: { type: Number }, // Service price
  description: { type: String }
})


let User = new Schema({
  contact: Contact,
  username: { type: String },
  email: { type: String },  // , format: email
})

let Appointment = new Schema({
  carId: SchemaTypes.ObjectId,
  services: [Services],  // format uuid,
  date: { type: Date },
  // cost: { type: Number }, // To powinno wynikać z Services, chyba ze dodatkowa zaplata za caloksztalt tworczosci
  cancellationDate: { type: Date },
  deliveryDate: { type: Date },
  description: { type: String },
  stars: { type: Number, min: 0, max: 5 },
  employee: [SchemaTypes.ObjectId]
})

module.exports = {
  Contact: mongoose.model("Contact", Contact),
  Car: mongoose.model("Car", Car),
  User: mongoose.model("User", User),
  Customer: mongoose.model("Customer", Customer),
  Services: mongoose.model("Services", Services),
  CarParts: mongoose.model("CarParts", CarParts),
  Appointment: mongoose.model("Appointment", Appointment),
}
