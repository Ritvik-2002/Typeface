const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");

const File = sequelize.define("File", {
  filename: DataTypes.STRING,
  mimetype: DataTypes.STRING,
  size: DataTypes.INTEGER,
  path: DataTypes.STRING,
});

User.hasMany(File);
File.belongsTo(User);

sequelize.sync();

module.exports = File;
