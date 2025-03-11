# Simple Web Application

## Overview

This project is a simple web application that uses Sequelize as an ORM to interact with a PostgreSQL database. The configuration values for the database connection are stored in a `.env` file for security and flexibility.

## Technologies Used

- Node.js
- Sequelize
- PostgreSQL
- dotenv

This file sets up the Sequelize connection using the configuration values from the .env file and loads all the models in the models directory.

## How to Run

1. Install dependencies

`npm install`

2. Create a .env file in the root directory with the necessary environment variables.

NODE_ENV=development & production & test
PORT=server_port
DB_TEST_DATABASE=test_database_name
DB_PRODUCTION_DATABASE=production_database_name 
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_db
DB_HOST=your_db_host
DB_PORT=your_db_port 

3. Run the application:

  `npm run dev`

## Running Migrations and Seeders

To run migrations and seeders, use the following commands:

1. Run migrations:

  `npx sequelize-cli db:migrate`

2. Run seeders:
  `npx sequelize-cli db:seed:all`

This setup ensures that your database schema is managed through migrations and seeders, following best practices for database management.

## API Endpoints

POST /update-balance
Updates the balance of a user.

## Error Handling

The application includes basic error handling for validation errors and server errors. Validation errors return a 400 status code with a descriptive message, while server errors return a 500 status code with an error message.

## Conclusion

This setup ensures that your database schema is managed through migrations and seeders, following best practices for database management. The application is configured to use environment variables for sensitive information, providing a secure and flexible configuration.