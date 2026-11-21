const { Op } = require('sequelize');
const { Category } = require('../models');
const pagination = require('../utils/pagination');

exports.search = async (req, res, next) => {
  try {
    const { limit, page, options } = pagination(req.query);
    const where = {};
    if (req.query.use_in_menu !== undefined) where.use_in_menu = req.query.use_in_menu === 'true';
    const attributes = req.query.fields ? req.query.fields.split(',').map(x => x.trim()).filter(Boolean) : undefined;
    const result = await Category.findAndCountAll({ where, attributes, ...options, order: [['id', 'ASC']] });
    return res.json({ data: result.rows, total: result.count, limit, page });
  } catch (e) { return next(e); }
};
exports.show = async (req, res, next) => {
  try {
    const item = await Category.findByPk(req.params.id);
    return item ? res.json(item) : res.status(404).json({ message: 'Categoria não encontrada.' });
  } catch (e) { return next(e); }
};
exports.create = async (req, res, next) => {
  try {
    const { name, slug, use_in_menu = false } = req.body;
    if (!name || !slug) return res.status(400).json({ message: 'Nome e slug são obrigatórios.' });
    return res.status(201).json(await Category.create({ name, slug, use_in_menu }));
  } catch (e) { return next(e); }
};
exports.update = async (req, res, next) => {
  try {
    const item = await Category.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Categoria não encontrada.' });
    await item.update(req.body);
    return res.status(204).end();
  } catch (e) { return next(e); }
};
exports.remove = async (req, res, next) => {
  try {
    const item = await Category.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Categoria não encontrada.' });
    await item.destroy();
    return res.status(204).end();
  } catch (e) { return next(e); }
};
