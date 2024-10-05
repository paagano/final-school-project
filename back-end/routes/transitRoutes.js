const express = require("express");

const TransitStocksController = require("../controllers/transitStocksController");
const authController = require("../auth/jwtHelpers");
const { verifyAccessToken } = require("../auth/jwtHelpers");

const routes = express.Router();

// Route for releasing stock from HQ to courier:
routes.post(
  "/ho-courier-stock",
  verifyAccessToken,
  authController.restrict("ho-card-center"),
  TransitStocksController.headOfficeHandStockToCourier
);

// Route for releasing stock from Branch to courier:
routes.post(
  "/branch-courier-stock",
  verifyAccessToken,
  authController.restrict("branch-admin"),
  TransitStocksController.branchHandStockToCourier
);

// Branch Receive Stock From Courier:
routes.post(
  "/branch-receive-stock",
  verifyAccessToken,
  authController.restrict("branch-admin", "ho-card-center"),
  TransitStocksController.branchReceiveStockFromCourier
);

module.exports = routes;
