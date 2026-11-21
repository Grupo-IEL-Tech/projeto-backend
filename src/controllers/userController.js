const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.create = async (req, res, next) => {
  try {
    const { firstname, surname, email, password, confirmPassword } = req.body;
    if (!firstname || !surname || !email || !password || password !== confirmPassword) {
      return res.status(400).json({ message: 'Informe nome, sobrenome, e-mail e senhas iguais.' });
    }
    const user = await User.create({ firstname, surname, email, password });
    return res.status(201).json(user);
  } catch (e) { return next(e); }
};

exports.token = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password || '', user.password))) {
      return res.status(400).json({ message: 'E-mail ou senha inválidos.' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });
    return res.status(200).json({ token });
  } catch (e) { return next(e); }
};

exports.show = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    return res.json(user);
  } catch (e) { return next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    if (Number(req.user.id) !== Number(user.id)) return res.status(403).json({ message: 'Sem permissão.' });
    const { firstname, surname, email } = req.body;
    await user.update({ firstname, surname, email });
    return res.status(204).end();
  } catch (e) { return next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    if (Number(req.user.id) !== Number(user.id)) return res.status(403).json({ message: 'Sem permissão.' });
    await user.destroy();
    return res.status(204).end();
  } catch (e) { return next(e); }
};
