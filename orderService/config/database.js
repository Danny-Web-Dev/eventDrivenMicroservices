const { Sequelize } = require('sequelize');

// ***** make sure you insert you local mysql configs *****

const sequelize = new Sequelize('orders', 'root', '12345678', {
	host: 'localhost',
	dialect: 'mysql',
	timezone: '+03:00',
});

module.exports = sequelize;
