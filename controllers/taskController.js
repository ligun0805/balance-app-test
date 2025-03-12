const taskService = require('../services/taskService'); 

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

