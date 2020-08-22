$("#btn-add").click(() => {
  $.ajax({
    method: "post",
    url: "/todos",
    data: { content: "xxxx" },
  }).done(({ code, message, result }) => {
    // TODO: update DOM
    $(".todolist").append($("<li>").html(result.content));
  });
});
