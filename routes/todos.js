var express = require("express");
var router = express.Router();
const yup = require("yup");
const Todo = require("../models/Todo");
const authMiddleware = require("../middlewares/auth");

// get all todo items
router.get("/", (req, res, next) => {
  const query = req.query;
  const todos = Todo.getTodos(query.limit, query.offset, query.fields);
  res.send({
    code: "SUCCESS",
    message: "get filtered todolist",
    result: todos,
  });
});

// delete all todo items
router.delete("/", (req, res) => {
  const todos = Todo.getTodos();
  todos = [];
  res.send();
});

// create a new todo
router.post("/", authMiddleware, function (req, res, next) {
  const body = req.body;

  // schema
  const bodySchema = yup.object({
    content: yup.string().required(),
  });

  let castedBody;
  try {
    castedBody = bodySchema.validateSync(body);
  } catch (e) {
    return res.send({
      code: "E_INPUT",
      message: e.toString(),
      result: null,
    });
  }

  const todo = Todo.createTodo({
    content: `${req.session.email}: ${castedBody.content}`,
  });

  // fire event from Presenter (similar to MVVM)
  const sse = req.app.get("sse");
  sse.send({
    type: "NEW_TODO",
    data: todo,
  });

  res.send({
    code: "SUCCESS",
    message: "create new todo successfully",
    result: todo,
  });
});

// get specific todo item
router.get("/:todoId", (req, res, next) => {
  const todoId = req.params.todoId;
  const todos = Todo.getTodos();
  res.send(todos.filter((todo) => todo.id === todoId)[0]);
});

// update specific todo item
router.put("/:todoId", (req, res, next) => {
  const todos = Todo.getTodos();
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
  const todos = Todo.getTodos();
  const todoId = req.params.todoId;
  todos = [...todos.slice(0, todoId), ...todos.slice(todoId + 1)];
  res.send();
});

module.exports = router;
