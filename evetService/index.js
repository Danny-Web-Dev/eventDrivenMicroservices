const NATS = require('nats');

// NATS setup
const nats = NATS.connect({ url: 'nats://localhost:4222' });

// Listen to 'User Created' event
nats.subscribe('user:created', (msg) => {
	const data = JSON.parse(msg);
	console.log(`User Created Event Received: ${data.name} (${data.email})`);
});

// Listen to 'Order Placed' event
nats.subscribe('order:placed', (msg) => {
	const data = JSON.parse(msg);
	console.log(`Order Placed Event Received: Order ${data.id} by User ${data.userId}`);
});

// Listen to 'Order Cancelled' event
nats.subscribe('order:cancelled', (msg) => {
	const data = JSON.parse(msg);
	console.log(`Order Cancelled Event Received: Order ${data.id}`);
});

console.log('Event Service listening for events...');
