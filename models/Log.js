const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User'); // Pour la relation avec User

const Log = sequelize.define('Log', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Log;
