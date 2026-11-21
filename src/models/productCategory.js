module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  return sequelize.define('ProductCategory', {
    product_id: { type: DataTypes.INTEGER, primaryKey: true },
    category_id: { type: DataTypes.INTEGER, primaryKey: true }
  }, { tableName: 'products_categories', underscored: true, timestamps: false });
};
