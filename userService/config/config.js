require('dotenv').config();

module.exports = {
	JWT_SECRET: process.env.JWT_SECRET,
	DB_COFIG: process.env.DB_CONFIG,
};
