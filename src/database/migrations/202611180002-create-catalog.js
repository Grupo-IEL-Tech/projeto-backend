module.exports = {
  async up(q, S) {
    await q.createTable('categories', {
      id: { type: S.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      name: { type: S.STRING, allowNull: false }, slug: { type: S.STRING, allowNull: false, unique: true },
      use_in_menu: { type: S.BOOLEAN, allowNull: false, defaultValue: false },
      created_at: { type: S.DATE, allowNull: false }, updated_at: { type: S.DATE, allowNull: false }
    });
    await q.createTable('products', {
      id: { type: S.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      enabled: { type: S.BOOLEAN, defaultValue: false }, name: { type: S.STRING, allowNull: false },
      slug: { type: S.STRING, allowNull: false, unique: true }, use_in_menu: { type: S.BOOLEAN, defaultValue: false },
      stock: { type: S.INTEGER, defaultValue: 0 }, description: { type: S.TEXT },
      price: { type: S.FLOAT, allowNull: false }, price_with_discount: { type: S.FLOAT, allowNull: false },
      created_at: { type: S.DATE, allowNull: false }, updated_at: { type: S.DATE, allowNull: false }
    });
    await q.createTable('product_images', {
      id: { type: S.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      product_id: { type: S.INTEGER, allowNull: false, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE' },
      enabled: { type: S.BOOLEAN, defaultValue: true }, path: { type: S.STRING, allowNull: false }
    });
    await q.createTable('product_options', {
      id: { type: S.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      product_id: { type: S.INTEGER, allowNull: false, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE' },
      title: { type: S.STRING, allowNull: false }, shape: { type: S.ENUM('square', 'circle'), defaultValue: 'square' },
      radius: { type: S.INTEGER, defaultValue: 0 }, type: { type: S.ENUM('text', 'color'), defaultValue: 'text' },
      values: { type: S.STRING, allowNull: false }
    });
    await q.createTable('products_categories', {
      product_id: { type: S.INTEGER, primaryKey: true, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE' },
      category_id: { type: S.INTEGER, primaryKey: true, references: { model: 'categories', key: 'id' }, onDelete: 'CASCADE' }
    });
  },
  async down(q) {
    await q.dropTable('products_categories'); await q.dropTable('product_options');
    await q.dropTable('product_images'); await q.dropTable('products'); await q.dropTable('categories');
  }
};
