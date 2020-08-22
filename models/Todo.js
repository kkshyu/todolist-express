let todos = [
  { id: 0, content: "sample1", done: false },
  { id: 1, content: "sample2", done: true },
  { id: 2, content: "sample3", done: false },
];

class Todo {
  static getSingleTodo = (id) => {};
  static createTodo = ({ content }) => {
    const todo = {
      id: Math.max(todos.map((todo) => todo.id)) + 1,
      content: content,
      done: false,
    };
    todos.push(todo);
    return todo;
  };
  static deleteTodo = (id) => {};
  static updateTodo = (id, { content, done }) => {};
  static deleteAllTodos = () => {};
  static getTodos = (limit = -1, offset = 0, fields = null) => {
    const start = parseInt(offset) || 0;
    const end = limit ? start + parseInt(limit) : todos.length;
    const filteredTodos = todos.slice(start, end).map((todo) => {
      if (fields) {
        const filteredTodo = {};
        fields.split(",").forEach((field) => {
          filteredTodo[field] = todo[field];
        });
        return filteredTodo;
      } else {
        return todo;
      }
    });
    return filteredTodos;
  };
}

module.exports = Todo;
