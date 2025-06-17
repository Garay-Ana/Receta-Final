const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // ✅ debe usar multer con Cloudinary

// 🟢 Rutas públicas
router.get('/search', recipeController.search);
router.get('/:id', recipeController.getOne);

// 🔐 Rutas protegidas con autenticación de usuario
router.post(
  '/',
  authMiddleware,
  upload.single('image'), // ✅ sube imagen a Cloudinary
  recipeController.create
);

router.put(
  '/:id',
  authMiddleware,
  upload.single('image'), // ✅ permite actualizar imagen
  recipeController.update
);

router.delete(
  '/:id',
  authMiddleware,
  recipeController.delete // ✅ elimina receta por ID
);

module.exports = router;
