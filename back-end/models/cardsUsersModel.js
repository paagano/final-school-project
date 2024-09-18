const { sequelize } = require("./dbConnect");

module.exports = (sequelize, DataTypes) => {
  const CardsUser = sequelize.define(
    "cardsusers",
    {
      cardUserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },

    {
      cardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    {
      freezeTableName: true, // table name will not be pluralized on sychronization/creation
    }
  );

  return CardsUser;
};
