const { response } = require("express");
const db = require("../models/dbConnect.js");
const createError = require("http-errors");

//use the model
const headOfficeOrders = db.headofficeorders;

module.exports = {
  headOfficeMakeOrder: async (req, res, next) => {
    try {
      const {
        generalPurposeCard,
        studentCard,
        mutiCurrencyCard,
        youthCard,
        total,
      } = req.body;

      await headOfficeOrders.create({
        generalPurposeCard,
        studentCard,
        mutiCurrencyCard,
        youthCard,
        total,
      });
      res.status(200).send({ message: `Order created successfully` });
    } catch (error) {
      next(error);
    }
  },

  // get all HO Orders:
  getAllHeadOfficeOrders: async (req, res, next) => {
    try {
      let allHeadOfficeOrders = await headOfficeOrders.findAll({});
      res.status(200).send(allHeadOfficeOrders);
    } catch (error) {
      next(error);
    }
  },
};
