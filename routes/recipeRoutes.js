const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/search', recipeController.search);
router.get('/:id', recipeController.getOne);

module.exports = router;
