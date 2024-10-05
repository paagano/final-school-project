const express = require("express");

const HeadOfficeStockController = require("../controllers/headOfficeStockController");
const authController = require("../auth/jwtHelpers");
const { verifyAccessToken } = require("../auth/jwtHelpers");

const routes = express.Router();

//Route for receiving new stock:
routes.post(
  "/ho-receive-stock",
  verifyAccessToken,
  authController.restrict("ho-card-center"),
  HeadOfficeStockController.headOfficeReceiveStock
);

module.exports = routes;
