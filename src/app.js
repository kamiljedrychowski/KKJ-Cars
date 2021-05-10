const mongoose = require("mongoose")
const express = require('express')
const userRoutes = require("./routes/userRoutes")
const statsRoutes = require("./routes/statsRoutes")
require("./models")
const app = express()
const port = 3000

function main() {
  app.get('/', (req, res) => res.send('Hello world'))


  statsRoutes(app)
  userRoutes(app)
  app.listen(port, () => console.log('http://localhost:' + port))
}


const mongo = "mongodb://127.0.0.1:27017"
mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error"))


if (process.argv.length > 2) {
  // files with tests need to be required here to execute
  const test = require('./test')
  require('./controllers/statsController')
  db.on("open", test.run)
} else {
  db.on("open", main)
}
