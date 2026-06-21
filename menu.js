import readlineSync from 'readline-sync';
import { userRegistration, loginUser } from './auth.js';
import { Task } from './db.js';
import {
  addTask,
  viewAllTasks,
  editTask,
  deleteTask,
  searchTasks,
} from './task.js';

const prompt = (question) => readlineSync.question(question);

async function displayMainMenu() {
  while (true) {
    console.log('Welcome to Todo App\n');
    console.log('1. Register');
    console.log('2. Login');
    console.log('3. Exit\n');

    const choice = prompt('Enter your choice: ').trim();

    if (choice === '1') {
      // Register
      const name = prompt('\nEnter your name:\n');
      const email = prompt('\nEnter your email:\n');
      const password = prompt('Enter your password: ');
      await userRegistration(name, email, password);
    } else if (choice === '2') {
      // Login
      const email = prompt('\nEnter your email:\n');
      const password = prompt('Enter your password: ');
      const user = await loginUser(email, password);

      if (user) {
        await displayTaskMenu(user.id);
      }
    } else if (choice === '3') {
      // Exit
      console.log('Goodbye!');
      break;
    } else {
      console.log('Invalid choice. Try again.\n');
    }
  }
}

async function displayTaskMenu(userId) {
  while (true) {
    console.log('Todo Menu\n');
    console.log('1. Add Task');
    console.log('2. View All Tasks');
    console.log('3. Edit Task');
    console.log('4. Delete Task');
    console.log('5. Search Tasks');
    console.log('6. Logout\n');

    const choice = prompt('Enter your choice: ').trim();

    if (choice === '1') {
      // Add Task
      const title = prompt('\nEnter task title:\n');
      const description = prompt('\nEnter task description:\n');
      const dueDate = prompt('\nEnter due date:\n');
      const priority = prompt('\nEnter priority:\n');
      await addTask(userId, title, description, dueDate, priority);
    } else if (choice === '2') {
      // View All Tasks
      await viewAllTasks(userId);
    } else if (choice === '3') {
      // Edit Task
      const taskId = Number(prompt('\nEnter task ID to edit:\n'));

      if (!Number.isInteger(taskId) || taskId <= 0) {
        console.log('Invalid task ID.\n');
        continue;
      }

      const task = await Task.findOne({ where: { id: taskId, userId } });

      if (!task) {
        console.log('Task not found.\n');
        continue;
      }

      const updates = {};

      const newTitle = prompt(`Current Title: ${task.title}\nEnter new title:\n`);
      if (newTitle) updates.title = newTitle.trim();

      const newDesc = prompt(`Current Description: ${task.description}\nEnter new description:\n`);
      if (newDesc) updates.description = newDesc.trim();

      const newDate = prompt(`Current Due Date: ${task.dueDate}\nEnter new due date:\n`);
      if (newDate) updates.dueDate = newDate.trim();

      const newPriority = prompt(`Current Priority: ${task.priority}\nEnter new priority (Low/Medium/High):\n`);
      if (newPriority) updates.priority = newPriority.trim();

      const newStatus = prompt(`Current Status: ${task.status}\nEnter new status (Pending/Completed):\n`);
      if (newStatus) updates.status = newStatus.trim();

      await editTask(userId, taskId, updates);
    } else if (choice === '4') {
      // Delete Task
      const taskId = Number(prompt('\nEnter task ID to delete:\n'));
      const confirm = prompt('\nAre you sure you want to delete this task? yes/no\n');

      if (confirm.toLowerCase() === 'yes') {
        await deleteTask(userId, taskId);
      } else {
        console.log('Delete cancelled.\n');
      }
    } else if (choice === '5') {
      // Search Tasks
      const keyword = prompt('\nEnter search keyword:\n');
      await searchTasks(userId, keyword);
    } else if (choice === '6') {
      // Logout
      console.log();
      break;
    } else {
      console.log('Invalid choice. Try again.\n');
    }
  }
}

export { displayMainMenu };
