const { response } = require("express");
const db = require("../models/dbConnect.js");
const createError = require("http-errors");
const branchOrdersModel = require("../models/branchOrdersModel.js");

//use the model
const headOfficeStock = db.headofficestocks;
const branchStock = db.branchstocks;

module.exports = {
  headOfficeReceiveStock: async (req, res, next) => {
    try {
      const { cardType, quantity, cardId } = req.body;

      if (!cardType || !quantity || !cardId) {
        res.status(400).json({ error: `Invalid Input` });
      }
      const t = await db.sequelize.transaction();
      try {
        //upating the card using the cardId
        let [affectedCount] = await headOfficeStock.update(
          {
            quantity: db.sequelize.literal(`quantity + ${quantity}`),
          },
          { where: { cardId }, transaction: t }
        );

        if (affectedCount === 0) {
          await headOfficeStock.create(
            {
              cardType,
              quantity,
              cardId,
            },
            { transaction: t }
          );
        }
        //cimmiting the transaction
        await t.commit();

        res
          .status(200)
          .send({ message: `Stock  received and updated successfully` });
      } catch (error) {
        //rollback the transaction in case of an error
        await t.rollback();
        console.log(error);
        res.status(500).json({ error: `Internal Server Error1` });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Internal Server Error2` });
    }
  },
};
