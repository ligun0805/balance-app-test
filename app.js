const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const umzug = require('./umzug');
const userController = require('./controllers/userController');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/increase-balance', userController.increaseBalance);
app.post('/decrease-balance', userController.decreaseBalance);

const startServer = async () => {
  try {
    // Run migrations
    await umzug.up();

    // Sync database
    await sequelize.sync();

    // Run seeders to add user with initial balance
    const queryInterface = sequelize.getQueryInterface();
    await queryInterface.bulkInsert('Users', [{
      balance: 10000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    // Start the server
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();