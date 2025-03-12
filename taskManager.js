const cron = require('node-cron');
const { Task } = require('./models'); 

const tasks = [
  { name: 'Task 1', interval: '*/1 * * * *', function: 'func1', duration: 120000 },
  { name: 'Task 2', interval: '*/2 * * * *', function: 'func2', duration: 120000 },
  { name: 'Task 3', interval: '*/3 * * * *', function: 'func3', duration: 120000 },
  { name: 'Task 4', interval: '*/4 * * * *', function: 'func4', duration: 120000 },
  { name: 'Task 5', interval: '*/5 * * * *', function: 'func5', duration: 120000 },
  { name: 'Task 6', interval: '*/6 * * * *', function: 'func6', duration: 120000 },
  { name: 'Task 7', interval: '*/7 * * * *', function: 'func7', duration: 120000 },
  { name: 'Task 8', interval: '*/8 * * * *', function: 'func8', duration: 120000 },
  { name: 'Task 9', interval: '*/9 * * * *', function: 'func9', duration: 120000 },
  { name: 'Task 10', interval: '*/10 * * * *', function: 'func10', duration: 120000 },
];

const runningTasks = {}; 

const runTask = async (task, port) => {
  if (runningTasks[task.name]) {
    console.log(`${task.name} is already running on another instance.`);
    return;
  }

  runningTasks[task.name] = true;

  const existingTask = await Task.findOne({
    where: {
      name: task.name,
      status: 'running',
    },
  });

  if (!existingTask) {
    await Task.update(
      { status: 'running', startTime: new Date() },
      { where: { name: task.name, serverId: port, status: 'waiting' } }
    );
   
    await new Promise((resolve) => setTimeout(resolve, task.duration));
    
    await Task.update(
      { status: 'completed' },
      { where: { name: task.name, serverId: port } }
    );
  } else {
    console.log(`${task.name} is already running on another instance.`);
  }
  
  delete runningTasks[task.name];
};

const scheduleTasks = async (port) => {
  for (const task of tasks) {
    await Task.create({
      name: task.name,
      serverId: port,
      startTime: new Date(),
      status: 'waiting',
    });

    cron.schedule(task.interval, async () => {
      runTask(task, port);
    });
  }
};

module.exports = scheduleTasks;