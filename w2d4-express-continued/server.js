"use strict";

const PORT        = 8080;
const express     = require("express");
const bodyParser  = require("body-parser");
const app         = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log(req.query.email);
  res.render("index", {email: req.query.email, error: ""});
});

app.get("/login", (req, res) => {
  res.send("get-content");
});

app.post("/login", (req, res) => {
  var valid = false; // TODO: check if form parameters are correct

  if(valid) {
    // optionally do something with database, set a cookie, etc.
    res.redirect("/welcome");
  } else {
    // if form data is invalid, there are 3 approaches:
    // 1: redirect back to the form (user loses the data they typed in)
    // res.redirect("/")
    // 2: redirect back to the form w/ params (params get put in url)
    // res.redirect("/?email="+req.body.email);
    // 3: render the same template, with the user's data:
    res.render("index", {email: req.body.email,
                         error: "Your email was wrong"});
  }
});

app.get("/welcome", (req, res) => {
  res.send("welcome");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
