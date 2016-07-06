function showSuggestions(words) {
  $("#suggestions").html("");
  for(word of words) {
    $("<div>").text(word).appendTo($("#suggestions"));
  }
}

function fetchSuggestions(text) {
  $.ajax({
    method: "GET",
    url: "/suggest",
    data: { text: text }
  }).done(function(data) {
    showSuggestions(data);
  });
}

$(function() {
  $("#search").on("keyup", function(e) {
    fetchSuggestions($(this).val());
  });
});
