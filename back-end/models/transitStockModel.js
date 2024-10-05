const { sequelize } = require("./dbConnect");

module.exports = (sequelize, DataTypes) => {
  const TransitStock = sequelize.define(
    "transitstock",
    {
      transitId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cardId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      branchCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      // serialNumberFrom: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // serialNumberTo: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
    },
    {
      freezeTableName: false, // Default
    }
  );

  return TransitStock;
};
