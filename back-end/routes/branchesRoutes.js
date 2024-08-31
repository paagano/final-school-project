const express = require("express");

const BranchesController = require("../controllers/branchesController");
const { verifyAccessToken } = require("../auth/jwthelpers");
const authController = require("../helpers/jwtHelpers");

const routes = express.Router();

//Route for adding or creating a new branch:
routes.post(
  "/create-branch",
  verifyAccessToken,
  authController.restrict("admin"),
  BranchesController.addBranch
);

//Route for getting a single branch record by id:
routes.get("/:branchCode", BranchesController.getBranch);

//Route for getting list of all branches:
routes.get("/", BranchesController.getAllBranches);

//Route for updating a branch:
routes.put(
  "/:branchCode",
  verifyAccessToken,
  authController.restrict("admin"),
  BranchesController.updateBranch
);
routes.patch(
  "/:branchCode",
  verifyAccessToken,
  authController.restrict("admin"),
  BranchesController.updateBranch
);

//Route for deleting a branch:
routes.delete(
  "/delete-branch/:branchCode",
  verifyAccessToken,
  authController.restrict("admin"),
  BranchesController.deleteBranch
);

module.exports = routes;
