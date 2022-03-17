const express = require("express");
const { validationResult } = require("express-validator");
const Event = require("./../models/eventsSchema");
exports.getEvents = (request, response, next) => {
  Event.find({})
    .populate({ path: "students" })
    .populate("mainSpeaker", "userName -_id")
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      next(error);
    });
};
exports.createEvent = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");

    throw error;
  } else {
    // console.log(response.body.id)
    let object = new Event({
      _id: request.body.id,
      title: request.body.title,
      mainSpeaker: request.body.mainSpeaker,
      speakers: request.body.speakers,
      students: request.body.students,
    });
    object
      .save()
      .then((data) => {
        response.status(201).json({ BODY: data });
      })
      .catch((error) => {
        next(error);
      });
  }
};
exports.getEvent = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");

    throw error;
  } else {
    response
      .status(201)
      .json({ data: "Event getting", BODY: request.query.id });
  }
};
exports.updateEvent = (request, response, next) => {
  Event.findByIdAndUpdate(request.body.id, {
    $set: {
      students: request.body.students,
      mainSpeaker: request.body.main - Speaker,
      speakers: request.body.students,
      title: request.body.title,
    },
  })
    .then((data) => {
      response.json({ data: data });
    })
    .catch((error) => {
      next(error);
    });
};
exports.deleteEvent = (request, response) => {
  response
    .status(200)
    .json({ data: "deleted", id: request.query.id + "  is deleted" });
};
