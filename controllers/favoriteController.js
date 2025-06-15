const Favorite = require('../models/Favorite');
const Recipe = require('../models/Recipe');

exports.add = async (req, res) => {
  const userId = req.user.id;
  const recipeId = req.params.recipeId;

  try {
    const [fav, created] = await Favorite.findOrCreate({ where: { userId, recipeId } });
    res.status(201).json({ message: 'Receta marcada como favorita' });
  } catch (err) {
    res.status(500).json({ error: 'Error al marcar favorito', details: err.message });
  }
};

exports.remove = async (req, res) => {
  const userId = req.user.id;
  const recipeId = req.params.recipeId;

  try {
    const deleted = await Favorite.destroy({ where: { userId, recipeId } });
    if (deleted) {
      res.json({ message: 'Receta eliminada de favoritos' });
    } else {
      res.status(404).json({ error: 'No estaba en favoritos' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar favorito', details: err.message });
  }
};

exports.list = async (req, res) => {
  const userId = req.user.id;

  try {
    const recipes = await Recipe.findAll({
      include: {
        model: require('../models/User'),
        where: { id: userId },
        attributes: [],
        through: { attributes: [] },
      },
    });
    res.json({ favorites: recipes });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener favoritos', details: err.message });
  }
};
