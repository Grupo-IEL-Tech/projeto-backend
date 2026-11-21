const bcrypt = require('bcryptjs');
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  const User = sequelize.define('User', {
    firstname: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false }
  }, { tableName: 'users', underscored: true, hooks: {
    beforeCreate: async (user) => { user.password = await bcrypt.hash(user.password, 10); },
    beforeUpdate: async (user) => { if (user.changed('password')) user.password = await bcrypt.hash(user.password, 10); }
  }});
  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };
  return User;
};
