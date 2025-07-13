const express = require('express');
const Company = require('../models/Company');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// Public: Get all companies
router.get('/', async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

// Admin: Add company
router.post('/', protect, async (req, res) => {
  const company = new Company(req.body);
  await company.save();
  res.json(company);
});

// Admin: Update company
router.put('/:id', protect, async (req, res) => {
  const updated = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Admin: Delete company
router.delete('/:id', protect, async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Company deleted' });
});

// Public: Get company details
router.get('/:id', async (req, res) => {
  const company = await Company.findById(req.params.id);
  res.json(company);
});

module.exports = router;
