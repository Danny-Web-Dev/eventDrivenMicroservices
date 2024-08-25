const { Sequelize } = require('sequelize');

// ***** make sure you insert your local mysql configs *****

// Sequelize ORM configuration
const sequelize = new Sequelize('users', 'root', '12345678', {
	host: 'localhost',
	dialect: 'mysql',
	timezone: '+03:00',
});

module.exports = sequelize;
