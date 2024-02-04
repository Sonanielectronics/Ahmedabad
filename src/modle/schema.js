const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  const registereddata = sequelize.define("registereddata", {

    FirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    LastName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    Role: {
      type: DataTypes.STRING,
      allowNull: false
    },

  });

  return registereddata;

};
