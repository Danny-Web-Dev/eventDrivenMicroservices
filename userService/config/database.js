const { Sequelize } = require('sequelize');

// ***** make sure you insert your local mysql configs *****

const sequelize = new Sequelize('user_service_db', 'root', '12345678', {
	host: 'localhost',
	dialect: 'mysql',
	timezone: '+03:00',
});

module.exports = sequelize;
