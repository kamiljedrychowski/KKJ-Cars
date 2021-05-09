'use strict';
module.exports = function(app) {
  var appointments = require('../controllers/appointmentController');

  /**
   * Czy to jest potrzebne???
   * Get an actor who is clerk (any role)
   *    Required role: Administrator
   * Post an actor 
   *    RequiredRoles: None
   *    validated if customer and not validated if clerk
	 *
	 * @section appointments
	 * @type get post
	 * @url /v1/appointments
   * @param {string} role (clerk|administrator|customer) TODO: ??? czy to jest wgl jakoś potrzebne ???
  */
  app.route('/v1/appointments')
	  .get(appointments.list_all_appointments)
	  .post(appointments.create_an_appointment);

  /**
   * Put an actor
   *    RequiredRoles: to be the proper actor
   * Get an actor
   *    RequiredRoles: to be the proper actor or an Administrator
	 *
	 * @section appointments
	 * @type get put delete
	 * @url /v1/appointments/:appointmentId
  */  
  app.route('/v1/appointments/:appointmentId')
      .get(appointments.read_an_appointment)
      .put(appointments.update_an_appointment)
      .delete(appointments.delete_an_appointment);
};
