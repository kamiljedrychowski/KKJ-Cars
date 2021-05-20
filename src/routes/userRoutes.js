'use strict';
module.exports = function(app) {
  var users = require('../controllers/userController');

  /**
	 * @section users
	 * @type get post
	 * @url /v1/users
  */
  app.route('/v1/users')
	  .get(users.list_all_users)
	  .post(users.create_an_user);

 app.route('/v1/users/search')
	  .get(users.search);

  /**
	 * @section users
	 * @type get put delete
	 * @url /v1/users/:userId
  */  
  app.route('/v1/users/:userId')
      .get(users.read_an_user)
      .put(users.update_an_user)
      .delete(users.delete_an_user);

  /**
	 * @section users
	 * @type get
	 * @url /v1/users/:userId/contact
  */
  app.route('/v1/users/{id}/contact')
      .get(users.read_user_contact);
};
