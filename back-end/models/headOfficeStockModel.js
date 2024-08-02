const { sequelize } = require("./dbConnect");

module.exports = (sequelize, DataTypes) => {
  const HeadOfficeStock = sequelize.define(
    "heasofficestock",
    {
      stockId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cardType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cardId: {
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

  return HeadOfficeStock;
};
