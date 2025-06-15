const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(404).json({ error: 'Admin no encontrado' });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión', details: err.message });
  }
};
