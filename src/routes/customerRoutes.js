'use strict';
module.exports = function (app) {
    var customers = require('../controllers/customerController');

    /**
       * @section customer
       * @type get post
       * @url /v1/customers
    */
    app.route('/v1/customers')
        .get(customers.list_all_customers)
        .post(customers.create_an_customer);

    app.route('/v1/customers/search')
        .get(customers.search);


    /**
       * @section users
       * @type get put delete
       * @url /v1/customers/:customerId
    */
    app.route('/v1/customers/:customerId')
        .get(customers.read_an_customer)
        .put(customers.update_an_customer)
        .delete(customers.delete_an_customer);

    /**
       * @section customers
       * @type get
       * @url /v1/users/:customerId/cars
    */
    app.route('/v1/customers/:customerId/cars')
        .get(customers.list_user_cars)
        .post(customers.add_user_cars); //add user car

    app.route('/v1/customers/:customerId/cars/:carId')
        .delete(customers.delete_user_cars); //singular

};
