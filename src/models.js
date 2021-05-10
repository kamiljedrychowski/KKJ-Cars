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
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  birthdate: { type: Date, required: true },
  gender: { type: String, required: true }
})

const Car = new Schema({
  appointmentId: [SchemaTypes.ObjectId],  // format uuid,
  VIN: { type: String, required: true },
  licensePlate: { type: String, required: true },
  model: { type: String, required: true },
  brand: { type: String, required: true }
})

const Customer = new Schema({
  contact: { type: PersonalData, required: true },
  cars: [Car]
})

const CarParts = new Schema({
  price: { type: Number, required: true },
  name: { type: String, required: true },
  PID: { type: String, required: true }
})

const Services = new Schema({
  parts: [CarParts],
  workerId: { type: String, required: true },  // , format: uuid
  name: { type: String, required: true },
  price: { type: Number, required: true }, // Service price
  description: { type: String, required: false }
})

const User = new Schema({
  contact: { type: PersonalData, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },  // , format: email
  type: { type: String, enum: ["ADMIN", "EMPLOYEE", "WORKER"], required: true }
})

const Appointment = new Schema({
  carId: { type: SchemaTypes.ObjectId, required: true },
  services: [Services],  // format uuid,
  date: { type: Date, required: true },
  // cost: { type: Number }, // To powinno wynikać z Services, chyba ze dodatkowa zaplata za caloksztalt tworczosci
  cancellationDate: { type: Date, required: false },
  deliveryDate: { type: Date, required: false },
  description: { type: String, required: false },
  stars: { type: Number, min: 0, max: 5, required: false },
  employee: [SchemaTypes.ObjectId]
})

const stubCarPart = {
  price: 23.43, // TODO!!!! We need a format to store money
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

PersonalData.index({ surname: 1, firstname: 1 });
Customer.index({ cars: 1 });
Car.index({ licensePlate: 1 });
Services.index({ workerId: 1 });
User.index({ username: 1 });
CarParts.index({ workerId: 1 });

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

