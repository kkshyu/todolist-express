$("#btn-add").click(() => {
  const token = Cookies.get("token");
  $.ajax({
    method: "post",
    url: "/todos",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { content: "xxxx" },
  }).done(({ code, message, result }) => {
    if (code !== "SUCCESS") {
      alert(message);
    } else {
      $(".todolist").append($("<li>").html(result.content));
    }
  });
});

// const source = new EventSource("/events");
// source.addEventListener("message", (messageEvent) => {
//   console.log("get messageEvent", messageEvent);
//   console.log(messageEvent.data);
//   const messageData = JSON.parse(messageEvent.data);
//   $(".todolist").append($("<li>").html(messageData.data.content));
// });

let ws = new WebSocket(`ws://${window.location.host}/ws`);
ws.onopen = (event) => {
  console.log("open connection", event);
  $("#btn-send-ws").attr("disabled", false);
};
ws.onmessage = (message) => {
  console.log("get message", message.data);
};
ws.onclose = () => {
  console.log("close connection");
  $("#btn-send-ws").attr("disabled", true);
};

$("#btn-send-ws").click(() => {
  ws.send(new Date());
});
