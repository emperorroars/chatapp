const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const ArchivedChat = sequelize.define('ArchivedChat', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
    isImage:{
        type : Sequelize.BOOLEAN , 
      defaultValue : false
    },
name:{
  type: Sequelize.STRING,
  allowNull: false,
}}, {
    timestamps: false,
  });
  
  module.exports = ArchivedChat;