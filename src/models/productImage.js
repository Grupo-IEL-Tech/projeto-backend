module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  return sequelize.define('ProductImage', {
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
    path: { type: DataTypes.STRING, allowNull: false }
  }, { tableName: 'product_images', underscored: true, timestamps: false });
};
