const express = require("express");

const HeadOfficeStockController = require("../controllers/headOfficeStockController");
const authController = require("../auth/jwtHelpers");
const { verifyAccessToken } = require("../auth/jwtHelpers");

const routes = express.Router();

//Route for issuing stock to branch:
routes.post(
  "/ho-issue-stock",
  verifyAccessToken,
  authController.restrict("ho-card-center"),
  HeadOfficeStockController.headOfficeIssueStockToBranch
);

module.exports = routes;
