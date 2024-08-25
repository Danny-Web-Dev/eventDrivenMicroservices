const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use('/api', userRoutes);

// Handle other routes and errors
app.use((req, res) => {
	res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Something went wrong!' });
});

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
