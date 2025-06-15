const Recipe = require('../models/Recipe');
const { Op } = require('sequelize');

exports.search = async (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  try {
    const recipes = await Recipe.findAll({
      where: {
        title: { [Op.iLike]: `%${q}%` },
      },
    });
    res.json({ recipes });
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar recetas' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Receta no encontrada' });
    res.json({ recipe });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener receta' });
  }
};
