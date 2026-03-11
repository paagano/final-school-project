const express = require("express");
const { changePassword } = require("../controllers/changePassword");

const routes = express.Router();

routes.post("/change-password", changePassword);

module.exports = routes;
