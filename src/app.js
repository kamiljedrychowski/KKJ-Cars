const mongoose = require("mongoose")
const express = require('express')
require("./models")
const app = express()
const port = 3000

function main() {
  app.get('/', (req, res) => res.send('Hello world'))
  let userRoutes = require("./routes/userRoutes")

  userRoutes(app)
  app.listen(port, () => console.log('http://localhost:' + port))
}


const mongo = "mongodb://127.0.0.1:27017"
mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error"))

if (process.argv.length > 2) {
  const test = require('./test')
  // files with tests need to be required here to execute
  db.on("open", test.run)
} else {
  db.on("open", main)
}
