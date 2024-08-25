const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

// init sequalize and run app.
sequelize
	.sync()
	.then(() => {
		console.log('Database connected');
		app.listen(3001, () => {
			console.log('User Service listening on port 3001');
		});
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	});
