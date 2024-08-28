const express = require("express");

const UsersController = require("../controllers/usersController");
const { verifyAccessToken } = require("../helpers/jwtHelpers");
const authController = require("../helpers/jwtHelpers");

const routes = express.Router();

// Register User:
routes.post(
  "/register",
  verifyAccessToken,
  authController.restrict("admin"),
  UsersController.registerUser
);

// Login User:
routes.post("/login", UsersController.loginUser);

//Route for getting a single user record by id:
routes.get("/:userId", verifyAccessToken, UsersController.getUser);

//Route for getting list of all users:
routes.get("/", UsersController.getAllUsers);

//Route for updating a user:
routes.put(
  "/update-user/:userId",
  verifyAccessToken,
  authController.restrict("admin"),
  UsersController.updateUser
);
routes.patch(
  "/update-user/:userId",
  verifyAccessToken,
  authController.restrict("admin"),
  UsersController.updateUser
);

// Delete User:
routes.delete(
  "/delete-user/:userId",
  verifyAccessToken,
  authController.restrict("admin"),
  UsersController.deleteUser
);

module.exports = routes;
