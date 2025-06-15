const { Sequelize } = require('sequelize');

// Configuración de conexión a PostgreSQL en Render
const sequelize = new Sequelize(
  'recetaya_db', // Nombre de la base de datos
  'recetaya_db_user', // Usuario
  'FeCee4VqIfS94pF5UZWTTzreESW5eZch', // Contraseña
  {
    host: 'dpg-d17g2gh5pdvs738bj1vg-a.oregon-postgres.render.com', // ✅ Host externo
    dialect: 'postgres',
    port: 5432,
    logging: false, // Puedes cambiar a true si quieres ver las consultas SQL
  }
);

module.exports = sequelize;
