const express = require("express");

const TellersController = require("../controllers/tellersController");

const routes = express.Router();

//Route for adding or creating a new teller:
routes.post("/add-teller", TellersController.addTeller);

//Route for getting a single teller record by id:
routes.get("/get-teller/:tellerId", TellersController.getTeller);

//Route for getting list of all tellers:
routes.get("/get-all-tellers", TellersController.getAllTellers);

//Route for updating a teller:
routes.put("/update-teller/:tellerId", TellersController.updateTeller);
routes.patch("/update-teller/:tellerId", TellersController.updateTeller);

//Route for deleting a teller:
routes.delete("/delete-teller/:tellerId", TellersController.deleteTeller);

module.exports = routes;
