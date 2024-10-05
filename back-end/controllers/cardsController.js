const db = require("../models/dbConnect.js");
const createError = require("http-errors");

//use the model
const cards = db.cards;

module.exports = {
  //Add Card
  addCardType: async (req, res, next) => {
    try {
      let info = {
        cardType: req.body.cardType,
      };

      const newCardType = await cards.create(info);
      res.status(200).send(newCardType);
    } catch (error) {
      next(error);
    }
  },

  // get card type by id
  getCardType: async (req, res, next) => {
    try {
      let id = req.params.cardId;
      let cardType = await cards.findOne({ where: { cardId: id } });

      if (!cardType) {
        throw createError(404, " Selected Card Type does not exist");
      }
      res.status(200).send(cardType);
    } catch (error) {
      next(error);
    }
  },

  // get all card types
  getAllCardTypes: async (req, res, next) => {
    try {
      let allCardTypes = await cards.findAll({});
      res.status(200).send(allCardTypes);
    } catch (error) {
      next(error);
    }
  },

  // update card
  updateCardType: async (req, res, next) => {
    try {
      let id = req.params.cardId;

      const cardType = await cards.update(req.body, {
        where: { cardId: id },
      });

      if (!cardType) {
        throw createError(404, "Selected Card Type does not exist");
      }
      res.status(200).send(cardType);
    } catch (error) {
      next(error);
    }
  },

  // delete card type:
  deleteCardType: async (req, res, next) => {
    try {
      let id = req.params.cardId;

      await cards.destroy({ where: { cardId: id } });
      res.status(200).send("Card Type deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};
