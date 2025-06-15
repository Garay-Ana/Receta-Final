const User = require('../models/User');
const Recipe = require('../models/Recipe');
const Favorite = require('../models/Favorite');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const recipesCount = await Recipe.count({ where: { userId: user.id } });
    const favoritesCount = await Favorite.count({ where: { userId: user.id } });

    res.json({
      name: user.name,
      email: user.email,
      recipesCount,
      favoritesCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el perfil', details: err.message });
  }
};
