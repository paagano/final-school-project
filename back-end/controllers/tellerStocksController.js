const { response } = require("express");
const db = require("../models/dbConnect.js");
const createError = require("http-errors");

//use the models
const transitStocks = db.transitstocks;
const branchStocks = db.branchstocks;
const headOfficeStocks = db.headofficestocks;
const tellers = db.tellers;
const tellerTills = db.tellertills;
const issuedCards = db.issuedcards;
const spoiltCards = db.spoiltcards;
const branches = db.branches;
const tills = db.tills;
const users = db.users;

module.exports = {
  branchAdminCaptureSpoiltCard: async (req, res, next) => {
    const { tillNumber, cardId, branchCode, quantity } = req.body;

    try {
      if (!tillNumber || !cardId || !branchCode || !quantity) {
        return res.status(400).json({ error: "Invalid Input" });
      }

      const t = await db.sequelize.transaction();

      try {
        // Check if the branch exists:
        let branch = await branches.findOne({ where: { branchCode } });
        if (!branch) {
          return res
            .status(400)
            .json({ error: "The selected branch does not exist" });
        }

        // Update branch stock (voult) by deducting quantity
        await branchStock.update(
          {
            quantity: db.sequelize.literal(`quantity - ${quantity}`),
          },

          {
            where: { cardId, branchCode },
            transaction: t,
          }
        );

        await spoiltCards.create(
          {
            cardId,
            branchCode,
            tillNumber,
            quantity,
          },

          {
            transaction: t,
          }
        );

        // Update branch stock (Voult) by adding quantity:
        // let affectedRaw = await branchStock.update(
        //   { quantity: db.sequelize.literal(`quantity + ${quantity}`) },
        //   { where: { cardId, branchCode, tellerId }, transaction: t }
        // );
        // if (affectedRaw === 0) {
        //   await branchStock.create(
        //     { tellerId, cardId, quantity, branchCode },
        //     { transaction: t }
        //   );
        // }

        // Commit the transaction
        await t.commit();

        return res.status(200).send({
          message: "Spoilt card record successfully captured by Admin",
        });
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

  branchAdminHandStockToTeller: async (req, res, next) => {
    const { quantity, cardId, tillNumber, branchCode } = req.body;

    try {
      if (!tillNumber || !quantity || !cardId || !branchCode) {
        return res.status(400).json({ error: "Invalid Input" });
      }

      const t = await db.sequelize.transaction();
      try {
        // Check if the teller till exists
        let tellerTill = await tellerTills.findOne({ where: { tillNumber } });

        // Update branch stock (Voult) by deducting quantity
        await branchStocks.update(
          { quantity: db.sequelize.literal(`quantity - ${quantity}`) },
          { where: { cardId, branchCode }, transaction: t }
        );

        // Update teller stock (Teller Till) by adding quantity:
        let affectedRaw = await tellerTills.update(
          { quantity: db.sequelize.literal(`quantity + ${quantity}`) },
          { where: { cardId, branchCode, tillNumber }, transaction: t }
        );
        if (affectedRaw === 0) {
          await tellerTills.create(
            { tillNumber, cardId, quantity, branchCode },
            { transaction: t }
          );
        }

        // Commit the transaction
        await t.commit();

        return res
          .status(200)
          .send({ message: "Vault to Till transfer successfull" });
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

  // tellerReceiveStockFromBranchVoult: async (req, res, next) => {},

  tellerCaptureSpoiltCard: async (req, res, next) => {
    const { cardId, tillNumber, branchCode, quantity } = req.body;

    try {
      if (!tillNumber || !cardId || !branchCode || !quantity) {
        return res.status(400).json({ error: "Invalid Input" });
      }

      const t = await db.sequelize.transaction();
      try {
        // Check if the till exists
        let till = await tills.findOne({ where: { tillNumber } });

        if (!till) {
          return res.status(400).json({
            error: "The selected teller does not belong to this branch",
          });
        }

        // Update teller stock (till) by deducting quantity
        await tellerTills.update(
          { quantity: db.sequelize.literal(`quantity - ${quantity}`) },
          { where: { cardId, branchCode, tillNumber }, transaction: t }
        );
        await spoiltCards.create(
          { cardId, branchCode, tillNumber, quantity },
          { transaction: t }
        );

        // Update branch stock (Voult) by adding quantity:
        // let affectedRaw = await branchStock.update(
        //   { quantity: db.sequelize.literal(`quantity + ${quantity}`) },
        //   { where: { cardId, branchCode, tellerId }, transaction: t }
        // );
        // if (affectedRaw === 0) {
        //   await branchStock.create(
        //     { tellerId, cardId, quantity, branchCode },
        //     { transaction: t }
        //   );
        // }

        // Commit the transaction
        await t.commit();

        return res
          .status(200)
          .send({ message: "Spoilt card record successfully captured" });
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

  tellerIssueCardToCustomer: async (req, res, next) => {
    const { cardId, tillNumber, branchCode, quantity } = req.body;

    try {
      if (!tillNumber || !cardId || !branchCode || !quantity) {
        return res.status(400).json({ error: "Invalid Input" });
      }

      const t = await db.sequelize.transaction();
      try {
        // Check if the teller till exists
        let teller = await tellerTills.findOne({ where: { tillNumber } });

        // Update teller stock (till) by deducting quantity
        await tellerTills.update(
          { quantity: db.sequelize.literal(`quantity - ${quantity}`) },
          { where: { cardId, branchCode, tillNumber }, transaction: t }
        );
        await issuedCards.create(
          { cardId, branchCode, tillNumber, quantity },
          { transaction: t }
        );

        // Update branch stock (Voult) by adding quantity:
        // let affectedRaw = await branchStock.update(
        //   { quantity: db.sequelize.literal(`quantity + ${quantity}`) },
        //   { where: { cardId, branchCode, tellerId }, transaction: t }
        // );
        // if (affectedRaw === 0) {
        //   await branchStock.create(
        //     { tellerId, cardId, quantity, branchCode },
        //     { transaction: t }
        //   );
        // }

        // Commit the transaction
        await t.commit();

        return res
          .status(200)
          .send({ message: "Card successfully issued to customer" });
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

  tellerReturnStockToBranchVoult: async (req, res, next) => {
    const { quantity, cardId, tillNumber, branchCode, adminId } = req.body;

    // Reimplement: Check that user branch code === tillNumber branch code
    if (branchCode !== adminId) {
      return res.status(501).json({ error: "Wrong branch code selected" });
    } else {
      try {
        if (!tillNumber || !quantity || !cardId || !branchCode) {
          return res.status(400).json({ error: "Invalid Input" });
        }

        const t = await db.sequelize.transaction();
        try {
          // Check if the teller exists
          let teller = await tellers.findOne({ where: { tillNumber } });

          // Update teller stock (till) by deducting quantity
          await tellerTills.update(
            { quantity: db.sequelize.literal(`quantity - ${quantity}`) },
            { where: { cardId, branchCode }, transaction: t }
          );

          // Update branch stock (Voult) by adding quantity:
          let affectedRaw = await branchStocks.update(
            { quantity: db.sequelize.literal(`quantity + ${quantity}`) },
            { where: { cardId, branchCode }, transaction: t }
          );
          if (affectedRaw === 0) {
            await branchStock.create(
              { tillNumber, cardId, quantity, branchCode },
              { transaction: t }
            );
          }

          // Commit the transaction
          await t.commit();

          return res
            .status(200)
            .send({ message: "Vault to Till transfer successfull" });
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
    }
  },
};
