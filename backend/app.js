const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
const mongoose = require("mongoose");
const Cliente = require("./models/cliente");
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.3i7uo.mongodb.net/app-mean?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conexão OK");
  })
  .catch(() => {
    console.log("Conexão NOK");
  });

app.use(bodyParser.json());

const clientes = [
  {
    id: "1",
    nome: "José",
    fone: "11974256512",
    email: "jose@mail.com",
  },
  {
    id: "2",
    nome: "Jaqueline",
    fone: "22985236541",
    email: "jaqueline@gmail.com",
  },
];

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Acess-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS"
//   );

//   next();
// });

app.post("/api/clientes", (req, res, next) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email,
  });
  cliente.save();
  console.log(cliente);
  res.status(201).json({ mensagem: "Cliente inserido" });
});

app.get("/api/clientes", (req, res, next) => {
  Cliente.find().then((documents) => {
    res.status(200).json({
      mensagem: "Tudo OK",
      clientes: documents,
    });
  });
});

module.exports = app;
