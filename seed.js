const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await User.create({
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin'
  });

  console.log('✅ Admin user created');
  mongoose.disconnect();
});
