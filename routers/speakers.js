const express = require("express");
const controller = require("../controllers/speakerController");
const isAuth = require("../MiddleWare/authMW");
const { check, body, query, param } = require("express-validator");
const router = express.Router();
router
  .route("/speakers")
  .get(
    //   isAuth,
    controller.getSpeakers
  )
  .post(
    [
      // body("government").notEmpty().withMessage("addrerss must be an object"),
      // body("username").notEmpty().withMessage("addrerss must be an object"),
    ],

    // isAuth,
    controller.createSpeaker
  )
  .put(controller.updatespeaker)
  .delete(controller.deletespeaker);

router.route("/speakers/login").post(controller.getSpeaker);
router.put(
  "/changePassword",
  [
    body("username").notEmpty().withMessage("username shouldnot be empty"),
    body("newpassword").notEmpty().withMessage("enter a valid new password"),
  ],

  controller.changePassword
);
router.get("/speakers/:id", controller.getSpeakerById);

module.exports = router;
