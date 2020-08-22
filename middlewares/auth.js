const jwt = require("express-jwt");
const basicAuth = require("express-basic-auth");

const authMiddleware = (req, res, next) => {
  if (!req.session.email) {
    return res.send({
      code: "E_UNAUTHORIZED",
      message: "you have to log in first",
      result: null,
    });
  }
  next();
};
module.exports = authMiddleware;
