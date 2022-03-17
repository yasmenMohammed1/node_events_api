const express = require("express");
const { validationResult } = require("express-validator");
const Mongoose = require("mongoose");
const Speaker = require("./../models/speakersSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
exports.getSpeakers = (request, response, next) => {
  Speaker.find({})
    .populate({ path: "events" })
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      next(error);
    });
};
exports.createSpeaker = (request, response, next) => {
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
    let object = new Speaker({
      //   image: request.file.filename,
      userName: request.body.username,
      address: request.body.address,
      email: request.body.email,
      role: request.body.role,
      government: request.body.government,

      password: request.body.password,
    });
    object
      .save()
      .then((data) => {
        response.status(201).json({ BODY: data, file: request.file });
      })
      .catch((error) => {
        next(error);
        // response.send("error is here");
      });
  }
};

//    get speaker
exports.getSpeaker = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  } else {
    const { username, password } = request.body;
    Speaker.findOne({ userName: username })
      .then((data) => {
        if (!data) {
          next("un defiened username");
        }
        bcrypt.compare(password, data.password).then(function (result) {
          if (result) {
            let token = jwt.sign(
              {
                email: data.email,
                userName: request.body.username,
                role: "speaker",
              },
              "ITIMearnStackTeam",
              { expiresIn: "1h" }
            );

            response.status(200).json({ data, token });
          } else {
            err = new Error("incorrect password");
            next(err);
          }
        });
      })
      .catch((error) => {
        next(error);
      });
  }
};
exports.getSpeakerById = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  } else {
    const { id } = request.params._id;
    Speaker.findOne({ _id: id })
      .then((data) => {
        if (!data) {
          next("un defiened username");
        }
        response.json(data);
      })
      .catch((error) => {
        next(error);
      });
  }
};

// update speaker
exports.updatespeaker = (request, response, next) => {
  Speaker.findByIdAndUpdate(request.body.id, {
    $set: {
      email: request.body.email,
      address: request.body.address,
      image: request.body.image,
    },
  })
    .then((data) => {
      if (data == null) throw new Error(`Speaker Is not Found!`);
      response.json({ stutus: "updated", Data: data });
    })
    .catch((error) => {
      next(error);
    });
};
// delete speaker
exports.deletespeaker = (request, response, next) => {
  Speaker.findByIdAndDelete(request.body.id).then((data) => {
    response
      .status(200)
      .json({ data: data, id: request.body.id + "  is deleted" });
  });
};
exports.changePassword = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  bcrypt.hash(request.body.newpassword, 10, function (err, hash) {
    if (err) return next(err);
    hashed = hash;
    Speaker.findOneAndUpdate(
      { userName: request.body.username },
      { $set: { password: hash } }
    ).then((data) => {
      console.log(hash);
      response.status(200).json("changed successfully");
    });
  });
};
exports.chageImage = (request, response, next) => {
  Speaker.findOneAndUpdate(
    { userName: request.body.username },
    {
      $set: {
        email: request.body.email,
        address: request.body.address,
        address: {
          city: request.body.city,
          street: request.body.street,
          building: request.body.building,
        },
        image: request.file.filename,
      },
    }
  )
    .then((data) => {
      if (data == null) throw new Error("user not found");
      fs.unlinkSync(path.join(__dirname, "/images") + data.image);
    })
    .then((data) => {
      response.status(200).json(data);
    });
};
