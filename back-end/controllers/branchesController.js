const db = require("../models/dbConnect.js");
const createError = require("http-errors");

//use the model
const branches = db.branches;

module.exports = {
  //Add Branch:
  addBranch: async (req, res, next) => {
    try {
      let info = {
        branchName: req.body.branchName,
        region: req.body.region,
      };

      const newBranch = await branches.create(info);
      res.status(200).send(newBranch);
    } catch (error) {
      next(error);
    }
  },

  // get branch by id:
  getBranch: async (req, res, next) => {
    try {
      let id = req.params.branchCode;
      let branch = await branches.findOne({ where: { branchCode: id } });

      if (!branch) {
        throw createError(404, "Selected branch does not exist");
      }
      res.status(200).send(branch);
    } catch (error) {
      next(error);
    }
  },

  // get all branches:
  getAllBranches: async (req, res, next) => {
    try {
      let allBranches = await branches.findAll({});
      res.status(200).send(allBranches);
    } catch (error) {
      next(error);
    }
  },

  // update branch:
  updateBranch: async (req, res, next) => {
    try {
      let id = req.params.branchCode;

      const branch = await branches.update(req.body, {
        where: { branchCode: id },
      });

      if (!branch) {
        throw createError(404, "Selected branch does not exist");
      }
      res.status(200).send(branch);
    } catch (error) {
      next(error);
    }
  },

  // delete branch:
  deleteBranch: async (req, res, next) => {
    try {
      let id = req.params.branchCode;

      // Check if branch exists:
      const branch = await branches.findOne({ where: { branchCode: id } });
      if (!branch) {
        return res
          .status(400)
          .json({ error: "The selected branch does not exist" });
      } else {
        await branches.destroy({ where: { branchCode: id } });
        res.status(200).send("Branch deleted successfully");
      }
    } catch (error) {
      next(error);
    }
  },
};
