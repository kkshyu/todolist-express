var express = require("express");
var router = express.Router();
const yup = require("yup");
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (email === password) {
    // login success

    // cookie-based session
    // req.session.cookie.maxAge = 3600 * 1000;
    // req.session.email = email;

    // jwt
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1 hour",
    });
    res.cookie("token", token, { maxAge: 3600 * 1000 });
    return res.redirect("/");
  }
  return res.render("error", {
    error: {
      status: 401,
    },
  });
});

module.exports = router;
