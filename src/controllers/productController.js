const { Op } = require('sequelize');
const { Product, ProductImage, ProductOption, Category } = require('../models');
const pagination = require('../utils/pagination');

const include = [
  { model: ProductImage, as: 'images' },
  { model: ProductOption, as: 'options' },
  { model: Category, as: 'categories', through: { attributes: [] } }
];
const serialize = (p) => {
  const item = p.toJSON();
  item.category_ids = item.categories?.map(c => c.id) || [];
  delete item.categories;
  item.images = (item.images || []).map(i => ({ id: i.id, content: i.path, enabled: i.enabled }));
  return item;
};

exports.search = async (req, res, next) => {
  try {
    const { limit, page, options } = pagination(req.query);
    const where = {};
    if (req.query.match) where[Op.or] = [
      { name: { [Op.like]: `%${req.query.match}%` } },
      { description: { [Op.like]: `%${req.query.match}%` } }
    ];
    if (req.query['price-range']) {
      const [min, max] = req.query['price-range'].split('-').map(Number);
      if (!Number.isFinite(min) || !Number.isFinite(max) || min > max) {
        return res.status(400).json({ message: 'Faixa de preço inválida.' });
      }
      where.price = { [Op.between]: [min, max] };
    }
    if (req.query.enabled !== undefined) where.enabled = req.query.enabled === 'true';
    const result = await Product.findAndCountAll({
      where, include, distinct: true, ...options, order: [['id', 'ASC']]
    });
    let data = result.rows.map(serialize);
    if (req.query.category_ids) {
      const ids = req.query.category_ids.split(',').map(Number);
      data = data.filter(p => ids.every(id => p.category_ids.includes(id)));
    }
    return res.json({ data, total: result.count, limit, page });
  } catch (e) { return next(e); }
};
exports.show = async (req, res, next) => {
  try {
    const item = await Product.findByPk(req.params.id, { include });
    return item ? res.json(serialize(item)) : res.status(404).json({ message: 'Produto não encontrado.' });
  } catch (e) { return next(e); }
};
exports.create = async (req, res, next) => {
  const transaction = await require('../models').sequelize.transaction();
  try {
    const { images = [], options = [], category_ids = [], ...data } = req.body;
    if (!data.name || !data.slug || data.price === undefined || data.price_with_discount === undefined) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Nome, slug, preço e preço promocional são obrigatórios.' });
    }
    const product = await Product.create(data, { transaction });
    if (images.length) await ProductImage.bulkCreate(images.map(i => ({
      product_id: product.id, path: i.content || i.path, enabled: i.enabled ?? true
    })), { transaction });
    if (options.length) await ProductOption.bulkCreate(options.map(o => ({
      product_id: product.id, title: o.title, shape: o.shape || 'square',
      radius: parseInt(o.radius, 10) || 0, type: o.type || 'text',
      values: Array.isArray(o.values) ? o.values.join(',') : o.values
    })), { transaction });
    if (category_ids.length) await product.setCategories(category_ids, { transaction });
    await transaction.commit();
    const created = await Product.findByPk(product.id, { include });
    return res.status(201).json(serialize(created));
  } catch (e) { await transaction.rollback(); return next(e); }
};
exports.update = async (req, res, next) => {
  const transaction = await require('../models').sequelize.transaction();
  try {
    const product = await Product.findByPk(req.params.id, { transaction });
    if (!product) { await transaction.rollback(); return res.status(404).json({ message: 'Produto não encontrado.' }); }
    const { images, options, category_ids, ...data } = req.body;
    await product.update(data, { transaction });
    if (category_ids) await product.setCategories(category_ids, { transaction });
    if (images) {
      await ProductImage.destroy({ where: { product_id: product.id }, transaction });
      await ProductImage.bulkCreate(images.filter(i => !i.deleted).map(i => ({
        product_id: product.id, path: i.content || i.path, enabled: i.enabled ?? true
      })), { transaction });
    }
    if (options) {
      await ProductOption.destroy({ where: { product_id: product.id }, transaction });
      await ProductOption.bulkCreate(options.filter(o => !o.deleted).map(o => ({
        product_id: product.id, title: o.title, shape: o.shape || 'square',
        radius: parseInt(o.radius, 10) || 0, type: o.type || 'text',
        values: Array.isArray(o.values) ? o.values.join(',') : o.values
      })), { transaction });
    }
    await transaction.commit();
    return res.status(204).end();
  } catch (e) { await transaction.rollback(); return next(e); }
};
exports.remove = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });
    await product.destroy();
    return res.status(204).end();
  } catch (e) { return next(e); }
};
