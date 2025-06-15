// models/index.js

const User = require('./User');
const Recipe = require('./Recipe');
const Favorite = require('./Favorite');
const Admin = require('./Admin'); // ✅ Importar modelo de administrador

// Asociaciones entre modelos
User.hasMany(Recipe, { foreignKey: 'userId' });
Recipe.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Favorite, { foreignKey: 'userId' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

Recipe.hasMany(Favorite, { foreignKey: 'recipeId' });
Favorite.belongsTo(Recipe, { foreignKey: 'recipeId' });

// ✅ Exportar todos los modelos
module.exports = {
  User,
  Recipe,
  Favorite,
  Admin
};
