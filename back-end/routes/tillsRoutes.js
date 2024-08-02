const express = require("express");
const authController = require("../helpers/jwtHelpers");

const TillsController = require("../controllers/tillsController");
const { verifyAccessToken } = require("../auth/jwthelpers");

const routes = express.Router();

//Route for creating a new till:
routes.post(
  "/create-till",
  verifyAccessToken,
  authController.restrict("admin"),
  TillsController.createNewTill
);

//Route for getting a single till record by id:
routes.get("/get-till/:tillNumber", TillsController.getTill);

//Route for getting list of all tills
routes.get("/", TillsController.getAllTills);

//Route for deleting a till:
routes.delete(
  "/delete-till/:tillNumber",
  verifyAccessToken,
  authController.restrict("admin"),
  TillsController.deleteTill
);

module.exports = routes;
