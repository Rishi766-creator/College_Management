const express = require("express");
const {
  createResult,
  getMyResults,
  getAllResults,
  getStudentResultsById,
  updateResult,
  deleteResult,
} = require("../controllers/resultController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), createResult);

router.get("/me", protect, authorizeRoles("student"), getMyResults);

router.get("/", protect, authorizeRoles("admin"), getAllResults);

router.get("/:studentId", protect, authorizeRoles("admin"), getStudentResultsById);

router.put("/:id", protect, authorizeRoles("admin"), updateResult);

router.delete("/:id", protect, authorizeRoles("admin"), deleteResult);

module.exports = router;