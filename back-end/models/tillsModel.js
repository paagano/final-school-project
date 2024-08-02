const { sequelize } = require("./dbConnect");

module.exports = (sequelize, DataTypes) => {
  const Till = sequelize.define(
    "till",
    {
      tillNumber: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      branchCode: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: false, // Default
    }
  );

  return Till;
};
