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
      res.json(appointment);
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


