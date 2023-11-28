const { Sequelize, Model ,DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

// const Post = sequelize.define('Post', {
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   content: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
// });

class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  },
  {
    sequelize
  }
);



module.exports = Post;