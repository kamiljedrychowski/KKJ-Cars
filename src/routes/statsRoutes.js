

'use strict';
module.exports = function (app) {
  const stats = require('../controllers/statsController');

  app.route('/v1/statistics/customers/most-cancelled-appointments').get(stats.average_price_of_service_by_brand)
  app.route('/v1/statistics/cars/most-serviced-brands').get(stats.brand_of_cars_with_most_services)
  app.route('/v1/statistics/cars/top-brand-by-gender').get(stats.get_top_brands_by_gender)
  app.route('/v1/statistics/workers/highest-rating').get(stats.get_workers_with_highest_rating)
  app.route('/v1/statistics/workers/lowest-rating').get(stats.get_workers_with_lowest_rating)
};
