const { Sequelize } = require('sequelize');
const { DB_COFIG } = require('../config/config');

const dbDetails = JSON.parse(DB_COFIG);

// ***** make sure you insert your local mysql configs *****

// Sequelize ORM configuration
const sequelize = new Sequelize(dbDetails.database, dbDetails.user, dbDetails.password, {
	host: dbDetails.host,
	dialect: 'mysql',
	timezone: '+03:00',
});

module.exports = sequelize;
