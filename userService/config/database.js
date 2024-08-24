const { Sequelize } = require('sequelize');

// ***** make sure you insert you local mysql configs *****

const sequelize = new Sequelize('user_service_db', 'root', '12345678', {
	host: 'localhost',
	dialect: 'mysql',
	dialectOptions: {
		timeZone: 'Etc/GMT-3', // Israel Time is GMT+3
	},
	timezone: '+03:00',
});

module.exports = sequelize;
