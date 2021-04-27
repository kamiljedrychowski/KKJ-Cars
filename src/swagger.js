const SwaggerParser = require('@apidevtools/swagger-parser');
const test = require('./test')

test.push(() => {
  SwaggerParser.validate('swagger.yaml', (err, api) => {
    if (err) {
      test.invalidCodePath(err)
    } else {
      console.log(
          'API name: %s, Version: %s', api.info.title, api.info.version);
      console.log('Appointment:', api.definitions.Appointment.properties)
    }
  });
})
