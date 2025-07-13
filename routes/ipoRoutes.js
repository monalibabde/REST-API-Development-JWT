const express = require('express');
const router = express.Router();
const multer = require('multer');
const protect = require('../middlewares/authMiddleware'); // ✅ Use consistent naming
const adminOnly = require('../middlewares/adminOnly');
const {
  createIPO,
  updateIPO,
  deleteIPO,
  uploadDocument,   // ✅ Actual upload controller function
  deletePDF,
  getAllIPOs,
  getIPOById,
  searchIPOs,
  getDownloadLink 
} = require('../controllers/ipoController');

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// ✅ Public Routes
router.get('/', getAllIPOs);
router.get('/search', searchIPOs);
router.get('/:id/download', getDownloadLink);
router.get('/:id', getIPOById);

// ✅ Admin-Only Routes
router.post('/', protect, adminOnly, createIPO);
router.put('/:id', protect, adminOnly, updateIPO);
router.delete('/:id', protect, adminOnly, deleteIPO);

// ✅ Upload & Delete PDF
router.post('/:id/upload', protect, adminOnly, upload.single('pdf'), uploadDocument);
router.delete('/:id/delete-doc', protect, adminOnly, deletePDF);

module.exports = router;
