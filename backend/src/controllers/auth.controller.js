import { UsuarioModel } from '../models/usuario.model.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.util.js';
import { generateToken } from '../utils/jwt.util.js';

export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const existingUsuario = await UsuarioModel.findByEmail(email);
    if (existingUsuario) {
      return res.status(400).json({ message: 'Ya existe un usuario con ese email' });
    }

    const passwordHash = await hashPassword(password);
    const nuevoUsuario = await UsuarioModel.create({ nombre, email, passwordHash });
    
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await UsuarioModel.findByEmail(email);
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await comparePassword(password, usuario.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken({ id: usuario.id, email: usuario.email });

    res.json({
      message: 'Login exitoso',
      token,
      user: { id: usuario.id, nombre: usuario.nombre, email: usuario.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};