const { sequelize } = require("./dbConnect");

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "role",
    {
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: false,
    }
  );

  return Role;
};
