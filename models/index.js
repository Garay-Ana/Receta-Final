const User = require('./User');
const Recipe = require('./Recipe');
const Favorite = require('./Favorite');
const Admin = require('./Admin'); // ✅ Importar modelo de administrador

// Asociaciones
User.hasMany(Recipe, { foreignKey: 'userId' });
Recipe.belongsTo(User, { foreignKey: 'userId' });

Favorite.belongsTo(User, { foreignKey: 'userId' });
Favorite.belongsTo(Recipe, { foreignKey: 'recipeId' });

User.hasMany(Favorite, { foreignKey: 'userId' });
Recipe.hasMany(Favorite, { foreignKey: 'recipeId' });

module.exports = {
  User,
  Recipe,
  Favorite,
  Admin // ✅ Exportar modelo Admin
};
