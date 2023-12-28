module.exports = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (roles.includes(userRole)) {
      next();
    } else {
      res.status(401).json({ message: 'You are not authorized to access this route', status: 403 });
    }
  };
};
