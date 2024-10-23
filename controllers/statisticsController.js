const CrimeReport = require('../models/CrimeReport');

exports.getCrimeStatistics = async (req, res) => {
  try {
    const { startDate, endDate, location } = req.query;

    const query = {};
    if (startDate && endDate) {
      query.dateTime = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (location) {
      query.location = location;
    }

    const crimeStats = await CrimeReport.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$location', // Group by location, modify if needed
          reported: { $sum: { $cond: [{ $eq: ['$status', 'reported'] }, 1, 0] } },
          resolved: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } },
          closed: { $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] } }
        }
      },
      { $sort: { _id: 1 } } // Sort by location, modify if grouping differently
    ]);

    res.json(crimeStats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching crime statistics', error: error.message });
  }
};
