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

app.post("/login", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let username = req.body.email;
  let password = req.body.password;
  console.log(req.body.email, req.body.password);
  //verific daca exista utilizatorul in baza de date
  pgClient
    .query("select id,email, password from users where email=$1;", [username])
    .then((res) => res.rows)
    .then((data) => {
      console.log("sunt in fetch de la baza de date");
      console.log(data.length);
      if (data.length == 0) {
        console.log("nu exista");
        res.send({ message: "Username sau parola invalide" });
      } else {
        console.log("utilizatorul exista");

        //verific parolele
        if (password === data[0].password) {
          // let token = jwt.sign(
          //   {
          //     data: {
          //       id: data[0].id_user,
          //       username: data[0].username,
          //       password: data[0].password,
          //       type: data[0].tip,
          //     },
          //   },
          //   serverSecret,
          //   { expiresIn: "24h" }
          // );
          // console.log("tokenul tau este: ", token);

          res.send({
            message: "Login efectuat cu succes!",
          });
        } else {
          res.send({ message: "Date invalide" });
        }
      }
    });
});

app.post("/register", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let fullName = req.body.fullName;
  let email = req.body.email;
  let password = req.body.password;
  //verific daca exista utilizatorul in baza de date
  pgClient
    .query("select email from users where email=$1;", [email])
    .then((res) => res.rows)
    .then((data) => {
      console.log("sunt in fetch de la baza de date");
      console.log(data);
      console.log(data.length);
      if (data.length == 0) {
        console.log("nu exista");
        pgClient
          .query(
            "insert into users (user_name,email, password) values($1,$2,$3);",
            [fullName, email, password]
          )
          .then((result) => {
            res.send({ message: "s-a adaugat cu succes!" });
          });
      } else {
        console.log("utilizatorul exista");
        res.send({ message: "utilizatorul deja exista" });
      }
    });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
