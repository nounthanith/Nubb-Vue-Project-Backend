# Backend Coffee Menu API

This is the backend API for a coffee menu application. It is built with Node.js, Express, and MongoDB.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installing

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/backend_coffee_menu_v1.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add the following environment variables:

   ```
   PORT=3000
   MONGODB_URI=your-mongodb-connection-string
   SECRET=your-jwt-secret
   EXPIRES=7d
   FRONTEND_URL=http://localhost:5173
   FRONTEND_URL_2=http://localhost:5174
   ```

4. Start the server:

   ```bash
   npm start
   ```

The server will be running on `http://localhost:3000`.

## API Endpoints

The following are the available API endpoints:

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/logout` - Logout a user
- `GET /api/auth/profile` - Get the profile of the currently logged in user
- `GET /api/auth/users` - Get all users (admin only)
- `POST /api/category` - Create a new category
- `GET /api/category` - Get all categories
- `GET /api/category/:id` - Get a category by id
- `PUT /api/category/:id` - Update a category
- `DELETE /api/category/:id` - Delete a category
- `POST /api/product` - Create a new product
- `GET /api/product` - Get all products
- `GET /api/product/group-by-category` - Get products grouped by category
- `GET /api/product/by-category/:categoryName` - Get products by category name
- `GET /api/product/:id` - Get a product by id
- `PUT /api/product/:id` - Update a product
- `DELETE /api/product/:id` - Delete a product
