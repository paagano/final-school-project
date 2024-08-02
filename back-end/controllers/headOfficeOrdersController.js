const db = require("../models/dbConnect.js");
const createError = require("http-errors");

//use the model
const headOfficeOrders = db.headOfficeOrders;

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
};
