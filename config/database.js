const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'recetaya_db',                  // Nombre de la base de datos
  'recetaya_db_user',             // Usuario
  'FeCee4VqIfS94pF5UZWTTzreESW5eZch', // Contraseña
  {
    host: 'dpg-d17g2gh5pdvs738bj1vg-a', // Host
    dialect: 'postgres',               // Tipo de base de datos
    port: 5432,                        // Puerto estándar de PostgreSQL
    logging: false,                    // Desactiva logs SQL
  }
);

module.exports = sequelize;
