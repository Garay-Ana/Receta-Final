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
const adminRoutes = require('./routes/adminRoutes'); // ✅ nueva ruta admin

// ✅ Importar todos los modelos y relaciones
require('./models'); // incluye User, Recipe, Favorite y ahora Admin también

app.use(cors());
app.use(express.json());

// Rutas del API
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes); // ✅ montar ruta de admin

// 🔄 Sincronizar base de datos conservando datos existentes
sequelize.sync({ alter: true })
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
