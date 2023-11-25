const { DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Comment;