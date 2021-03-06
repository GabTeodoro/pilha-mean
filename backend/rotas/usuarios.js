const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const usuario = new Usuario({
      email: req.body.email,
      password: req.body.password,
    });
    usuario
      .save()
      .then((result) => {
        res.status(201).json({
          mensagem: "Usuario criado",
          resultado: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          mensagem: "Erro com as credenciais.",
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let user;
  Usuario.findOne({ email: req.body.email })
    .then((u) => {
      user = u;
      if (!u) {
        return res.status(401).json({
          mensagem: "E-mail inválido",
        });
      }
      return bcrypt.compare(req.body.password, u.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          mensagem: "Senha inválida",
        });
      }
      const token = jwt.sign({ email: user.email, id: use._id }, "minhasenha", {
        expiresIn: "1h",
      });
      res
        .status(200)
        .json({ token: token, expiresIn: 3600, idUsuario: user._id });
    })
    .catch((err) => {
      return res.status(401).json({
        mensagem: "Erro ao login. Tente novamente mais tarde.",
      });
    });
});

module.exports = router;
