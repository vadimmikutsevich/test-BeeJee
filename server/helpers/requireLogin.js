const requireLogin = (req, res, next) => {
  if (!req.session.admin) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    next();
  }
};

module.exports = requireLogin