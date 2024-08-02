const { sequelize } = require("./dbConnect");

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define(
    "card",
    {
      cardId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cardType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: false, // Default
    }
  );

  return Card;
};
