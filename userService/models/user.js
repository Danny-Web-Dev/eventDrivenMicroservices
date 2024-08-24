const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// insert new user
const User = sequelize.define('User', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
});

// fetch user by id
const getById = async (id) => {
	// Find the user by ID
	const user = await User.findByPk(id);

	return user ?? null;
};

module.exports = { User, getById };
