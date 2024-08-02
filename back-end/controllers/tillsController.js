const db = require("../models/dbConnect.js");
const createError = require("http-errors");

//use the model
const tills = db.tills;
const branches = db.branches;

module.exports = {
  //Create Till
  createNewTill: async (req, res, next) => {
    try {
      let info = {
        branchCode: req.body.branchCode,
      };

      //Checking if Branch exists:
      let branch = await branches.findOne({
        where: { branchCode: info.branchCode },
      });

      if (!branch) {
        throw createError(404, "Selected branch does not exist.");
      } else {
        const newTill = await tills.create(info);

        res.status(200).send(newTill);
      }
    } catch (error) {
      next(error);
    }
  },

  // get till by id:
  getTill: async (req, res, next) => {
    try {
      let id = req.params.tillNumber;
      let till = await tills.findOne({ where: { tillNumber: id } });

      if (!till) {
        throw createError(404, " Selected till does not exist");
      }
      res.status(200).send(till);
    } catch (error) {
      next(error);
    }
  },

  // get all tills
  getAllTills: async (req, res, next) => {
    try {
      let allTills = await tills.findAll({});
      res.status(200).send(allTills);
    } catch (error) {
      next(error);
    }
  },

  // delete till:
  deleteTill: async (req, res, next) => {
    try {
      let id = req.params.tillNumber;

      await tills.destroy({ where: { tillNumber: id } });
      res.status(200).send("Till deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};
