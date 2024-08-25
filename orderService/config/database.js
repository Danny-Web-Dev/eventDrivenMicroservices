require('dotenv').config();
const { Sequelize } = require('sequelize');

const dbDetails = JSON.parse(process.env.DB_CONFIG);

// ***** make sure you insert your local mysql configs *****

// Sequelize ORM configuration
const sequelize = new Sequelize('orders', dbDetails.user, dbDetails.password, {
	host: dbDetails.host,
	dialect: 'mysql',
	timezone: '+03:00',
});

module.exports = sequelize;
