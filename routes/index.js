var express = require("express");
var router = express.Router();
const Todo = require("../models/Todo");

/* GET home page. */
router.get("/", function (req, res, next) {
  const todos = Todo.getTodos();
  res.render("index", { title: "Todo List", todos });
});

module.exports = router;
