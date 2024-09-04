const express = require("express");

const RolesController = require("../controllers/rolesController");
const authController = require("../helpers/jwtHelpers");
const { verifyAccessToken } = require("../auth/jwtHelpers");

const routes = express.Router();

//Route for adding or creating a new role:
routes.post(
  "/create-role",
  verifyAccessToken,
  authController.restrict("admin"),
  RolesController.addNewRole
);

//Route for getting a single role record by id:
routes.get("/:roleId", verifyAccessToken, RolesController.getRole);

//Route for getting list of all roles:
routes.get("/", verifyAccessToken, RolesController.getAllRoles);

//Route for updating a role:
routes.put(
  "/:roleId",
  verifyAccessToken,
  authController.restrict("admin"),
  RolesController.updateRole
);
routes.patch(
  "/:roleId",
  verifyAccessToken,
  authController.restrict("admin"),
  RolesController.updateRole
);

//Route for deleting a role:
routes.delete(
  "/:roleId",
  verifyAccessToken,
  authController.restrict("admin"),
  RolesController.deleteRole
);

module.exports = routes;
