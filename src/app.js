const mongoose = require("mongoose")
const express = require('express')
const bodyParser = require('body-parser')
require("./models")
const app = express()
const port = 3000

function main() {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.get('/', (req, res) => res.send('Hello world'))
  let userRoutes = require("./routes/userRoutes")

  userRoutes(app)
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
console.log(mongo)
if (process.argv.length > 2) {
  const test = require('./test')
  // files with tests need to be required here to execute
  require('./swagger')
  test.run()
} else {
  mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection
  db.on("error", console.error.bind(console, "MongoDB connection error"))
  db.on("open", main)
}
