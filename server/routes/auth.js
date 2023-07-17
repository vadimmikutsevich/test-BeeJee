const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123') {
    req.session.admin = true;
    res.json({ admin: true });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.sendStatus(500);
    }

    res.sendStatus(200);
  });
});

module.exports = router;