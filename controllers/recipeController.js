const Recipe = require('../models/Recipe');
const { Op } = require('sequelize');

// Buscar recetas por título (público)
exports.search = async (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  try {
    const recipes = await Recipe.findAll({
      where: {
        title: { [Op.iLike]: `%${q}%` },
      },
      order: [['createdAt', 'DESC']]
    });
    res.json({ recipes });
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar recetas' });
  }
};

// Obtener una receta por ID (público)
exports.getOne = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Receta no encontrada' });
    res.json({ recipe });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener receta' });
  }
};

// Crear una receta con imagen (usando Cloudinary)
exports.create = async (req, res) => {
  const { title, description, ingredients, instructions, prepTime } = req.body;
  const userId = req.user?.id;

  if (!title || !description || !ingredients || !instructions || !prepTime) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const imageUrl = req.file ? req.file.path : null;

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      userId,
      imageUrl
    });

    res.status(201).json({ message: 'Receta creada correctamente', recipe });
  } catch (err) {
    res.status(500).json({
      error: 'Error al crear la receta',
      details: err.message
    });
  }
};

// Actualizar una receta (imagen nueva en Cloudinary)
exports.update = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Receta no encontrada' });

    const { title, description, ingredients, instructions, prepTime } = req.body;
    const imageUrl = req.file ? req.file.path : recipe.imageUrl;

    await recipe.update({
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      imageUrl
    });

    res.json({ message: 'Receta actualizada correctamente', recipe });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar receta', details: err.message });
  }
};

// Eliminar una receta (sin borrar imagen en Cloudinary)
exports.delete = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Receta no encontrada' });

    // Si quieres borrar la imagen de Cloudinary, aquí puedes hacerlo luego

    await recipe.destroy();
    res.json({ message: 'Receta eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar receta', details: err.message });
  }
};
