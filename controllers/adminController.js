const Admin = require('../models/Admin');
const { User, Recipe } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// 🟢 Login de administrador
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(404).json({ error: 'Admin no encontrado' });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: admin.id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión', details: err.message });
  }
};

// 🟢 Dashboard de administrador
exports.dashboard = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
    const recipes = await Recipe.findAll({
      include: [{ model: User, attributes: ['name'] }]
    });

    res.json({ users, recipes });
  } catch (err) {
    res.status(500).json({ error: 'Error al cargar dashboard', details: err.message });
  }
};
