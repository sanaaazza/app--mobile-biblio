// models/user.js
const bcrypt = require("bcryptjs");
const { DataTypes } = require("sequelize");
const sequelize = require("../server");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user", // Valeur par défaut est 'user'
    },
  });

  User.associate = (models) => {
    // Un utilisateur peut avoir plusieurs emprunts
    User.hasMany(models.Borrow, {
      foreignKey: "userId",
      as: "borrows",
    });
  };

  return User;
};
