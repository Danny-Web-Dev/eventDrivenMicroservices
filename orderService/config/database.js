const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('order_service_db', 'root', '12345678', {
	host: 'localhost',
	dialect: 'mysql',
	dialectOptions: {
		timeZone: 'Etc/GMT-3', // Israel Time is GMT+3
	},
	timezone: '+03:00', // For Sequelize to handle date strings
});

module.exports = sequelize;
