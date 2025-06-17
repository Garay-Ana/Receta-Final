const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Rutas públicas
router.get('/search', recipeController.search);
router.get('/:id', recipeController.getOne);

// Rutas protegidas (requieren token de autenticación)
router.post(
  '/',
  authMiddleware,
  upload.single('image'),        // ✅ permite subir imagen al crear
  recipeController.create
);

router.put(
  '/:id',
  authMiddleware,
  upload.single('image'),        // ✅ permite subir nueva imagen al editar
  recipeController.update
);

router.delete(
  '/:id',
  authMiddleware,
  recipeController.delete        // ✅ eliminar receta por ID
);

module.exports = router;
