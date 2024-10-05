const db = require("../models/dbConnect.js");
const createError = require("http-errors");

//use the model
const orders = db.orders;

module.exports = {
  branchMakeOrder: async (req, res, next) => {
    try {
      //   let info = {
      //     branchCode: req.body.branchCode,
      //     generalPurposeCard: req.body.generalPurposeCard,
      //     studentCard: req.body.studentCard,
      //     mutiCurrencyCard: req.body.mutiCurrencyCard,
      //     youthCard: req.body.youthCard,
      //   };

      const {
        branchCode,
        generalPurposeCard,
        studentCard,
        mutiCurrencyCard,
        youthCard,
        total,
      } = req.body;

      await orders.create({
        branchCode,
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

  // get all Branch Orders:
  getAllBranchOrders: async (req, res, next) => {
    try {
      let allBranchOrders = await orders.findAll({});
      res.status(200).send(allBranchOrders);
    } catch (error) {
      next(error);
    }
  },

  // get card orders by branch Code:
  getCardOrdersByBranch: async (req, res, next) => {
    try {
      let id = req.params.branchCode;
      let branchOrders = await orders.findAll({
        where: { branchCode: id },
      });

      if (!branchOrders || branchOrders.length === 0) {
        throw createError(404, " No Orders found for selected branch");
      }
      res.status(200).send(branchOrders);
    } catch (error) {
      next(error);
    }
  },
};
