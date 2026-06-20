import { Task } from './db.js';
import { Op } from 'sequelize';
import {
  validateDate,
  validatePriority,
  validateStatus,
} from './validateFunctions.js';

async function addTask(userId, title, description, dueDate, priority) {
  // Validation
  if (!title || title.trim() === '') {
    console.log('Task title cannot be empty.');
    return null;
  }

  if (!validateDate(dueDate)) {
    console.log('Invalid date format.');
    return null;
  }

  if (!validatePriority(priority)) {
    console.log('Priority must be Low, Medium, or High.');
    return null;
  }

  // Create task
  const task = await Task.create({
    userId,
    title: title.trim(),
    description: description.trim(),
    dueDate,
    priority,
    status: 'Pending',
  });

  console.log('Task added successfully!\n');
  printTaskDetails(task);
  return task;
}

async function viewAllTasks(userId) {
  const tasks = await Task.findAll({ where: { userId } });

  if (tasks.length === 0) {
    console.log('No tasks found.\n');
    return tasks;
  }

  console.log('Your Tasks:\n');
  tasks.forEach((task) => {
    console.log(`ID: ${task.id}`);
    console.log(`Title: ${task.title}`);
    console.log(`Due Date: ${task.dueDate}`);
    console.log(`Priority: ${task.priority}`);
    console.log(`Status: ${task.status}`);
    console.log('---');
  });
  console.log();

  return tasks;
}

async function editTask(userId, taskId, updates) {
  if (!Number.isInteger(taskId) || taskId <= 0) {
    console.log('Invalid task ID.\n');
    return null;
  }

  // Find task
  const task = await Task.findOne({
    where: { id: taskId, userId },
  });

  if (!task) {
    console.log('Task not found.\n');
    return null;
  }

  // Validate updates
  if (updates.title !== undefined && updates.title.trim() === '') {
    console.log('Task title cannot be empty.');
    return null;
  }

  if (updates.dueDate && !validateDate(updates.dueDate)) {
    console.log('Invalid date format.');
    return null;
  }

  if (updates.priority && !validatePriority(updates.priority)) {
    console.log('Invalid priority.');
    return null;
  }

  if (updates.status && !validateStatus(updates.status)) {
    console.log('Status must be Pending or Completed');
    return null;
  }

  // Update task
  await Task.update(updates, { where: { id: taskId, userId } });
  const updated = await Task.findByPk(taskId);
  console.log('Task updated successfully!\n');
  return updated;
}

async function deleteTask(userId, taskId) {
  if (!Number.isInteger(taskId) || taskId <= 0) {
    console.log('Invalid task ID.\n');
    return false;
  }

  const task = await Task.findOne({
    where: { id: taskId, userId },
  });

  if (!task) {
    console.log('Task not found.\n');
    return false;
  }

  await Task.destroy({ where: { id: taskId } });
  console.log('Task deleted successfully!\n');
  return true;
}

async function searchTasks(userId, keyword) {
  const searchKeyword = keyword.trim();

  const tasks = await Task.findAll({
    where: {
      userId,
      [Op.or]: [
        { title: { [Op.like]: `%${searchKeyword}%` } },
        { description: { [Op.like]: `%${searchKeyword}%` } },
      ],
    },
  });

  if (tasks.length === 0) {
    console.log('No matching tasks found.\n');
    return tasks;
  }

  console.log(`Search Result:\n`);
  tasks.forEach((task) => {
    console.log(`ID: ${task.id}`);
    console.log(`Title: ${task.title}`);
    console.log(`Due Date: ${task.dueDate}`);
    console.log(`Priority: ${task.priority}`);
    console.log(`Status: ${task.status}`);
    console.log('---');
  });
  console.log();

  return tasks;
}

function printTaskDetails(task) {
  console.log(`Task ID: ${task.id}`);
  console.log(`Title: ${task.title}`);
  console.log(`Description: ${task.description}`);
  console.log(`Due Date: ${task.dueDate}`);
  console.log(`Priority: ${task.priority}`);
  console.log(`Status: ${task.status}\n`);
}

export { addTask, viewAllTasks, editTask, deleteTask, searchTasks };
