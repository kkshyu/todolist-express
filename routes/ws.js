const debug = require("debug")("todolist-express:server");

wsRouter = (ws, req) => {
  ws.on("message", (msg) => {
    debug(msg);
    ws.send(msg);
  });
};

module.exports = wsRouter;
