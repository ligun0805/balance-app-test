
# Simple Web Application

## Overview

This project is a simple web application that uses Sequelize as an ORM to interact with a PostgreSQL database. The configuration values for the database connection are stored in a `.env` file for security and flexibility.

## Technologies Used

- Node.js
- Sequelize
- PostgreSQL
- dotenv    

## How to Run  

1. Install dependencies
	
	`npm install`
	
2. Create a .env file in the root directory with the necessary environment variables.

    `NODE_ENV=development & production & test` 
    
    `PORT=server_port`
    
    `DB_TEST_DATABASE=test_database_name`
    
    `DB_PRODUCTION_DATABASE=production_database_name`
    
    `DB_USERNAME=your_db_username`
    
    `DB_PASSWORD=your_db_password`
    
    `DB_DATABASE=your_db`
    
    `DB_HOST=your_db_host`
    
    `DB_PORT=your_db_port`

  

3. Run the application:

    `npm run dev`

    The application will run on the port specified in the .env file under the PORT variable. For example, if you set PORT=5000, the application will be accessible at http://localhost:5000.


## Running Migrations and Seeders

To run migrations and seeders, use the following commands:

1. Run migrations:

  `npm run migrate`

2. Run seeders:

  `npm run seed`

This setup ensures that your database schema is managed through migrations and seeders, following best practices for database management.

## API Endpoints


`POST/update-balance`

Updates the balance of a user.
  

## Error Handling
  

The application includes basic error handling for validation errors and server errors. Validation errors return a 400 status code with a descriptive message, while server errors return a 500 status code with an error message.

  

## Running the Test Script

To run the test script, use the following command:

  `npm run test`
  

This script will send multiple requests to the /update-balance endpoint to test the functionality.
  

## Conclusion
  
This application serves as a robust platform for managing user balances through the POST API endpoint, allowing for efficient updates of user funds. 
By utilizing Sequelize for database interactions and implementing migrations and seeders, the application ensures a well-structured database schema that adheres to best practices. 
With environment variables enhancing security and flexibility, this setup provides a solid foundation for further development and scalability in financial or transactional contexts.

