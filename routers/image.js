const { request, response } = require("express");
const express = require("express");
const controller = require("../controllers/imageController");
const sizingControll = require("../controllers/imageSizing");
const router = express.Router();
router.route("/api/image").get(controller.imageUrl, sizingControll.imageResize);
