const express = require("express");

const TransitStocksController = require("../controllers/transitStocksController");

const routes = express.Router();

// Route for releasing stock from HQ to courier:
routes.post(
  "/ho-courier-stock",
  TransitStocksController.headOfficeHandStockToCourier
);

// Route for releasing stock from Branch to courier:
routes.post(
  "/branch-courier-stock",
  TransitStocksController.branchHandStockToCourier
);

// Branch Receive Stock From Courier:
routes.post(
  "/branch-receive-stock",
  TransitStocksController.branchReceiveStockFromCourier
);

module.exports = routes;
