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
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	totalPrice: {
		type: DataTypes.DECIMAL(10, 2), // Adjusted to handle decimal prices
		allowNull: false,
	},
	orderDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	shippingAddress: {
		type: DataTypes.JSON, // Use JSON to store an object
		allowNull: false,
	},
	paymentMethod: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		defaultValue: 'created', // Keep the default as 'created' unless overridden
	},
});

module.exports = Order;
