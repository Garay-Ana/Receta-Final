const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/search', recipeController.search);
router.get('/:id', recipeController.getOne);
router.post('/', recipeController.create); // ✅ Agregar esta línea
router.delete('/:id', recipeController.delete);

module.exports = router;
