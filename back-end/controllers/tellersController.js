const db = require("../models/dbConnect.js");
const createError = require("http-errors");

//use the model
const tellers = db.tellers;

module.exports = {
  //Add Teller:
  addTeller: async (req, res, next) => {
    try {
      const { firstName, lastName, branchCode } = req.body;

      const newTeller = await tellers.create({
        firstName,
        lastName,
        branchCode,
      });
      res.status(200).send(newTeller);
    } catch (error) {
      next(error);
    }
  },

  // get teller by tellerId:
  getTeller: async (req, res, next) => {
    try {
      let id = req.params.tellerId;
      let teller = await tellers.findOne({ where: { tellerId: id } });

      if (!teller) {
        throw createError(404, "Selected teller does not exist");
      }
      res.status(200).send(teller);
    } catch (error) {
      next(error);
    }
  },

  // get all tellers:
  getAllTellers: async (req, res, next) => {
    try {
      let allTellers = await tellers.findAll({});
      res.status(200).send(allTellers);
    } catch (error) {
      next(error);
    }
  },

  // update teller:
  updateTeller: async (req, res, next) => {
    try {
      let id = req.params.tellerId;

      const teller = await tellers.update(req.body, {
        where: { tellerId: id },
      });

      if (!teller) {
        throw createError(404, "Selected teller does not exist");
      }
      res.status(200).send(teller);
    } catch (error) {
      next(error);
    }
  },

  // delete teller:
  deleteTeller: async (req, res, next) => {
    try {
      let id = req.params.tellerId;

      await tellers.destroy({ where: { tellerId: id } });
      res.status(200).send("Teller deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};
