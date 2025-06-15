const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware'); // ✅ importar middleware

// Rutas públicas
router.get('/search', recipeController.search);
router.get('/:id', recipeController.getOne);

// Rutas protegidas (requieren token)
router.post('/', authMiddleware, recipeController.create);     // ✅ crear receta
router.put('/:id', authMiddleware, recipeController.update);   // ✅ actualizar receta
router.delete('/:id', authMiddleware, recipeController.delete); // ✅ eliminar receta

module.exports = router;
