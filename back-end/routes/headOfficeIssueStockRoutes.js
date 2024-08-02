const express = require("express");

const HeadOfficeStockController = require("../controllers/headOfficeStockController");

const routes = express.Router();

//Route for issuing stock to branch:
routes.post(
  "/ho-issue-stock",
  HeadOfficeStockController.headOfficeIssueStockToBranch
);

module.exports = routes;
