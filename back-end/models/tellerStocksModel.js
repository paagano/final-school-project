const { sequelize } = require("./dbConnect");

module.exports = (sequelize, DataTypes) => {
  const TellerTill = sequelize.define(
    "tellerTill",
    {
      tillId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cardId: {
        type: DataTypes.INTEGER,
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

  return TellerTill;
};
