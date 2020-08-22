const jwt = require("express-jwt");
const basicAuth = require("express-basic-auth");

// const authMiddleware = (req, res, next) => {
//   if (!req.session.email) {
//     return res.send({
//       code: "E_UNAUTHORIZED",
//       message: "you have to log in first",
//       result: null,
//     });
//   }
//   next();
// };

// jwt
const authMiddleware = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

// basic auth
// const authMiddleware = basicAuth({
//   challenge: true,
//   users: { admin: "admin", guest: "guest" },
// });

module.exports = authMiddleware;
