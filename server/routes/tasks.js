const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const requireLogin = require('../helpers/requireLogin');

// GET /tasks
router.get('/', async (req, res) => {
  try {
    const { order, limit, offset } = req.query;
    const tasks = await Task.findAll({
      order: [order.split(',')],
      limit: Number(limit),
      offset: Number(offset),
    });
    
    const totalTasks = await Task.count();
    res.json({ tasks, totalTasks });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
});

// POST /tasks
router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /tasks/:id
router.put('/:id', requireLogin, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.update(req.body);
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;