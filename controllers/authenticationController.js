const { validationResult } = require("express-validator");
let role;
exports.register = (request, response, next) => {
	let errors = validationResult(request);
	if (!errors.isEmpty()) {
		let error = new Error();
		error.status = 422;
		error.message = errors
			.array()
			.reduce((current, object) => current + object.msg + " ", "");

		throw error;
	} else {
		response.redirect(307, "/speakers");
	}
};

exports.login = (request, response, next) => {
	let errors = validationResult(request);
	if (!errors.isEmpty()) {
		let error = new Error();
		error.status = 422;
		error.message = errors
			.array()
			.reduce((current, object) => current + object.msg + " ", "");

		throw error;
	} else {
		role = request.body.role;
		console.log(request.body);
		response.redirect(307, `${role}/login`);
	}
};
