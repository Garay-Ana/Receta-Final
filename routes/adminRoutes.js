// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const adminController = require('../controllers/adminController');

// 🟢 Ruta para login de admin
router.post('/login', adminController.login);

// ⚠️ Ruta temporal para crear un admin (BORRAR después de usar)
router.post('/create-temp', async (req, res) => {
  try {
    const hashed = await bcrypt.hash('admin123', 10); // Contraseña por defecto
    const admin = await Admin.create({
      email: 'admin@receta.com',
      password: hashed,
    });

    res.json({ message: 'Administrador creado correctamente ✅', admin });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear admin', details: err.message });
  }
});

module.exports = router;
