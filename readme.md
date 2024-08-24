# Event-Driven Microservices System

## Overview

This project is an event-driven microservices system designed to handle a high volume of transactions efficiently. The system is capable of processing various types of events while ensuring data consistency across multiple services.

The microservices included in this project are:

1. **User Service**: Manages user information and authentication.
2. **Order Service**: Handles order creation, updates, and cancellations.
3. **Event Service**: Manages event publication and subscription, facilitating communication between services.

## Architecture

The system follows an event-driven architecture where services communicate asynchronously through events. This architecture allows for scalability, fault tolerance, and flexibility in handling different types of transactions and events.

### Microservices

1. **User Service**

   - **Responsibilities**: Manages user information, handles user authentication, and triggers events when users are created or updated.
   - **Technologies**: Node.js, Express, MySQL, Sequelize(ORM).
   - **APIs**:
     - `POST /api/users` - Create a new user.
     - `GET /api/users/:id` - Retrieve user details.
     - `PUT /api/users/:id` - Update user details.

2. **Order Service**

   - **Responsibilities**: Manages orders including creation, updates, and cancellations. Emits events like "Order Placed" and "Order Cancelled".
   - **Technologies**: Node.js, Express, MySQL, Sequelize.
   - **APIs**:
     - `POST /api/orders` - Place a new order.
     - `GET /api/orders/:id` - Retrieve order details.
     - `POST /api/orders/:id` - Cancel an order.

3. **Event Service**
   - **Responsibilities**: Facilitates event-driven communication between the microservices using NATS or any other message broker.
   - **Technologies**: NATS, Node.js.
   - **Event Types**:
     - `User Created`
     - `User Get`
     - `User Update`
     - `Order Placed`
     - `Order Get`
     - `Order Cancelled`

### Event Flow

1. **User Created**: When a user is created in the User Service, an event is emitted to the Event Service. Other services can subscribe to this event to perform necessary actions.
2. **Order Placed**: When an order is placed, the Order Service emits an "Order Placed" event to notify other services.
3. **Order Cancelled**: When an order is cancelled, an "Order Cancelled" event is emitted by the Order Service.

## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine.
- **MySQL**: Install MySQL and set up the required databases.

### Extra

- **PostMan collection**: For your convinence I have attached a postman collection json. import it and play around.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/event-driven-microservices.git
   cd event-driven-microservices
   ```

- Do not forget to run npm install on each service.
