const mongoose = require("mongoose");

const clienteSchema = mongoose.Schema({
  nome: { type: "string", required: true },
  fone: { type: "string", required: false, default: "00000000" },
  email: { type: "string", required: true },
});

module.exports = mongoose.model("Cliente", clienteSchema);
