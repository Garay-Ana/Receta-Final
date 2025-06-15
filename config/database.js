const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'recetaya_db', // Nombre de la base
  'recetaya_db_user', // Usuario
  'FeCee4VqIfS94pF5UZWTtzreESW5eZch', // Contraseña
  {
    host: 'dpg-d17g2gh5pdvs738bjlvg-a.oregon-postgres.render.com', // ✅ Host corregido
    dialect: 'postgres',
    port: 5432,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

module.exports = sequelize;
