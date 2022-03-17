const express = require("express");
const speaker = require("./speakers");
const controller = require("../controllers/authenticationController");

const {
	validationResult,
	check,
	body,
	query,
	param,
} = require("express-validator");

const router = express.Router();

router.route("/register").post(
	[
		body("username").isString().withMessage("please enter a valid user name"),
		body("password").notEmpty().withMessage("please enter a valid password"),

		body("email").isEmail().withMessage("please enter a valid email"),

		body("confirm_password")
			.custom((value, { req }) => {
				if (value != req.body.password) {
					return false;
				} else {
					return true;
				}
			})
			.withMessage("Passwords don't match."),
	],
	controller.register,
);

/* 
login route 



*/
router
	.route("/login")
	.post(
		[
			body("username").notEmpty().withMessage("please enter a valid userName"),
			body("password").notEmpty().withMessage("please enter a valid password"),
		],
		controller.login,
	);

module.exports = router;
