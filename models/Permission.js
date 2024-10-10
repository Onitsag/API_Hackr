const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Permission = sequelize.define('Permission', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  permission: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Permission;
