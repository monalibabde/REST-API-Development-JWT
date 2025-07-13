const express = require('express');
const router = express.Router();

// ✅ Import the loginAdmin controller function
const { loginAdmin } = require('../controllers/authController');

// ✅ Admin login route
router.post('/login', loginAdmin);

module.exports = router;
