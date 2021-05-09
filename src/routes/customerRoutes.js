'use strict';
module.exports = function(app) {
  var customers = require('../controllers/customerController');

  /**
   * Czy to jest potrzebne???
   * Get an actor who is clerk (any role)
   *    Required role: Administrator
   * Post an actor 
   *    RequiredRoles: None
   *    validated if customer and not validated if clerk
	 *
	 * @section customer
	 * @type get post
	 * @url /v1/customers
   * @param {string} role (clerk|administrator|customer) TODO: ??? czy to jest wgl jakoś potrzebne ???
  */
  app.route('/v1/customers')
	  .get(customers.list_all_customers)
	  .post(customers.create_an_customer);

  /**
   * Put an actor
   *    RequiredRoles: to be the proper actor
   * Get an actor
   *    RequiredRoles: to be the proper actor or an Administrator
	 *
	 * @section users
	 * @type get put delete
	 * @url /v1/customers/:customerId
  */  
  app.route('/v1/customers/:customerId')
      .get(customers.read_an_customer)
      .put(customers.update_an_customer)
      .delete(customers.delete_an_customer);

  /**
   * Put an actor
   *    RequiredRoles: to be the proper actor
   * Get an actor
   *    RequiredRoles: to be the proper actor or an Administrator
	 *
	 * @section customers
	 * @type get
	 * @url /v1/users/:customerId/cars
  */
  app.route('/v1/customers/{id}/cars')
      .get(customers.list_user_cars);
};
