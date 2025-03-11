const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const umzug = require('./umzug');
const userController = require('./controllers/userController');
const cors = require('cors');
const initialSeeder = require('./seeders/20250310162455-add-initial-user');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/update-balance', userController.updateBalance); 
PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    
    await sequelize.sync();

    // Run seeders to add user with initial balance
    const queryInterface = sequelize.getQueryInterface();
    await initialSeeder.up(queryInterface, sequelize);

    // Start the server
    app.listen(PORT, () => {
      console.log('Server is running on port 5000');
    });

  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer(); 