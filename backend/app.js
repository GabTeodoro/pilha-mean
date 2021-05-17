const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const clienteRoutes = require("./rotas/clientes");
app.use(cors());
app.use(express.json());
app.use("/imagens", express.static(path.join("backend/imagens")));

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

app.use("/api/clientes", clienteRoutes);

module.exports = app;
