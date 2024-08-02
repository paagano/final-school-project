const express = require("express");

const HeadOfficeStockController = require("../controllers/headOfficeStockController");

const routes = express.Router();

//Route for receiving new stock:
routes.post(
  "/ho-receive-stock",
  HeadOfficeStockController.headOfficeReceiveStock
);

module.exports = routes;
