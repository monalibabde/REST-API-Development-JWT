const path = require('path');
const fs = require('fs');
const IPO = require('../models/IPODetails');

// ✅ Get all IPOs with pagination (Public)
const getAllIPOs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await IPO.countDocuments();
    const ipos = await IPO.find().skip(skip).limit(limit).sort({ openDate: -1 });

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      ipos,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching IPOs', error: error.message });
  }
};


// ✅ Download RHP/DRHP file (Public)
const getDownloadLink = async (req, res) => {
  try {
    const ipo = await IPO.findById(req.params.id);
    if (!ipo) return res.status(404).json({ msg: 'IPO not found' });

    if (!ipo.document) {
      return res.status(404).json({ msg: 'No document available for download' });
    }

    const filePath = path.join(__dirname, '../uploads', ipo.document);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ msg: 'File not found on server' });
    }

    res.download(filePath, ipo.document);
  } catch (error) {
    res.status(500).json({ msg: 'Error downloading document', error: error.message });
  }
};

// ✅ Search IPOs by keyword (Public)
const searchIPOs = async (req, res) => {
  try {
    const keyword = req.query.q || '';
    const ipos = await IPO.find({
      name: { $regex: keyword, $options: 'i' }
    });

    res.json(ipos);
  } catch (error) {
    res.status(500).json({ msg: 'Error searching IPOs', error: error.message });
  }
};

// ✅ Create a new IPO (Admin)
const createIPO = async (req, res) => {
  try {
    const newIPO = new IPO(req.body);
    await newIPO.save();
    res.status(201).json(newIPO);
  } catch (error) {
    res.status(500).json({ msg: 'Error creating IPO', error: error.message });
  }
};

// ✅ Update IPO details (Admin)
const updateIPO = async (req, res) => {
  try {
    const updatedIPO = await IPO.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedIPO);
  } catch (error) {
    res.status(500).json({ msg: 'Error updating IPO', error: error.message });
  }
};

// ✅ Delete IPO (Admin)
const deleteIPO = async (req, res) => {
  try {
    await IPO.findByIdAndDelete(req.params.id);
    res.json({ msg: 'IPO deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting IPO', error: error.message });
  }
};

// ✅ Get IPO by ID (Public)
const getIPOById = async (req, res) => {
  try {
    const ipo = await IPO.findById(req.params.id);
    if (!ipo) return res.status(404).json({ msg: 'IPO not found' });
    res.json(ipo);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching IPO details', error: error.message });
  }
};

// ✅ Upload PDF document (Admin)
const uploadDocument = async (req, res) => {

  try {
    const ipo = await IPO.findById(req.params.id);
    if (!ipo) return res.status(404).json({ msg: 'IPO not found' });

    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    console.log('FILE:', req.file);


    // Save filename in document field
    ipo.document = req.file.filename;
    await ipo.save();

    res.json({ msg: 'Document uploaded successfully', document: req.file.filename });
  } catch (error) {
    res.status(500).json({ msg: 'Error uploading document', error: error.message });
  }
};

// ✅ Delete PDF document (Admin)
const deletePDF = async (req, res) => {
  try {
    const ipo = await IPO.findById(req.params.id);
    if (!ipo) return res.status(404).json({ msg: 'IPO not found' });

    if (ipo.document) {
      const filePath = path.join(__dirname, '../uploads', ipo.document);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting file:', err.message);
      });

      ipo.document = null;
      await ipo.save();
    }

    res.json({ msg: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting document', error: error.message });
  }
};

module.exports = {
  createIPO,
  updateIPO,
  deleteIPO,
  uploadDocument,
  deletePDF,
  getAllIPOs,
  getIPOById,
  searchIPOs,
  getDownloadLink,
};
