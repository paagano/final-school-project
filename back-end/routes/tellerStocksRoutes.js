const express = require("express");

const TellerStocksController = require("../controllers/tellerStocksController");
const { verifyAccessToken } = require("../helpers/jwtHelpers");

const routes = express.Router();

//Route for issuing card to teller from branch vault:
routes.post(
  "/voult-to-till",
  verifyAccessToken,
  TellerStocksController.branchAdminHandStockToTeller
);

//Route for returning card from teller till to branch vault:
routes.post(
  "/till-to-voult",
  TellerStocksController.tellerReturnStockToBranchVoult
);

//Route for issuing card to customer:
routes.post(
  "/teller-issue-card",
  TellerStocksController.tellerIssueCardToCustomer
);

//Route for teller capture spoilt card:
routes.post(
  "/teller-capture-spoilt-card",
  TellerStocksController.tellerCaptureSpoiltCard
);

//Route for Admin capture spoilt card:
routes.patch(
  "/admin-capture-spoilt-card",
  TellerStocksController.branchAdminCaptureSpoiltCard
);

module.exports = routes;
