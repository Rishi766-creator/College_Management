const express = require("express");
const {
  createEventRequest,
  getMyEventRequests,
  getAllEventRequests,
  updateEventRequestStatus,
} = require("../controllers/eventRequestController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("student", "faculty"),
  createEventRequest
);

router.get(
  "/my",
  protect,
  authorizeRoles("student", "faculty"),
  getMyEventRequests
);

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllEventRequests
);

router.patch(
  "/:id/status",
  protect,
  authorizeRoles("admin"),
  updateEventRequestStatus
);

module.exports = router;