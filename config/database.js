const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'bpovcb9nrlovxdfwk58d',           // Nombre de la base de datos
  'ulbvcrnceyhufsz',                // Usuario
  'Rsri9MOWOcGMWdExoGfd',           // Contraseña
  {
    host: 'bpovcb9nrlovxdfwk58d-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    port: 3306,
    logging: false,
  }
);

module.exports = sequelize;
