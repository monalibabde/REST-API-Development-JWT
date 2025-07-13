const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ msg: 'Unauthorized: No user info' });
  }

  console.log('🛂 Checking admin role:', req.user); // DEBUG

  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied: Admins only' });
  }

  next();
};

module.exports = adminOnly;
