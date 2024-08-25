const express = require('express');
const sequelize = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

app.use('/api', orderRoutes);

// Handle other routes and errors
app.use((req, res) => {
	res.status(404).json({ error: 'Route not found' });
});

// init sequalize and run app.
sequelize
	.sync()
	.then(() => {
		console.log('Database connected');
		app.listen(3002, () => {
			console.log('Order Service listening on port 3002');
		});
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	});
