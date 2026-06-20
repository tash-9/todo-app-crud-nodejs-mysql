import 'dotenv/config';
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false,
  }
);

// User Model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

// Task Model
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium',
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Completed'),
    defaultValue: 'Pending',
  },
}, {
  tableName: 'tasks',
  timestamps: true,
});

// Relationships
User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

async function initDB() {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('Database connected and tables ready.\n');
}

async function closeDB() {
  await sequelize.close();
}

export { sequelize, User, Task, initDB, closeDB };
