const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const umzug = require("./umzug");
const userController = require("./controllers/userController");
const taskController = require("./controllers/taskController");
const cors = require("cors");
const initialSeeder = require("./seeders/20250310162455-add-initial-user");
const taskService = require("./services/taskService");
const scheduleTasks = require("./taskManager");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post("/update-balance", userController.updateBalance);
app.get("/tasks", taskController.getTasks);

const startServer = async (port) => {
  try {
    await sequelize.sync();

    // Run seeders to add user with initial balance
    const queryInterface = sequelize.getQueryInterface();
    await initialSeeder.up(queryInterface, sequelize);

    // Create background tasks
    scheduleTasks(port);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

const ports = [5000, 5001, 5002, 5003, 5004];
ports.forEach(port => startServer(port));