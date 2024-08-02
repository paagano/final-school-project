const { sequelize } = require("./dbConnect");

module.exports = (sequelize, DataTypes) => {
  const SpoiltCard = sequelize.define(
    "spoiltcard",
    {
      spoiltCardId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cardId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      tillNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      branchCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: false,
    }
  );

  return SpoiltCard;
};
