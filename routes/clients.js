const express = require("express");
const { getClients, addClient } = require("../controllers/clients");
const router = express.Router();

router
  .route("/")
  .get(getClients)
  .post(addClient);

module.exports = router;
