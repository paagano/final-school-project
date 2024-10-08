const express = require("express");
const { selfResetPassword } = require("../controllers/selfResetPassword");
const routes = express.Router();

routes.post("/self-reset-password", selfResetPassword);

module.exports = routes;
