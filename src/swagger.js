const SwaggerParser = require('@apidevtools/swagger-parser');
const test = require('./test')
const fs = require('fs')

test.push('generate models from swagger', () => {
  fs.rm('models.js', () => {})
  SwaggerParser.validate('swagger.yaml', (err, api) => {
    if (err) {
      test.invalidCodePath(err)
    } else {
      console.log(
          'API name: %s, Version: %s', api.info.title, api.info.version);
      // console.log('Appointment:', api.definitions.Appointment.properties)
      let keys = Object.keys(api.definitions)


      const write = (c) => fs.appendFileSync('models.js', c)
      write(`const Schema = require('mongoose').Schema\n\n`)
      for (let i = 0; i < keys.length; i++) {
        let props = api.definitions[keys[i]].properties
        let required = api.definitions[keys[i]].required

        write(`let ${keys[i]} = new Schema(`)
        write(JSON.stringify(props, null, 2) + ')\n')
      }
    }
  });
})
