import { initDB, closeDB } from './db.js';
import { displayMainMenu } from './menu.js';

try {
  await initDB();
  await displayMainMenu();
} finally {
  await closeDB();
}