const express = require("express");

const TellerStocksController = require("../controllers/tellerStocksController");
const authController = require("../auth/jwtHelpers");
const { verifyAccessToken } = require("../auth/jwtHelpers");

const routes = express.Router();

//Route for issuing card to teller from branch vault:
routes.post(
  "/voult-to-till",
  verifyAccessToken,
  authController.restrict("branch-admin", "teller", "branch-front-office"),
  TellerStocksController.branchAdminHandStockToTeller
);

//Route for returning card from teller till to branch vault:
routes.post(
  "/till-to-voult",
  verifyAccessToken,
  authController.restrict("branch-admin", "teller", "branch-front-office"),
  TellerStocksController.tellerReturnStockToBranchVoult
);

//Route for issuing card to customer:
routes.post(
  "/teller-issue-card",
  verifyAccessToken,
  authController.restrict("branch-admin", "teller", "branch-front-office"),
  TellerStocksController.tellerIssueCardToCustomer
);

//Route for teller capture spoilt card:
routes.post(
  "/teller-capture-spoilt-card",
  verifyAccessToken,
  authController.restrict("branch-admin", "teller", "branch-front-office"),
  TellerStocksController.tellerCaptureSpoiltCard
);

//Route for Branch Admin capture spoilt card:
routes.post(
  "/branch-admin-capture-spoilt-card",
  verifyAccessToken,
  authController.restrict("branch-admin"),
  TellerStocksController.branchAdminCaptureSpoiltCard
);

//Route for getting list of all spoilt card:
routes.get(
  "/get-spoilt-cards",
  verifyAccessToken,
  authController.restrict("ho-card-center"),
  TellerStocksController.getSpoiltCards
);

//Route for getting list of all spoilt card by user ID:
routes.get(
  "/my-spoilt-cards/:userId",
  verifyAccessToken,
  TellerStocksController.getSpoiltCardsByUserId
);

//Route for getting list of all spoilt cards per branch:
routes.get(
  "/branch-spoilt-cards/:branchCode",
  verifyAccessToken,
  authController.restrict("branch-admin"),
  TellerStocksController.getSpoiltCardsByBranch
);

module.exports = routes;
