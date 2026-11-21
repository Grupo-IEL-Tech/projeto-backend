module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  return sequelize.define('Product', {
    enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    use_in_menu: { type: DataTypes.BOOLEAN, defaultValue: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    price_with_discount: { type: DataTypes.FLOAT, allowNull: false }
  }, { tableName: 'products', underscored: true });
};
