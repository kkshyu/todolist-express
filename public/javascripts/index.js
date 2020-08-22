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
    // $(".todolist").append($("<li>").html(result.content));
  });
});

const source = new EventSource("/events");
source.addEventListener("message", (messageEvent) => {
  console.log("get messageEvent", messageEvent);
  console.log(messageEvent.data);
  const messageData = JSON.parse(messageEvent.data);
  $(".todolist").append($("<li>").html(messageData.data.content));
});
