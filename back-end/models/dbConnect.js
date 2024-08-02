const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  // Options (object):
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  operatorAliases: false, //if there are errors in your code will overwrite the errors using this line
});

sequelize
  .authenticate()
  //Promise
  .then(() => {
    console.log(`Database Connection Successful...`);
  })
  .catch((err) => {
    console.log("Error Connecting to Database" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Using the db object and the various models to create the various tables:
db.cards = require("./cardsModel.js")(sequelize, DataTypes);
db.issuedcards = require("./issuedCardsModel.js")(sequelize, DataTypes);
db.spoiltcards = require("./spoiltCardsModel.js")(sequelize, DataTypes);
db.users = require("./usersModel.js")(sequelize, DataTypes);
db.branches = require("./branchesModel.js")(sequelize, DataTypes);
db.roles = require("./rolesModel.js")(sequelize, DataTypes);
db.tills = require("./tillsModel.js")(sequelize, DataTypes);
db.cardsbranches = require("./cardsBranchesModel.js")(sequelize, DataTypes);
db.orders = require("./branchOrdersModel.js")(sequelize, DataTypes);
db.headofficeorders = require("./headOfficeOrdersModel.js")(
  sequelize,
  DataTypes
);
db.headofficestocks = require("./headOfficeStockModel.js")(
  sequelize,
  DataTypes
);
db.branchstocks = require("./branchStockModel.js")(sequelize, DataTypes);
db.branchorders = require("./branchOrdersModel.js")(sequelize, DataTypes);

db.transitstocks = require("./transitStockModel.js")(sequelize, DataTypes);

db.tellers = require("./tellersModel.js")(sequelize, DataTypes);
db.tellertills = require("./tellerStocksModel.js")(sequelize, DataTypes);

// Models and Tables Sychronization: i.e checks the models folder against the db and if tables defined in the models do not exist, vreates them in the db.
db.sequelize
  .sync({ force: false }) // existing table and associated data will NOT be dropped. IF set to true, table nad associated data WILL be dropped on synchronization. "alter" keyword instead of "force" {alter: true} will update the table with the new information, existing table will not be dropped.
  .then((data) => {
    console.log("Models and Tables re-synched successfully");
  })
  .catch((err) => {
    console.log("Error Synching Models and Tables" + err);
  });

// Creating Relationships/Associations:
db.branches.hasMany(db.users, { foreignKey: "branchCode" });
db.users.belongsTo(db.branches, { foreignKey: "branchCode" });

db.roles.hasMany(db.users, { foreignKey: "roleId" });
db.users.belongsTo(db.roles, { foreignKey: "roleId" });

db.cards.belongsToMany(db.branches, { through: db.cardsbranches });
db.branches.belongsToMany(db.cards, { through: db.cardsbranches });

db.headofficestocks.belongsTo(db.cards, { foreignKey: "cardId" });
db.cards.hasOne(db.headofficestocks, { foreignKey: "cardId" });

module.exports = db;
