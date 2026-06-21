# 📝 Simple CRUD Project - Console Todo App

A feature-rich console-based TODO application built with **JavaScript**, **Node.js**, and **MySQL**. This application allows users to register, login, and manage their tasks with full CRUD operations.

## ✨ Features

- 👤 **User Authentication**
  - User registration with validation
  - Secure login system
  - Email uniqueness check

- 📋 **Task Management**
  - Create tasks with title, description, due date, and priority
  - View all tasks for logged-in user
  - Edit existing tasks
  - Delete tasks with confirmation
  - Search tasks by title or description

- ✅ **Data Validation**
  - Email format validation
  - Password strength check (minimum 4 characters)
  - Date format validation (supports DD/MM/YYYY, YYYY/MM/DD, YYYY-MM-DD)
  - Priority validation (Low, Medium, High)
  - Status validation (Pending, Completed)
  - Task not found error handling

- 🔐 **User-Specific Data**
  - Each user can only see/manage their own tasks
  - Secure session management

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | Latest | JavaScript runtime |
| **JavaScript** | ES6+ | Programming language |
| **MySQL** | 5.7+ | Database |
| **Sequelize** | ^6.37.8 | ORM for database |
| **readline-sync** | ^1.4.10 | Console input handling |
| **dotenv** | ^17.4.2 | Environment variables |

## 📊 Database Schema

### Users Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | Integer | PRIMARY KEY, AUTO_INCREMENT |
| name | String | NOT NULL |
| email | String | UNIQUE, NOT NULL |
| password | String | NOT NULL |
| createdAt | DateTime | DEFAULT CURRENT_TIMESTAMP |
| updatedAt | DateTime | DEFAULT CURRENT_TIMESTAMP |

### Tasks Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | Integer | PRIMARY KEY, AUTO_INCREMENT |
| userId | Integer | FOREIGN KEY (references users.id) |
| title | String | NOT NULL |
| description | Text | NULLABLE |
| dueDate | Date | NULLABLE |
| priority | Enum | Values: 'Low', 'Medium', 'High' |
| status | Enum | Values: 'Pending', 'Completed' |
| createdAt | DateTime | DEFAULT CURRENT_TIMESTAMP |
| updatedAt | DateTime | DEFAULT CURRENT_TIMESTAMP |

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm (comes with Node.js)

### Step 1: Clone/Download Project
```bash
git clone https://github.com/tash-9/todo-app-crud-nodejs-mysql
cd todo-app
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create MySQL Database
Open MySQL and run:
```sql
CREATE DATABASE tododb;
```

Alternatively, use the included `schema.sql` file:
```bash
mysql -u root -p tododb < schema.sql
```

### Step 4: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` with your MySQL credentials:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tododb
DB_USER=root
DB_PASSWORD=your_password
```

### Step 5: Start the Application
```bash
npm start
```

The application will automatically:
- Connect to MySQL
- Create tables if they don't exist
- Display the main menu

## 📱 Application Flow

### Main Menu
```
Welcome to Todo App

1. Register
2. Login
3. Exit

Enter your choice:
```

### After Login - Todo Menu
```
Todo Menu

1. Add Task
2. View All Tasks
3. Edit Task
4. Delete Task
5. Search Tasks
6. Logout

Enter your choice:
```
## 📁 Project Structure

```
todo-app/
├── main.js                 # Application entry point
├── menu.js                 # Main menu & navigation logic
├── auth.js                 # User registration & login
├── db.js                   # Database connection & initialization
├── task.js                 # Task CRUD operations
├── validateFunctions.js    # All validation functions
├── schema.sql              # Database schema
├── package.json            # Project dependencies
├── package-lock.json       # Dependency lock file
├── .env.example            # Environment variables template
├── .env                    # Environment variables (not committed)
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 📋 Validation Rules

| Field | Rules |
|-------|-------|
| **Name** | Cannot be empty, must have length > 0 |
| **Email** | Valid email format (xxx@xxx.xxx), must be unique |
| **Password** | Minimum 4 characters |
| **Task Title** | Cannot be empty |
| **Due Date** | Valid date format: DD/MM/YYYY, YYYY/MM/DD, or YYYY-MM-DD |
| **Priority** | Must be: Low, Medium, or High |
| **Status** | Must be: Pending or Completed |
| **Task ID** | Must be a valid existing task ID |

## 🎥 Video Demo

Watch the complete project walkthrough video demonstrating all features and validations:

📹 **[Watch Project Workflow Video](https://drive.google.com/file/d/1gYto7mtyXX7r5CsOZTvzTk0Y6ASusHX1/view?usp=drive_link)**


## 🚨 Error Messages

### Registration Errors
- ❌ "Name cannot be empty."
- ❌ "Invalid email format."
- ❌ "Email already exists."
- ❌ "Password must be at least 4 characters."

### Login Errors
- ❌ "Invalid email or password."
- ❌ "Wrong credential"

### Task Errors
- ❌ "Task title cannot be empty."
- ❌ "Invalid date format."
- ❌ "Priority must be Low, Medium, or High."
- ❌ "Status must be Pending or Completed"
- ❌ "Task not found."
- ❌ "Invalid task ID."
- ❌ "Delete cancelled."
- ❌ "No tasks found."
- ❌ "No matching tasks found."

## 🔒 Security Features

- ✅ Password strength validation (minimum 4 characters)
- ✅ Email uniqueness constraint
- ✅ User-specific task isolation (users can only see their own tasks)
- ✅ Foreign key constraints for data integrity
- ✅ Environment variables for sensitive data (.env)

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution:** Make sure MySQL is running and credentials in `.env` are correct.

### Module Not Found
```
Error: Cannot find module 'mysql2'
```
**Solution:** Run `npm install` to install all dependencies.

### Invalid Date Format
**Solution:** Use one of these formats:
- `DD/MM/YYYY` (e.g., 25/06/2026)
- `YYYY/MM/DD` (e.g., 2026/06/25)
- `YYYY-MM-DD` (e.g., 2026-06-25)

## 📝 Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tododb
DB_USER=root
DB_PASSWORD=your_password_here
```

## 📦 Dependencies
- **sequelize**: ORM for MySQL database operations
- **mysql2**: MySQL database driver
- **dotenv**: Load environment variables from .env file
- **readline-sync**: Synchronous console input for CLI interaction

## 👨‍💻 Author

Tasfia Islam Raisha

---

## 🤝 Contributing

This is an educational project. Feel free to fork and modify for learning purposes.

## 📞 Support

For issues or questions, please check:
1. MySQL is running
2. `.env` file has correct credentials
3. All dependencies are installed (`npm install`)
4. Database tables are created

---

**Happy Task Managing! 🚀**

