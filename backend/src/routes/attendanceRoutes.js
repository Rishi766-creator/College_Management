const express = require("express");
const {
  markAttendance,
  getMyAttendance,
  getMyMonthlyAttendance,
  getClassAttendance,
  sendMonthlyAttendanceToParents,
} = require("../controllers/attendanceController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorizeRoles("faculty"), markAttendance);

router.get("/me", protect, authorizeRoles("student"), getMyAttendance);

router.get("/me/monthly", protect, authorizeRoles("student"), getMyMonthlyAttendance);

router.get("/class", protect, authorizeRoles("faculty", "admin"), getClassAttendance);

router.post(
  "/send-monthly-email",
  protect,
  authorizeRoles("faculty"),
  sendMonthlyAttendanceToParents
);

module.exports = router;