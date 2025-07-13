const IPO = require('../models/IPODetails');
const Company = require('../models/Company');
const AdminLog = require('../models/AdminLog');

const getDashboardStats = async (req, res) => {
  try {
    const ipoCount = await IPO.countDocuments();
    const companyCount = await Company.countDocuments();

    res.json({
      totalIPOs: ipoCount,
      totalCompanies: companyCount,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

const getAdminLogs = async (req, res) => {
  try {
    const logs = await AdminLog.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching logs' });
  }
};

module.exports = { getDashboardStats, getAdminLogs  };
