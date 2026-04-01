const StudentLeave = require("../models/StudentLeave");
const sendEmail = require("../utils/sendEmail");

// CREATE LEAVE REQUEST
const createStudentLeaveRequest = async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;

    if (!fromDate || !toDate || !reason) {
      return res.status(400).json({
        message: "From date, to date and reason are required",
      });
    }

    const leaveRequest = await StudentLeave.create({
      student: req.user._id,
      fromDate,
      toDate,
      reason,
    });

    return res.status(201).json({
      message: "Student leave request created successfully",
      leaveRequest,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create student leave request",
      error: error.message,
    });
  }
};

// GET MY LEAVE REQUESTS
const getMyStudentLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await StudentLeave.find({
      student: req.user._id,
    })
      .populate("student", "name email role studentId")
      .populate("reviewedBy", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "My student leave requests fetched successfully",
      count: leaveRequests.length,
      leaveRequests,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch my student leave requests",
      error: error.message,
    });
  }
};

// GET ALL (ADMIN)
const getAllStudentLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await StudentLeave.find()
      .populate("student", "name email role studentId department")
      .populate("reviewedBy", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All student leave requests fetched successfully",
      count: leaveRequests.length,
      leaveRequests,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch student leave requests",
      error: error.message,
    });
  }
};

// UPDATE STATUS (ADMIN)
const updateStudentLeaveStatus = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;

    if (!status || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be either approved or rejected",
      });
    }

    const leaveRequest = await StudentLeave.findById(req.params.id)
      .populate("student", "name email");

    if (!leaveRequest) {
      return res.status(404).json({
        message: "Student leave request not found",
      });
    }

    leaveRequest.status = status;
    leaveRequest.reviewedBy = req.user._id;
    leaveRequest.reviewedAt = new Date();

    if (status === "approved") {
      leaveRequest.rejectionReason = null;
    } else {
      leaveRequest.rejectionReason =
        rejectionReason || "No reason provided";
    }

    await leaveRequest.save();

    // 🔥 safe email (won’t break API)
    try {
      await sendEmail({
        to: leaveRequest.student.email,
        subject: `Student Leave Request ${status}`,
        text: `Hello ${leaveRequest.student.name}, your leave request has been ${status}.`,
      });
    } catch (err) {
      console.log("Email error:", err.message);
    }

    return res.status(200).json({
      message: `Student leave request ${status} successfully`,
      leaveRequest,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to update student leave request",
      error: error.message,
    });
  }
};

module.exports = {
  createStudentLeaveRequest,
  getMyStudentLeaveRequests,
  getAllStudentLeaveRequests,
  updateStudentLeaveStatus,
};