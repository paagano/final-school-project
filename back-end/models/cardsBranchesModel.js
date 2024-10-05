const { sequelize } = require("./dbConnect");

module.exports = (sequelize, DataTypes) => {
  const CardsBranch = sequelize.define(
    "cardsbranches",
    {
      cardId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      freezeTableName: true, // table name will not be pluralized on sychronization/creation
    }
  );

  return CardsBranch;
};
