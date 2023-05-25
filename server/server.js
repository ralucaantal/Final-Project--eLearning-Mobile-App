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
      "select id,email,user_name, password,zile,puncte,vieti,avatar from users where email=$1;",
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
                avatar: data[0].avatar,
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
  const avatar = 2;

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
                  "insert into users (user_name,email, password,puncte,zile,vieti,tip_cont,avatar) values($1,$2,$3,$4,$5,$6,$7,$8);",
                  [
                    username,
                    email,
                    password,
                    puncte,
                    zile,
                    vieti,
                    tipCont,
                    avatar,
                  ]
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

      pgClient
        .query(
          "select id,email,user_name, password,zile,puncte,vieti from users where id=$1;",
          [req.body.idUser]
        )
        .then((res) => res.rows)
        .then((data) => {
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
            jwt: token,
          });
        });

      // res.send(data);
    });
});

app.post("/puncteZileVieti", (req, res) => {
  console.log("ai facut post cu datele: ", req.body);

  qry =
    "select zile, puncte, vieti from users where id=" + req.body.idUser + ";";

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

app.post("/verificareRaspunsText", (req, res) => {
  console.log("ai facut post cu datele: ", req.body);

  qry1 = req.body.raspunsCorect;
  qry2 = req.body.raspunsText;

  jsonResult1 = "";
  jsonResult2 = "";

  canCompare = 0;

  pgClient
    .query(qry1)
    .then((res) => res.rows)
    .then((data) => {
      console.log("Am primit raspunsul de la prima interogare");
      jsonResult1 = data;
    });

  pgClient
    .query(qry2)
    .then((res) => res.rows)
    .then((data) => {
      console.log("Am primit raspunsul de la a doua interogare");
      jsonResult2 = data;
      canCompare = 1;
      console.log("can compare: ", canCompare);
      canCompare = 1;
      if (canCompare === 1) {
        if (jsonResult1.length != jsonResult2.length) {
          res.send({
            message: "Raspuns gresit! Numarul de linii nu corespunde",
          });
        } else {
          semafor1 = 1;

          for (index1 = 0; index1 < jsonResult2.length; index1++) {
            //console.log("obiectul este: ", jsonResult1[index1]);
            semafor2 = 0;
            if (semafor1 == 1) {
              for (index2 = 0; index2 < jsonResult1.length; index2++) {
                if (
                  !(
                    JSON.stringify(jsonResult1[index1]) ===
                    JSON.stringify(jsonResult2[index2])
                  )
                ) {
                  semafor2 = 1;
                }
              }

              if (semafor2 == 0) {
                semafor1 = 0;
              } else {
                semafor2 = 0;
              }
            }
          }

          if (semafor1 == 1) {
            res.send({ message: "Raspuns corect!" });
          } else {
            res.send({ message: "Raspuns gresit dupa cautari!" });
          }
        }
      }
    })
    .catch((err) => {
      canCompare = -1;
      res.send({ message: "Raspuns gresit" });
    });
});

app.get("/cursuriDisponibile", (req, res) => {
  pgClient
    .query("SELECT * FROM cursuri_disponibile;")
    .then((res) => res.rows)
    .then((data) => {
      res.send(data);
    });
});

app.post("/adaugareGrila", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let textIntrebare = req.body.textIntrebare;
  let varianta1 = req.body.varianta1;
  let varianta2 = req.body.varianta2;
  let varianta3 = req.body.varianta3;
  let varianta4 = req.body.varianta4;
  let raspunsCorect = req.body.raspunsCorect;
  let materie = req.body.materie;
  let idUtilizator = req.body.idUtilizator;
  let status = "In asteptare";
  let tipIntrebare = 
  "GRILA";

  pgClient
    .query(
      "insert into intrebari_propuse (text_intrebare, raspuns_corect,varianta1,varianta2,varianta3,varianta4,materie,tip_intrebare,id_utilizator,status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);",
      [
        textIntrebare,
        raspunsCorect,
        varianta1,
        varianta2,
        varianta3,
        varianta4,
        materie,
        tipIntrebare,
        idUtilizator,
        status,
      ]
    )
    .then((result) => {
      res.send({ message: "Intrebarea s-a adaugat cu succes!" });
    });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
