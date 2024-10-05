const express = require("express");

const BranchOrdersController = require("../controllers/branchOrdersController");
const HeadOfficeOrdersController = require("../controllers/headOfficeOrdersController");
const authController = require("../auth/jwtHelpers");
const { verifyAccessToken } = require("../auth/jwtHelpers");

const routes = express.Router();

//Route for making a new order - Branch:
routes.post(
  "/make-order",
  verifyAccessToken,
  authController.restrict("branch-admin"),
  BranchOrdersController.branchMakeOrder
);

//Route for getting all orders - Branch:
routes.get(
  "/get-branch-orders",
  verifyAccessToken,
  authController.restrict("ho-card-center"),
  BranchOrdersController.getAllBranchOrders
);

//Route for getting card orders by branch ID:
routes.get(
  "/get-my-branch-orders/:branchCode",
  verifyAccessToken,
  authController.restrict("branch-admin", "ho-card-center"),
  BranchOrdersController.getCardOrdersByBranch
);

//Route for making a new order - Head Office:
routes.post(
  "/ho-make-order",
  verifyAccessToken,
  authController.restrict("ho-card-center"),
  HeadOfficeOrdersController.headOfficeMakeOrder
);

//Route for getting all orders - Head Office:
routes.get(
  "/get-ho-orders",
  verifyAccessToken,
  authController.restrict("ho-card-center"),
  HeadOfficeOrdersController.getAllHeadOfficeOrders
);

module.exports = routes;
