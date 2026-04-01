const express = require("express");
const {
  createStudentLeaveRequest,
  getMyStudentLeaveRequests,
  getAllStudentLeaveRequests,
  updateStudentLeaveStatus,
} = require("../controllers/studentLeaveController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE (student)
router.post(
  "/",
  protect,
  authorizeRoles("student"),
  createStudentLeaveRequest
);

// GET MY (student)
router.get(
  "/my",
  protect,
  authorizeRoles("student"),
  getMyStudentLeaveRequests
);

// GET ALL (admin)
router.get(
  "/",
  protect,
  authorizeRoles("faculty"),
  getAllStudentLeaveRequests
);

// UPDATE STATUS (admin)
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("faculty"),
  updateStudentLeaveStatus
);

module.exports = router;