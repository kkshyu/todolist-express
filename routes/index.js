var express = require("express");
var router = express.Router();
const Todo = require("../models/Todo");

/* GET home page. */
router.get("/", function (req, res, next) {
  const todos = Todo.getTodos();
  const isLoggedIn = !!req.cookies.token
  res.render("index", { title: "Todo List", todos, isLoggedIn });
});

module.exports = router;
