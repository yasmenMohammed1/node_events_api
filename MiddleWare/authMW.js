const jwt = require("jsonwebtoken");
module.exports = (request, response, next) => {
  let token, decode;
  try {
    token = request.get("Authorization").split(" ")[1];
    decode = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    error.massage = "not authorized";
    error.status = 403;
    console.log(error);

    next(error);
  }

  if (decode !== undefined) {
    request.role = token.role;

    next();
  }
};
