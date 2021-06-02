const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios')
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000);

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));



app.get("/", (req, res) => {
  res.render('signin')
});
app.get("/sign-up", (req, res) => {
  res.render('signup')
});

app.get("/boards", (req, res) => {
  
  res.render('home')
});


