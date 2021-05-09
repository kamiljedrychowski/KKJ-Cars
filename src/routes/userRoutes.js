'use strict';
module.exports = function(app) {
  var users = require('../controllers/userController');

  /**
   * Czy to jest potrzebne???
   * Get an actor who is clerk (any role)
   *    Required role: Administrator
   * Post an actor 
   *    RequiredRoles: None
   *    validated if customer and not validated if clerk
	 *
	 * @section users
	 * @type get post
	 * @url /v1/users
   * @param {string} role (clerk|administrator|customer) TODO: ??? czy to jest wgl jakoś potrzebne ???
  */
  app.route('/v1/users')
	  .get(users.list_all_users)
	  .post(users.create_an_users);

  /**
   * Put an actor
   *    RequiredRoles: to be the proper actor
   * Get an actor
   *    RequiredRoles: to be the proper actor or an Administrator
	 *
	 * @section users
	 * @type get put delete
	 * @url /v1/users/:userId
  */  
  app.route('/v1/users/:userId')
      .get(users.read_an_user)
      .put(users.update_an_user)
      .delete(users.delete_an_user);

  /**
   * Put an actor
   *    RequiredRoles: to be the proper actor
   * Get an actor
   *    RequiredRoles: to be the proper actor or an Administrator
	 *
	 * @section users
	 * @type get
	 * @url /v1/users/:userId/contact
  */
  app.route('/v1/users/{id}/contact')
      .get(users.read_user_contact);
};