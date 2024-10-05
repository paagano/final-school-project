const { response } = require("express");
const db = require("../models/dbConnect.js");
const createError = require("http-errors");

//use the model
const transitStock = db.transitstocks;
const branchStock = db.branchstocks;
const headOfficeStock = db.headofficestocks;
const tellerStock = db.tellerStocks;

module.exports = {
  headOfficeHandStockToCourier: async (req, res, next) => {
    try {
      const { quantity, cardId, branchCode } = req.body;

      if (!branchCode || !quantity || !cardId) {
        return res.status(400).json({ error: "Invalid Input" });
      }

      const t = await db.sequelize.transaction();
      try {
        // Check if the branch exists
        let branch = await branchStock.findOne({ where: { branchCode } });

        // If branch doesn't exist, create it
        if (!branch) {
          await transitStock.create(
            { quantity, cardId, branchCode },
            { transaction: t }
          );
        }

        // Update head office stock by deducting quantity
        await headOfficeStock.update(
          { quantity: db.sequelize.literal(`quantity - ${quantity}`) },
          { where: { cardId }, transaction: t }
        );

        // Update transit stock by adding quantity:
        await transitStock.create(
          { branchCode, cardId, quantity },
          { transaction: t }
        );

        // Commit the transaction
        await t.commit();

        return res.status(200).send({ message: "Stock released successfully" });
      } catch (error) {
        // Rollback the transaction in case of an error
        await t.rollback();
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error1" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error2" });
    }
  },

  branchReceiveStockFromCourier: async (req, res, next) => {
    try {
      const { quantity, cardId, receivingBranchCode, transitId } = req.body;

      if (!receivingBranchCode || !quantity || !cardId || !transitId) {
        return res.status(400).json({ error: "Invalid Input" });
      }

      const t = await db.sequelize.transaction();
      try {
        // Check if the entry exists in the transit table:
        let transitEntry = await transitStock.findOne({
          where: { branchCode: receivingBranchCode, cardId, transitId },
          transaction: t,
        });

        if (!transitEntry) {
          return res.status(404).json({ error: "Transit stock not found" });
        }

        if (transitEntry.quantity < quantity) {
          return res
            .status(400)
            .json({ error: "Insufficient quantity in transit stock" });
        }

        // Check if the branch stock entry exists:
        let branchEntry = await branchStock.findOne({
          where: { branchCode: receivingBranchCode, cardId },
          transaction: t,
        });

        if (branchEntry) {
          // If exists, update the quantity in the branch stock:
          await branchStock.update(
            { quantity: db.sequelize.literal(`quantity + ${quantity}`) },
            {
              where: { branchCode: receivingBranchCode, cardId },
              transaction: t,
            }
          );
        } else {
          // If not, create a new entry in the branch stock:
          await branchStock.create(
            { quantity, cardId, branchCode: receivingBranchCode },
            { transaction: t }
          );
        }

        // Update the quantity in the transit stock:
        await transitStock.update(
          { quantity: db.sequelize.literal(`quantity - ${quantity}`) },
          {
            where: { branchCode: receivingBranchCode, cardId, transitId },
            transaction: t,
          }
        );

        // Commit the transaction:
        await t.commit();

        return res.status(200).send({ message: "Stock received successfully" });
      } catch (error) {
        // Rollback the transaction in case of an error:
        await t.rollback();
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error1" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error2" });
    }
  },

  branchHandStockToCourier: async (req, res, next) => {
    try {
      const {
        quantity,
        cardId,
        stockId,
        releasingBranchCode,
        receivingBranchCode,
      } = req.body;

      if (
        !releasingBranchCode ||
        !receivingBranchCode ||
        !quantity ||
        !cardId
      ) {
        return res.status(400).json({ error: "Invalid Input" });
      }

      const t = await db.sequelize.transaction();
      try {
        // Check if the branch exists:

        // let releasingBranch = await branchStock.findOne({ where: { releasingBranchCode } });
        // let receivingBranch = await branchStock.findOne({ where: { receivingBranchCode } });

        // // If branch doesn't exist, create it
        // if (!releasingBranch && !receivingBranch) {
        //   await transitStock.create(
        //     { quantity, cardId, releasingBranchCode },
        //     { quantity, cardId, receivingBranchCode },
        //     { transaction: t }
        //   );
        // }

        // Update releasing branch stock by deducting quantity
        await branchStock.update(
          { quantity: db.sequelize.literal(`quantity - ${quantity}`) },
          { where: { cardId, stockId }, transaction: t }
        );

        // Update transit stock by adding quantity:
        await transitStock.create(
          {
            releasingBranchCode,
            branchCode: receivingBranchCode,
            cardId,
            quantity,
          },
          { transaction: t }
        );

        // Commit the transaction
        await t.commit();

        return res.status(200).send({ message: "Stock released successfully" });
      } catch (error) {
        // Rollback the transaction in case of an error
        await t.rollback();
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error1" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error2" });
    }
  },
};
