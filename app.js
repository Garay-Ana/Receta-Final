const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const sequelize = require('./config/database');

// Rutas
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const userRoutes = require('./routes/userRoutes');

// ✅ Importar modelos y relaciones (en lugar de importar cada uno por separado)
require('./models'); // ← importa automáticamente User, Recipe, Favorite y relaciones

app.use(cors());
app.use(express.json());

// Rutas del API
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/user', userRoutes); // ✅ ruta de perfil

// Conectar a la base de datos
sequelize.sync({ alter: true }) // usa force: true solo si quieres borrar todo y empezar
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
