

'use strict';
module.exports = function (app) {
  const stats = require('../controllers/statsController');

  app.route('/v1/statistics/customers/most-cancelled-appointments').get(stats.get_customers_most_cancelled_appointments)
  app.route('/v1/statistics/customers/least-cancelled-appointments').get(stats.get_customers_least_cancelled_appointments)
  app.route('/v1/statistics/cars/top-brand-by-gender').get(stats.get_top_brands_by_gender)
  app.route('/v1/statistics/workers/highest-rating').get(stats.get_workers_with_highest_rating)
  app.route('/v1/statistics/workers/lowest-rating').get(stats.get_workers_with_lowest_rating)
};
