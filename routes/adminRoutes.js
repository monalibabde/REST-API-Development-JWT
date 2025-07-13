const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');
const protect = require('../middlewares/authMiddleware');
const { getAdminLogs } = require('../controllers/adminController');
const adminOnly = require('../middlewares/adminOnly');

router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/logs', protect, adminOnly, getAdminLogs);

module.exports = router;
