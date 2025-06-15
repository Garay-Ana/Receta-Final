const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware'); // asegúrate de tener este middleware

router.use(authMiddleware); // proteger todas

router.post('/:recipeId', favoriteController.add);
router.delete('/:recipeId', favoriteController.remove);
router.get('/', favoriteController.list);

module.exports = router;
