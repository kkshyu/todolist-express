var express = require("express");
var router = express.Router();

const todos = [
  { id: 0, content: "xxx", done: false },
  { id: 1, content: "123", done: true },
  { id: 2, content: "4235", done: true },
  { id: 3, content: "346", done: false },
  { id: 4, content: "765", done: false },
];

// get all todos
router.get("/", function (req, res, next) {
  const query = req.query;
  res.send(todos);
});

// create a new todo
router.post("/", function (req, res, next) {
  const body = req.body;
  const todo = {
    id: todos.length,
    content: body.content,
    done: false,
  };
  todos.push(todo);
  res.send(todos);
});

module.exports = router;
