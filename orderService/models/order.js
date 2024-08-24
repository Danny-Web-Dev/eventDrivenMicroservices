const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// ORM interaction
const Order = sequelize.define('Order', {
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	productId: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		defaultValue: 'created',
	},
});

module.exports = Order;
