const EventRequest = require("../models/EventRequest");
const sendEmail = require("../utils/sendEmail");

const createEventRequest = async (req, res) => {
  try {
    const { title, description, proposedDate, venue } = req.body;

    if (!title || !description || !proposedDate || !venue) {
      return res.status(400).json({
        message: "Title, description, proposed date, and venue are required",
      });
    }

    const eventRequest = await EventRequest.create({
      requestedBy: req.user._id,
      requestedByRole: req.user.role,
      title,
      description,
      proposedDate,
      venue,
    });

    return res.status(201).json({
      message: "Event request created successfully",
      eventRequest,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create event request",
      error: error.message,
    });
  }
};

const getMyEventRequests = async (req, res) => {
  try {
    const requests = await EventRequest.find({
      requestedBy: req.user._id,
    })
      .populate("requestedBy", "name email role studentId employeeId")
      .populate("reviewedBy", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "My event requests fetched successfully",
      count: requests.length,
      requests,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch my event requests",
      error: error.message,
    });
  }
};

const getAllEventRequests = async (req, res) => {
  try {
    const requests = await EventRequest.find()
      .populate("requestedBy", "name email role studentId employeeId department")
      .populate("reviewedBy", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All event requests fetched successfully",
      count: requests.length,
      requests,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch event requests",
      error: error.message,
    });
  }
};

const updateEventRequestStatus = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;

    if (!status || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be either approved or rejected",
      });
    }

    const request = await EventRequest.findById(req.params.id).populate(
      "requestedBy",
      "name email role"
    );

    if (!request) {
      return res.status(404).json({
        message: "Event request not found",
      });
    }

    request.status = status;
    request.reviewedBy = req.user._id;
    request.reviewedAt = new Date();

    if (status === "approved") {
      request.rejectionReason = null;
      await request.save();

      await sendEmail({
        to: request.requestedBy.email,
        subject: "Event Request Approved",
        text: `Hello ${request.requestedBy.name}, your event request for "${request.title}" has been approved.`,
      });
    } else if (status === "rejected") {
      request.rejectionReason = rejectionReason || "No reason provided";
      await request.save();

      await sendEmail({
        to: request.requestedBy.email,
        subject: "Event Request Rejected",
        text: `Hello ${request.requestedBy.name}, your event request for "${request.title}" has been rejected. Reason: ${request.rejectionReason}.`,
      });
    }

    return res.status(200).json({
      message: `Event request ${status} successfully`,
      request,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update event request status",
      error: error.message,
    });
  }
};

module.exports = {
  createEventRequest,
  getMyEventRequests,
  getAllEventRequests,
  updateEventRequestStatus,
};