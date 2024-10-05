const { where } = require("sequelize");
const db = require("../models/dbConnect.js");
const createError = require("http-errors");

//use the model
const roles = db.roles;

module.exports = {
  //Add Role:
  addNewRole: async (req, res, next) => {
    try {
      let info = {
        roleId: req.body.roleId,
        roleName: req.body.roleName,
      };

      const newRole = await roles.create(info);
      res.status(200).send(newRole);
    } catch (error) {
      next(error);
    }
  },

  // get role by id:
  getRole: async (req, res, next) => {
    try {
      let id = req.params.roleId;
      let role = await roles.findOne({ where: { roleId: id } });

      if (!role) {
        throw createError(404, " Selected role does not exist");
      }
      res.status(200).send(role);
    } catch (error) {
      next(error);
    }
  },

  // get all roles
  getAllRoles: async (req, res, next) => {
    try {
      let allRoles = await roles.findAll({});
      res.status(200).send(allRoles);
    } catch (error) {
      next(error);
    }
  },

  // update role
  updateRole: async (req, res, next) => {
    try {
      let id = req.params.roleId;

      const role = await roles.update(req.body, {
        where: { roleId: id },
      });

      if (!role) {
        throw createError(404, "Selected role does not exist");
      }
      res.status(200).send(role);
    } catch (error) {
      next(error);
    }
  },

  // delete role:
  deleteRole: async (req, res, next) => {
    try {
      let id = req.params.roleId;

      // Check if role exists:
      const role = await roles.findOne({ where: { roleId: id } });
      if (!role) {
        return res
          .status(400)
          .json({ error: "The selected role does not exist" });
      } else {
        await roles.destroy({ where: { roleId: id } });
        res.status(200).send(role);
        res.status(200).send("Role deleted successfully");
      }
    } catch (error) {
      next(error);
    }
  },
};
