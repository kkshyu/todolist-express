var express = require("express");
var router = express.Router();

let todos = [
  { id: 0, content: "sample1", done: false },
  { id: 1, content: "sample2", done: true },
  { id: 2, content: "sample3", done: false },
];

// get all todo items
router.get("/", (req, res, next) => {
  const query = req.query;
  const start = parseInt(query.offset) || 0;
  const end = query.limit ? start + parseInt(query.limit) : todos.length;
  const filteredTodos = todos.slice(start, end).map((todo) => {
    if (query.fields) {
      const filteredTodo = {};
      query.fields.split(",").forEach((field) => {
        filteredTodo[field] = todo[field];
      });
      return filteredTodo;
    } else {
      return todo;
    }
  });
  res.send(filteredTodos);
});

// delete all todo items
router.delete("/", (req, res) => {
  todos = [];
  res.send();
});

// create a new todo
router.post("/", function (req, res, next) {
  const body = req.body;
  const todo = {
    id: Math.max(todos.map((todo) => todo.id)) + 1,
    content: body.content,
    done: false,
  };
  todos.push(todo);
  res.send(todos);
});

// get specific todo item
router.get("/:todoId", (req, res, next) => {
  const todoId = req.params.todoId;
  res.send(todos.filter((todo) => todo.id === todoId)[0]);
});

// update specific todo item
router.put("/:todoId", (req, res, next) => {
  const body = req.body;
  const todoId = req.params.todoId;
  todos[todoId] = {
    ...todos[todoId],
    ...body,
  };
  res.send(todos[todoId]);
});

// delete specific todo item
router.delete("/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  todos = [...todos.slice(0, todoId), ...todos.slice(todoId + 1)];
  res.send();
});

module.exports = router;
