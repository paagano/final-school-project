const { sequelize } = require("./dbConnect");

module.exports = (sequelize, DataTypes) => {
  const Teller = sequelize.define(
    "teller",
    {
      tillNumber: {
        // change tellerId to userId
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      branchCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: false,
    }
  );

  return Teller;
};

// Rename table to Users. Users table to have roles collumn, branchCode collumn,
// Define Roles table : BranchAdmin, BranchManager, Teller, CustomerServiceOfficer etc
// Define Till Table: tillId, branchCode ==> for LATER to avoid disruptions
