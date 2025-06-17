const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Públicas
router.get('/search', recipeController.search);
router.get('/:id', recipeController.getOne);

// Protegidas
router.post('/', authMiddleware, upload.single('image'), recipeController.create);
router.put('/:id', authMiddleware, upload.single('image'), recipeController.update);
router.delete('/:id', authMiddleware, recipeController.delete);

module.exports = router;
