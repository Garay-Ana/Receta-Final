const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Conectar a la base de datos y lanzar servidor
sequelize.sync()
  .then(() => {
    console.log('✅ Base de datos conectada');
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar a la base de datos:', error.message);
  });
