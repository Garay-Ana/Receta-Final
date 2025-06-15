const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'recetaya_db',
  'recetaya_db_user',
  'FeCee4VqIfS94pF5UZWTTzreESW5eZch',
  {
    host: 'dpg-d17g2gh5pdvs738bj1vg-a.oregon-postgres.render.com',
    dialect: 'postgres',
    port: 5432,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Render usa certificados autofirmados
      }
    }
  }
);

module.exports = sequelize;
