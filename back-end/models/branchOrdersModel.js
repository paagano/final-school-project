const { sequelize } = require("./dbConnect");

module.exports = (sequelize, DataTypes) => {
  const BranchOrder = sequelize.define(
    "branchorder",
    {
      orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      branchCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      generalPurposeCard: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      studentCard: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      mutiCurrencyCard: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      youthCard: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: false, // Default
    }
  );

  return BranchOrder;
};
