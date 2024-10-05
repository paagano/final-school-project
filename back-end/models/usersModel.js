const { sequelize } = require("./dbConnect");
const { DataTypes, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      branchCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: false, // Default
      timestamps: true, // Default
    }
  );

  //Function to hash password before saving:
  User.beforeCreate(async (user) => {
    try {
      const salt = await bcrypt.genSalt(12);
      const hashedPwd = await bcrypt.hash(user.password, salt);
      user.password = hashedPwd;
    } catch (error) {
      throw new Error("Error encrypting password");
    }
  });

  //Function to compare the entered password against saved hashed password:
  User.prototype.isValidPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw error;
    }
  };

  return User;
};
