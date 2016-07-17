const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));

function suggestWords(text) {
  const words = ["hello", "world", "bob", "alice", "john", "alex", "jonathan"];

  if(text.length > 0) {
    const regex = new RegExp("^"+text);
    return words.filter(function(word) {
      return regex.test(word);
    });
  } else {
    return [];
  }
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/suggest", (req, res) => {
  res.json(suggestWords(req.query.text));
});

app.listen(3000, function(err) {
  console.log("Server started");
});
