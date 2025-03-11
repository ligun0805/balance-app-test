const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const umzug = require('./umzug');
const userController = require('./controllers/userController');
const cors = require('cors');
const initialSeeder = require('./seeders/20250310162455-add-initial-user');
const app = express();
const makeRequests = require('./test-script'); // test script

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/update-balance', userController.updateBalance); 
PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Run migrations
    await umzug.up();

    // Sync database
    await sequelize.sync();

    // Run seeders to add user with initial balance
    const queryInterface = sequelize.getQueryInterface();
    await initialSeeder.up(queryInterface, sequelize);

    // Start the server
    app.listen(PORT, () => {
      console.log('Server is running on port 5000');
    });

    makeRequests();
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer(); 