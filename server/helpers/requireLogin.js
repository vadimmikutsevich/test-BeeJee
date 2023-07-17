const requireLogin = (req, res, next) => {
  console.log(req.session.admin)
  if (!req.session.admin) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    next();
  }
};

module.exports = requireLogin