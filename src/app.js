const mongoose = require("mongoose")
const express = require('express')
const userRoutes = require("./routes/userRoutes")
const appointmentRoutes = require("./routes/appointmentRoutes")
const statsRoutes = require("./routes/statsRoutes")
const bodyParser = require('body-parser')
require("./models")
const app = express()
const port = 3000

function main() {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.get('/', (req, res) => res.send('Hello world'))
  let customerRoutes = require("./routes/customerRoutes")

  statsRoutes(app)
  userRoutes(app)
  customerRoutes(app)
  appointmentRoutes(app)

  app.listen(port, () => console.log('http://localhost:' + port))
}

// process.env.dbUsername = "karol"
// process.env.dbPassword = "zaq12wsx"
// process.env.dbName = "app"


let dbPass = ""
if (process.env.dbUsername && process.env.dbPassword)
  dbPass = `${process.env.dbUsername}:${process.env.dbPassword}@`
let dbName = process.env.dbName || ""
dbName = "/" + dbName

const dbPort = process.env.dbPort || "27017"
const dbHost = process.env.dbHost || "127.0.0.1"

const mongo = `mongodb://${dbPass}${dbHost}:${dbPort}${dbName}`
mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error"))
console.log(mongo)

if (process.argv.length > 2) {
  // files with tests need to be required here to execute
  const test = require('./test')
  require('./controllers/statsController')
  require('./models')
  db.on("open", test.run)
} else {
  db.on("open", main)
}
