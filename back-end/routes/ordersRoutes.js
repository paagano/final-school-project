const express = require("express");

const BranchOrdersController = require("../controllers/branchOrdersController");
const HeadOfficeOrdersController = require("../controllers/headOfficeOrdersController");

const routes = express.Router();

//Route for making a new order - Branch:
routes.post("/make-order", BranchOrdersController.branchMakeOrder);

//Route for making a new order - Head Office:
routes.post("/ho-make-order", HeadOfficeOrdersController.headOfficeMakeOrder);

// //Route for getting a single card record by id:
// routes.get("/cards/:cardId", CardsController.getCardType);

// //Route for getting list of all card types
// routes.get("/cards", CardsController.getAllCardTypes);

// //Route for updating a card type:
// routes.put("/cards/:cardId", CardsController.updateCardType);
// routes.patch("/cards/:cardId", CardsController.updateCardType);

// //Route for deleting a card type:
// routes.delete("/cards/:cardId", CardsController.deleteCardType);

module.exports = routes;
