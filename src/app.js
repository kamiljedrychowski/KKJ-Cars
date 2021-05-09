const mongoose = require("mongoose")
const express = require('express')
require("./models")
const app = express()
const port = 3000

function main() {
  app.get('/', (req, res) => res.send('Hello world'))
  app.listen(port, () => console.log('http://localhost:' + port))
}

if (process.argv.length > 2) {
  const test = require('./test')
  // files with tests need to be required here to execute
  require('./swagger')
  test.run()
} else {
  const mongo = "mongodb://127.0.0.1:27017"
  mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection
  db.on("error", console.error.bind(console, "MongoDB connection error"))
  db.on("open", main)
}
