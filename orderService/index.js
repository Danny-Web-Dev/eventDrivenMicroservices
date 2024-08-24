const express = require('express');
const sequelize = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

app.use('/api', orderRoutes);

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
