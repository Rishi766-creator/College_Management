const express = require("express");
const router = express.Router();

const { getUsers } = require("../controllers/userController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Only faculty/admin can fetch students
router.get("/", protect, authorizeRoles("faculty", "admin"), getUsers);

module.exports = router;