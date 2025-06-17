const express = require('express');
const cors = require('cors');
const path = require('path'); // ✅ Importar path para servir archivos estáticos
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

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Servir imágenes estáticas desde /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // ← ESTA LÍNEA ES CLAVE

// Rutas del API
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

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
