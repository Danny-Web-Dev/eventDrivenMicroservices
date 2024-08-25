const NATS = require('nats');

// color pallet for logs.
const reset = '\x1b[0m';
const bright = '\x1b[1m';
const fgGreen = '\x1b[32m';
const fgYellow = '\x1b[33m';

// NATS setup
const nats = NATS.connect({ url: 'nats://localhost:4222' });

// Common log function with color
const logEvent = (eventLabel, message, color = fgGreen) => {
	console.log(`${bright}${color}${eventLabel}:${reset} ${fgYellow}${message}${reset}`);
};

// Common subscription function
const subscribeToEvent = (event, callback) => {
	nats.subscribe(event, (msg) => {
		callback(msg);
	});
};

// Listen to 'User Created' event
subscribeToEvent('user:created', (msg) => {
	logEvent('User Created Event Received', `User Details: ${msg}`);
});

// Listen to 'User Get' event
subscribeToEvent('user:get', (msg) => {
	logEvent('User Get Event Received', `User Details: ${msg}`);
});

// Listen to 'User Update' event
subscribeToEvent('user:update', (msg) => {
	logEvent('User Update Event Received:', `User Details: ${msg}`);
});

// Listen to 'Order Placed' event
subscribeToEvent('order:placed', (msg) => {
	const data = JSON.parse(msg);
	logEvent('Order Placed Event Received', `OrderId: ${data.id} by UserId: ${data.userId}`);
});

// Listen to 'Order Get' event
subscribeToEvent('order:get', (msg) => {
	logEvent('Order Get Event Received', `Order Details: ${msg}`);
});

// Listen to 'Order Cancelled' event
subscribeToEvent('order:cancelled', (msg) => {
	const data = JSON.parse(msg);
	logEvent('Order Cancelled Event Received', `OrderId: ${data.id}`);
});

console.log(`${bright}${fgGreen}Event Service listening for events...${reset}`);
