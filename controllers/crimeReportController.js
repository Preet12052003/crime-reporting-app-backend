const CrimeReport = require('../models/CrimeReport');

// Submit a new crime report
exports.submitReport = async (req, res) => {
  try {
    const { crimeType, description, location, dateTime, userId } = req.body;

    // Create a new crime report instance
    const newReport = new CrimeReport({
      crimeType,
      description,
      location,
      dateTime,
      userId,
      submittedAt: new Date(), // Automatically set submission time
    });

    // Save the report to the database
    const savedReport = await newReport.save();
    console.log(savedReport);
    

    return res.status(201).json({
      message: 'Crime report submitted successfully.',
      reportId: savedReport._id, // Return the ID of the saved report
    });
  } catch (error) {
    console.error('Error submitting report:', error);
    return res.status(500).json({
      message: 'Error submitting report. Please try again later.',
      error: error.message,
    });
  }
};

// Fetch all crime reports
exports.getReports = async (req, res) => {
  try {
    const { userId } = req.body
    const reports = await CrimeReport.find({userId}).sort({ submittedAt: -1 }); // Sort by submission date
    return res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    return res.status(500).json({
      message: 'Error fetching reports. Please try again later.',
      error: error.message,
    });
  }
};

// Get a single crime report by ID
exports.getSingleReport = async (req, res) => {
  const { id } = req.params; // Get the report ID from the request parameters
  try {
    const report = await CrimeReport.findById(id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }

    return res.status(200).json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    return res.status(500).json({
      message: 'Error fetching report. Please try again later.',
      error: error.message,
    });
  }
};
