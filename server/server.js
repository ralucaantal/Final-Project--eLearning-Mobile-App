const express = require("express");
const app = express();

var pg = require("pg");
var connectionString = "postgres://postgres:6203@localhost:5432/eLearningApp";
var pgClient = new pg.Client(connectionString);
pgClient.connect();

var bodyParser = require("body-parser");
app.use(bodyParser.json({ type: "application/json" }));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    "Serverul pentru lucrarea de licenta e inaugurat astazi, 30.03.2023"
  );
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
