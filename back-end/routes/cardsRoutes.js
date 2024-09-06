const express = require("express");

const CardsController = require("../controllers/cardsController");
const { verifyAccessToken } = require("../auth/jwtHelpers");
const authController = require("../auth/jwtHelpers");

const routes = express.Router();

//Route for adding or creating a new card:
routes.post(
  "/create-card-type",
  verifyAccessToken,
  authController.restrict("admin"),
  CardsController.addCardType
);

//Route for getting a single card record by id:
routes.get("/:cardId", verifyAccessToken, CardsController.getCardType);

//Route for getting list of all card types:
routes.get("/", verifyAccessToken, CardsController.getAllCardTypes);

//Route for updating a card type:
routes.put(
  "/:cardId",
  verifyAccessToken,
  authController.restrict("admin"),
  CardsController.updateCardType
);
routes.patch(
  "/:cardId",
  verifyAccessToken,
  authController.restrict("admin"),
  CardsController.updateCardType
);

//Route for deleting a card type:
routes.delete(
  "/delete-card/:cardId",
  verifyAccessToken,
  authController.restrict("admin"),
  CardsController.deleteCardType
);

module.exports = routes;
