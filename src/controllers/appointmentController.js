'use strict';

var mongoose = require('mongoose'),
  Appointment = mongoose.model('Appointment');

exports.list_all_appointments = function (req, res) {
  Appointment.find({}, function (err, appointments) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(appointments);
    }
  });
};

exports.create_an_appointment = function (req, res) {
  var new_appointment = new Appointment(req.body);
  new_appointment.save(function (err, appointment) {
    if (err) {
      if (err.name == 'ValidationError') {
        res.status(422).send(err);
      }
      else {
        res.status(500).send(err);
      }
    }
    else {
      Appointment.aggregate([
        { $match: { _id: appointment._id } },
        { $unwind: '$services' },
        {
          $project: {
            'services': 1, 'partsPrice': {
              $reduce: {
                input: "$services.parts.price",
                initialValue: 0,
                in: { $add: ["$$value", "$$this"] }
              }
            }
          }
        },
        {
          $group: { _id: '_id', 'partsPrices': { $sum: '$partsPrice' }, 'servicesPrices': { $sum: '$services.price' } }
        },
        { $project: { 'totalCost': { $add: ['$partsPrices', '$servicesPrices'] } } }
      ]).exec(
        (err, res) => {
          console.log(res);
          abc = res[0].totalCost;
        }
      )
      res.json(appointment);
    }
  });
};

exports.read_an_appointment = function (req, res) {
  Appointment.findById(req.params.appointmentId, function (err, appointment) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(appointment);
    }
  });
};

exports.update_an_appointment = function (req, res) {
  Appointment.findOneAndUpdate({ _id: req.params.appointmentId }, req.body, { new: true }, function (err, appointment) {
    if (err) {
      if (err.name == 'ValidationError') {
        res.status(422).send(err);
      }
      else {
        res.status(500).send(err);
      }
    }
    else {
      Appointment.aggregate([
        { $match: { _id: appointment._id } },
        { $unwind: '$services' },
        {
          $project: {
            'services': 1, 'partsPrice': {
              $reduce: {
                input: "$services.parts.price",
                initialValue: 0,
                in: { $add: ["$$value", "$$this"] }
              }
            }
          }
        },
        {
          $group: { _id: '_id', 'partsPrices': { $sum: '$partsPrice' }, 'servicesPrices': { $sum: '$services.price' } }
        },
        { $project: { 'totalCost': { $add: ['$partsPrices', '$servicesPrices'] } } }
      ]).exec(
        (err, resA) => {
          appointment.cost = resA[0].totalCost;
          appointment.markModified('cost')
          Appointment.findOneAndUpdate({ _id: appointment._id }, {"$set": {"cost": resA[0].totalCost}})
          appointment.save().then((savedDoc) => {
            console.log('err \n', savedDoc)
          })
          res.json(appointment);
        }
      )
    }
  });
};

exports.delete_an_appointment = function (req, res) {
  Appointment.deleteOne({ _id: req.params.appointmentId }, function (err, appointment) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json({ message: 'Customer successfully deleted' });
    }
  });
};

exports.search = function (req, res) {

  var query = {};

  if (req.query.carId) {
    query.carId = req.query.carId;
  }

  if (req.query.future) {
    query.date = { $gt: new Date() };
  }

  if (req.query.employee) {
    query.employee = req.query.employee;
  }

  var skip = 0;
  if (req.query.startFrom) {
    skip = parseInt(req.query.startFrom);
  }
  var limit = 0;
  if (req.query.pageSize) {
    limit = parseInt(req.query.pageSize);
  }

  var sort = "";
  if (req.query.reverse == "true") {
    sort = "-";
  }
  if (req.query.sortedBy) {
    sort += req.query.sortedBy;
  }

  console.log("Query: " + query + " Skip:" + skip + " Limit:" + limit + " Sort:" + sort);

  Appointment.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean()
    .exec(function (err, items) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(items);
      }
    });
};


