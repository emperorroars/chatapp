const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Usergroup = sequelize.define(
  "usergroup",
  {
   
  },
  {
    timestamps: false,
  }
);
module.exports = Usergroup;