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
  cliente.save().then((clienteInserido) => {
    res.status(201).json({
      mensagem: "Cliente inserido",
      id: clienteInserido._id,
    });
  });
});

app.get("/api/clientes", (req, res, next) => {
  Cliente.find().then((documents) => {
    res.status(200).json({
      mensagem: "Tudo OK",
      clientes: documents,
    });
  });
});

app.delete("/api/clientes/:id", (req, res, next) => {
  Cliente.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Cliente removido" });
  });
});

app.put("/api/clientes/:id", (req, res, next) => {
  const cliente = new Cliente({
    _id: req.params.id,
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email,
  });

  Cliente.updateOne({ _id: req.params.id }, cliente).then((resultado) => {
    console.log(resultado);
  });
  res.status(200).json({ mensagem: "Atualização feita com sucesso" });
});

app.get("/api/clientes/:id", (req, res, next) => {
  Cliente.findById(req.params.id).then((cli) => {
    if (cli) {
      res.status(200).json(cli);
    } else {
      res.status(400).json({ mensagem: "Cliente não encontrado!" });
    }
  });
});

module.exports = app;
