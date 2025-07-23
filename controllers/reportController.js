const Report = require('../models/Report');

// POST /api/reports
exports.createReport = async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json({ message: "Report submitted successfully", report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit report" });
  }
};

// GET /api/reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reports" });
  }
};

// GET /api/reports/:id
exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: "Error fetching report" });
  }
};

// PATCH /api/reports/:id/flag
exports.flagReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { flagged: true },
      { new: true }
    );
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json({ message: "Report flagged", report });
  } catch (err) {
    res.status(500).json({ message: "Error flagging report" });
  }
};
