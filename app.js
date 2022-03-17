// variables
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const speaker = require("./routers/speakers");
const authOfLogAndReg = require("./routers/authentication.js");
const student = require("./routers/student");
const event = require("./routers/events");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const maxSize = 300;
// const process = require("../task2/.env");
// functions that declare the behavior in multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toLocaleDateString().replace(/\//g, "-") +
        "-" +
        file.originalname
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpg" || "image/jpeg" || "image/png")
    cb(null, true);
  else {
    cb(null, false);
  }
};

// file limition on image size
// const filesize=(req,file,cb)=>{
//     if(file.size>30000){
//         cb(null,false)
//     }
//     cb(null,true)
// }

//create server
const app = express();
mongoose
  .connect("mongodb://localhost:27017/newSys")
  .then(() => {
    console.log("database is connected");
    app.listen(process.env.PORT || 8080, () => {
      console.log("I am Listenining .......");
    });
  })
  .catch();

// logging status
app.use(morgan("tiny"));

// checking
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((request, response, next) => {
  console.log("welcome yasmena");
  next();
});
// multer which strict file access and decode it
app.use(
  multer({
    storage: storage,
    filefilter: fileFilter,
    limits: { fileSize: maxSize },
  }).single("image")
);

// parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("", image);
// cors
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PUT,OPTIONS"
  );
  response.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

  next();
});

// routes using
app.use(authOfLogAndReg);
app.use(student);
app.use(speaker);
app.use(event);

// errors handlers
app.use(function (req, res, next) {
  res.status(404);
  res.json("404: File not Found");
});
app.use((error, request, response) => {
  let status = error.status || 500;
  response.status(status).send({ Error: error + "" });
});
