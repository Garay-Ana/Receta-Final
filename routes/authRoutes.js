const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registrar usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

module.exports = router;
