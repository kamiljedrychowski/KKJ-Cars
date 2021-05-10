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

const PersonalData = new Schema({
  firstname: { type: String },
  surname: { type: String },
  email: { type: String },
  address: { type: String },
  phoneNumber: { type: String },
  birthdate: { type: Date },
  gender: { type: String }
})

const Car = new Schema({
  appointmentId: [SchemaTypes.ObjectId],  // format uuid,
  VIN: { type: String },
  licensePlate: { type: String },
  model: { type: String },
  brand: { type: String }
})

const Customer = new Schema({
  contact: PersonalData,
  cars: [Car]
})

const CarParts = new Schema({
  price: { type: Number },
  name: { type: String },
  PID: { type: String }
})

const Services = new Schema({
  parts: [CarParts],
  workerId: { type: String },  // , format: uuid
  name: { type: String },
  price: { type: Number }, // Service price
  description: { type: String }
})

const User = new Schema({
  contact: PersonalData,
  username: { type: String },
  email: { type: String },  // , format: email
  type: { type: String, enum: ["ADMIN", "EMPLOYEE", "WORKER"] }
})

const Appointment = new Schema({
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

PersonalData.index({ surname: 1, firstname: 1 });
Customer.index({ cars: 1 });
Car.index({ licensePlate: 1 });
Services.index({ workerId: 1 });
User.index({ username: 1 });
CarParts.index({ workerId: 1 });

module.exports = {
  Contact: mongoose.model("Contact", PersonalData),
  Car: mongoose.model("Car", Car),
  User: mongoose.model("User", User),
  Customer: mongoose.model("Customer", Customer),
  Services: mongoose.model("Services", Services),
  CarParts: mongoose.model("CarParts", CarParts),
  Appointment: mongoose.model("Appointment", Appointment),
}
