'use strict';
module.exports = function (app) {
  var appointments = require('../controllers/appointmentController');

  /**
   * Get an actor who is  (any role)
   * Post an actor 
	 *
	 * @section appointments
	 * @type get post
	 * @url /v1/appointments
  */
  app.route('/v1/appointments')
    .get(appointments.list_all_appointments)
    .post(appointments.create_an_appointment);

  app.route('/v1/appointments/search')
    .get(appointments.search);

  app.route('/v1/appointments/:appointmentId')
    .get(appointments.read_an_appointment)
    .put(appointments.update_an_appointment)
    .delete(appointments.delete_an_appointment);

};
