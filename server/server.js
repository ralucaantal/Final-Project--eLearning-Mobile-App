const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const serverSecret = "parola";
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
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
  res.send("Serverul pentru lucrarea de licenta");
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
                  "insert into users (user_name,email, password,puncte,zile,vieti,tip_cont,avatar) values($1,$2,$3,$4,$5,$6,$7,$8) returning id;",
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
                  console.log(result.rows[0].id);
                  res.send({
                    message: "s-a adaugat cu succes!",
                    idUser: result.rows[0].id,
                  });
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

app.post("/cerereLectie", (req, res) => {
  console.log("req= ", req.body);

  qry = "select * from lectii where id=" + req.body.idLectieCeruta + ";";
  console.log(qry);
  pgClient
    .query(qry)
    .then((res) => res.rows)
    .then((data) => {
      console.log("sunt in fetch de la baza de date");
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
          //console.log("tokenul tau este: ", token);

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

app.post("/cereStatistici", (req, res) => {
  console.log("ai facut post cu datele: ", req.body);

  qry = "select * from statistici where id_user=" + req.body.idUser + ";";

  pgClient
    .query(qry)
    .then((res) => res.rows)
    .then((data) => {
      console.log("sunt in fetch de la baza de date");
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

app.post("/statusIntrebariPropuse", (req, res) => {
  qry =
    "SELECT * FROM intrebari_propuse WHERE id_utilizator=" +
    req.body.idUser +
    ";";

  pgClient
    .query(qry)
    .then((res) => res.rows)
    .then((data) => {
      // console.log(data);
      res.send(data);
    });
});

app.get("/topUtilizatori", (req, res) => {
  pgClient
    .query("SELECT * FROM users ORDER BY puncte DESC;")
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
  let tipIntrebare = "GRILA";

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

app.post("/adaugareIntrebareText", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let textIntrebare = req.body.textIntrebare;
  let raspunsCorect = req.body.raspunsCorect;
  let materie = "BD";
  let idUtilizator = req.body.idUtilizator;
  let status = "In asteptare";
  let tipIntrebare = "TEXT";

  pgClient
    .query(
      "insert into intrebari_propuse (text_intrebare, raspuns_corect,materie,tip_intrebare,id_utilizator,status) values($1,$2,$3,$4,$5,$6);",
      [
        textIntrebare,
        raspunsCorect,
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

app.post("/adaugarePunctajPropunereIntrebare", (req, res) => {
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

app.post("/adaugarePunctajFeedback", (req, res) => {
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

app.post("/adaugareFeedback", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let emoji = req.body.emoji;
  let comentariu = req.body.comentariu;

  pgClient
    .query(
      "insert into feedbacks (feedback_simbol,comentariu) values($1,$2);",
      [emoji, comentariu]
    )
    .then((result) => {
      res.send({ message: "Feedbackul s-a adaugat cu succes!" });
    });
});

app.post("/schimbareAvatar", (req, res) => {
  console.log("ai facut post cu datele: ", req.body);

  qry =
    "UPDATE users SET avatar = " +
    req.body.avatar +
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

app.post("/schimbareEmail", (req, res) => {
  console.log("ai facut post cu datele: ", req.body);

  qry =
    "UPDATE users SET email = '" +
    req.body.newEmail +
    "' WHERE id = " +
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
            message: "s-a actualizat cu succes!",
          });
        });

      // res.send(data);
    });
});

app.post("/schimbareParola", (req, res) => {
  console.log("ai facut post cu datele: ", req.body);

  qry =
    "UPDATE users SET user_name = '" +
    req.body.newUsername +
    "' WHERE id = " +
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
          console.log(data[0].user_name);
          console.log("tokenul tau este: ", token);

          res.send({
            jwt: token,
            message: "s-a actualizat cu succes!",
          });
        });

      // res.send(data);
    });
});

app.post("/schimbareUsername", (req, res) => {
  console.log("ai facut post cu datele: ", req.body);

  qry =
    "UPDATE users SET password = '" +
    req.body.newPassword +
    "' WHERE id = " +
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
            message: "s-a actualizat cu succes!",
          });
        });

      // res.send(data);
    });
});

app.post("/afisareLectii", (req, res) => {
  console.log("req= ", req.body);

  qry =
    "SELECT * FROM lectii WHERE id_sectiune='" +
    req.body.idSectiune +
    "' ORDER BY id ASC;";

  qry1 =
    "SELECT id_lectie FROM progres_lectii_utilizatori WHERE id_sectiune = '" +
    req.body.idSectiune +
    "' AND id_utilizator = " +
    req.body.idUser +
    ";";

  let lectiiParcurse;
  pgClient
    .query(qry1)
    .then((result) => result.rows)
    .then((data) => {
      console.log(data);
      lectiiParcurse = data;
    });

  pgClient
    .query(qry)
    .then((res) => res.rows)
    .then((data) => {
      let objectResponse = [];
      for (let i = 0; i < data.length; i++) {
        let parcurs = false;
        for (let j = 0; j < lectiiParcurse.length; j++) {
          if (data[i].id === lectiiParcurse[j].id_lectie) {
            parcurs = true;
          }
        }
        let object = {
          id: data[i].id,
          nume: data[i].nume,
          complet: parcurs,
        };
        objectResponse.push(object);
      }
      console.log("sunt in fetch de la baza de date");
      console.log(objectResponse);
      res.send(objectResponse);
    });
});

app.post("/afisareSectiuni", (req, res) => {
  console.log("req= ", req.body);

  // console.log(req.body.nrIntrebari);
  // console.log(req.body.materiiCerute[0]);

  qry = "select * from sectiuni where materie='" + req.body.nume + "';";

  qry1 =
    "SELECT nume_sectiune FROM progres_sectiuni_utilizatori WHERE curs = '" +
    req.body.nume +
    "' AND id_utilizator = " +
    req.body.idUser +
    ";";

  let sectiuniParcurse;
  pgClient
    .query(qry1)
    .then((result) => result.rows)
    .then((data) => {
      console.log(data);
      sectiuniParcurse = data;
    });

  pgClient
    .query(qry)
    .then((res) => res.rows)
    .then((data) => {
      let objectResponse = [];
      for (let i = 0; i < data.length; i++) {
        let parcurs = false;
        for (let j = 0; j < sectiuniParcurse.length; j++) {
          if (data[i].nume === sectiuniParcurse[j].nume_sectiune) {
            parcurs = true;
          }
        }
        let object = {
          id: data[i].id,
          nume: data[i].nume,
          materie: data[i].materie,
          complet: parcurs,
        };
        objectResponse.push(object);
      }
      console.log("sunt in fetch de la baza de date");
      console.log(objectResponse);
      res.send(objectResponse);
    });
});

app.post("/adaugareQuiz", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let idUser = req.body.idUser;
  let materii = req.body.materii;
  let nrIntrebari = req.body.nrIntrebari;
  //let oraStart = req.body.oraStart;

  const oraStart = new Date(req.body.oraStart);
  const oraStartFormatata = oraStart.toLocaleTimeString();
  console.log(oraStartFormatata);

  pgClient
    .query(
      "INSERT INTO quizes (id_utilizator, numar_intrebari, materii,start) VALUES ($1, $2, $3,$4) RETURNING id;",
      [idUser, nrIntrebari, materii, oraStart]
    )
    .then((result) => {
      const quizId = result.rows[0].id;
      res.send({ message: "s-a adaugat cu succes!", quizId: quizId });
    });
});

app.post("/creareStatistici", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let idUser = req.body.idUser;
  let currentDate = new Date();

  let dataCreare = currentDate.toLocaleTimeString();
  let ultimaActiune = "Creare cont";
  let dataUltimaActiune = currentDate.toLocaleTimeString();

  let nrLectiiParcurse = 0;
  let nrTesteRezolvate = 0;
  let nrGreseli = 0;
  let nrRaspunsuriCorecte = 0;

  //let oraStart = req.body.oraStart;

  pgClient
    .query(
      "INSERT INTO statistici (id_user, data_creare, ultima_actiune, data_ultima_actiune,nr_lectii_parcurse,nr_teste_rezolvate,nr_greseli,nr_raspunsuri_corecte) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING id;",
      [
        idUser,
        dataCreare,
        ultimaActiune,
        dataUltimaActiune,
        nrLectiiParcurse,
        nrTesteRezolvate,
        nrGreseli,
        nrRaspunsuriCorecte,
      ]
    )
    .then((result) => {
      res.send({ message: "s-a adaugat cu succes!" });
    });
});

app.post("/validareCod", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let cod = req.body.cod;
  let now = new Date();

  pgClient
    .query("select * from quizes where id=$1;", [cod])
    .then((result) => result.rows)
    .then((data) => {
      console.log("sunt in fetch de la baza de date");
      console.log(data.length);
      if (data.length !== 0) {
        console.log("Cod ok");
        var start = new Date(data[0].start);
        var end = new Date(start.getTime() + 20 * 60 * 1000); // Adaugă 20 de minute la data de start

        if (now >= start && now <= end) {
          console.log(data[0].numar_intrebari);
          res.send({
            message: "Se poate rezolva quiz-ul.",
            materii: data[0].materii,
            nrIntrebari: data[0].numar_intrebari,
          });
        } else if (now < start) {
          res.send({ message: "Quiz-ul nu este disponibil încă." });
        } else {
          res.send({ message: "Quiz-ul a expirat." });
        }
      } else {
        res.send({ message: "Nu" });
      }
    })
    .catch((error) => {
      console.error("Eroare la interogare:", error);
      res.send({ message: "Eroare la interogare" });
    });
});

app.post("/adaugareProgresUtilizator", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let idUser = req.body.idUser;
  let idLectie = req.body.idLectie;
  let idSectiune = req.body.idSectiune;

  pgClient
    .query(
      "INSERT INTO progres_lectii_utilizatori (id_lectie, id_sectiune, id_utilizator) SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT * FROM progres_lectii_utilizatori WHERE id_lectie = $1 AND id_sectiune = $2 AND id_utilizator = $3);",
      [idLectie, idSectiune, idUser]
    )
    .then((res) => {
      res.send({ message: "s-a adaugat cu succes!" });
    });
});

app.post("/adaugareProgresSectiuni", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let idUser = req.body.idUser;
  let numeSectiune = req.body.numeSectiune;
  let materie = req.body.materie;

  pgClient
    .query(
      "INSERT INTO progres_sectiuni_utilizatori (nume_sectiune,id_utilizator, curs) SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT * FROM progres_sectiuni_utilizatori WHERE nume_sectiune = $1 AND id_utilizator = $2 AND materie=$3);",
      [numeSectiune, idUser, materie]
    )
    .then((res) => {
      res.send({ message: "s-a adaugat cu succes!" });
    });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
