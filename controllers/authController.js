const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Verifica si ya existe un usuario con ese correo
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Usuario registrado correctamente', user });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar usuario
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Comparar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Generar token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
  }
};
