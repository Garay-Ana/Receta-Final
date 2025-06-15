const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/search', recipeController.search);
router.get('/:id', recipeController.getOne);
router.post('/', recipeController.create);
router.put('/:id', recipeController.update); // ✅ Ruta para editar receta
router.delete('/:id', recipeController.delete);

module.exports = router;
