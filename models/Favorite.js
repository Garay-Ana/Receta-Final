const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Recipe = require('./Recipe');

const Favorite = sequelize.define('Favorite', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' },
  },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Recipes', key: 'id' },
  },
});

User.belongsToMany(Recipe, { through: Favorite, foreignKey: 'userId' });
Recipe.belongsToMany(User, { through: Favorite, foreignKey: 'recipeId' });

module.exports = Favorite;
