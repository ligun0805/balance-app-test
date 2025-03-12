const { Task } = require('../models');
const { Op } = require('sequelize');

exports.getTasks = async () => {
  const tasks = await Task.findAll();
  const currentTime = new Date();

  return tasks.map(task => {
    const elapsedTime = task.status === "running" ? Math.floor((currentTime - new Date(task.startTime)) / 1000) : Math.floor((new Date(task.updatedAt) - new Date(task.startTime)) / 1000);
    
    return {
      id: task.id,
      name: task.name,
      serverId: task.serverId,
      status: task.status,
      elapsedTime: elapsedTime ? `${elapsedTime} seconds` : 'N/A',
    };
  });
};

