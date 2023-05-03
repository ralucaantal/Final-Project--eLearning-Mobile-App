const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const serverSecret = "parola";
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

var pg = require("pg");
var connectionString = "postgres://postgres:6203@localhost:5432/eLearningApp";
var pgClient = new pg.Client(connectionString);
pgClient.connect();

var bodyParser = require("body-parser");
app.use(bodyParser.json({ type: "application/json" }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send(
    "Serverul pentru lucrarea de licenta e inaugurat astazi, 30.03.2023"
  );
});

app.post("/decodeJWT", (req, res) => {
  console.log("req= ", req.body);
  let token = req.body.jwt;
  console.log("token= ", token);
  jwt.verify(token, serverSecret, (err, decoded) => {
    if (err) {
      console.log("Este o eroare la decodarea jwt");
      res.send({ message: "Este o eroare la decodarea jwt" });
    } else {
      console.log(decoded.data);
      res.send({
        id: decoded.data.id,
        username: decoded.data.user_name,
        password: decoded.data.password,
        email: decoded.data.email,
      });
    }
  });
});

app.post("/login", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body.email, req.body.password);
  //verific daca exista utilizatorul in baza de date
  pgClient
    .query(
      "select id,email,user_name, password,zile,puncte,vieti from users where email=$1;",
      [email]
    )
    .then((res) => res.rows)
    .then((data) => {
      console.log("sunt in fetch de la baza de date");
      console.log(data.length);
      if (data.length == 0) {
        console.log("nu exista");
        res.send({ message: "Email sau parola invalide" });
      } else {
        console.log("utilizatorul exista");

        //verific parolele
        if (password === data[0].password) {
          let token = jwt.sign(
            {
              data: {
                id: data[0].id,
                username: data[0].user_name,
                password: data[0].password,
                email: data[0].email,
                zile: data[0].zile,
                puncte: data[0].puncte,
                vieti: data[0].vieti,
              },
            },
            serverSecret,
            { expiresIn: "24h" }
          );
          console.log("tokenul tau este: ", token);

          res.send({
            message: "Login efectuat cu succes!",
            jwt: token,
          });
        } else {
          res.send({ message: "Date invalide" });
        }
      }
    });
});

app.post("/register", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let puncte = 1000;
  let zile = 0;
  let vieti = 5;
  let tipCont = "USER";
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
          .query("select user_name from users where user_name=$1;", [username])
          .then((res) => res.rows)
          .then((data) => {
            if (data.length == 0) {
              console.log("nu exista");
              pgClient
                .query(
                  "insert into users (user_name,email, password,puncte,zile,vieti,tip_cont) values($1,$2,$3,$4,$5,$6,$7);",
                  [username, email, password, puncte, zile, vieti, tipCont]
                )
                .then((result) => {
                  res.send({ message: "s-a adaugat cu succes!" });
                });
            } else {
              res.send({ message: "Acest username deja exista!" });
            }
          });
      } else {
        console.log("utilizatorul exista");
        res.send({ message: "Acesta adresa de email este inregistrata!" });
      }
    });
});

app.post("/trainingQuiz", (req, res) => {
  console.log("req= ", req.body);

  // console.log(req.body.nrIntrebari);
  // console.log(req.body.materiiCerute[0]);

  console.log(
    req.body.materiiCerute.includes("Bazele Programării Calculatoarelor")
  );

  let materii = "";

  if (req.body.materiiCerute.includes("Bazele Programării Calculatoarelor")) {
    materii += "'BPC'";
  }
  if (req.body.materiiCerute.includes("Programare Orietată Obiect (POO)")) {
    if (materii != "") {
      materii += ", ";
    }
    materii += "'POO'";
  }
  if (req.body.materiiCerute.includes("Baze De Date")) {
    if (materii != "") {
      materii += ", ";
    }
    materii += "'BD'";
  }

  console.log(materii);
  qry =
    "select * from intrebari where materie in (" +
    materii +
    ") LIMIT " +
    req.body.nrIntrebari +
    ";";

  console.log(qry);
  pgClient
    .query(qry)
    .then((res) => res.rows)
    .then((data) => {
      console.log("sunt in fetch de la baza de date");
      // console.log(data);
      res.send(data);
    });
});

app.post("/adaugarePunctajQuizIndividual", (req, res) => {
  console.log("ai facut post cu datele: ", req.body);

  qry =
    "UPDATE users SET puncte = puncte + " +
    req.body.puncteCastigate +
    " WHERE id = " +
    req.body.idUser +
    ";";

  console.log(qry);

  pgClient
    .query(qry)
    .then((res) => res.rows)
    .then((data) => {
      console.log("sunt in fetch de la baza de date");
      // console.log(data);
      res.send(data);
    });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
