const { sequelize } = require("./dbConnect");

module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define(
    "branches",
    {
      branchCode: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      branchName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true, // Table name will be created as defined, without pluralization.
    }
  );

  return Branch;
};
