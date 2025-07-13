const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const AdminLog = require('../models/AdminLog'); // ✅ Add this

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email });

    if (!admin) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    const token = jwt.sign(
  { id: admin._id, role: admin.role },  // ✅ include role here
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);




    // ✅ Log the login activity here
    await AdminLog.create({
      email: admin.email,
      action: 'Logged In',
    });

    console.log('✅ Admin logged in and log created'); // Make sure this shows

    res.json({ token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  loginAdmin,
};
