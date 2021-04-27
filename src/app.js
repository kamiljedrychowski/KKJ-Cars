const express = require('express')
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
  main()
}
