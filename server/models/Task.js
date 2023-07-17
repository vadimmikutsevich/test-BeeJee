const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Task = sequelize.define('Task', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  taskText: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  edited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Task;