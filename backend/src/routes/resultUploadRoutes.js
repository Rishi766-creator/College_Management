const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { uploadResultsFromExcel } = require("../controllers/resultUploadController");

const router = express.Router();

router.post(
  "/upload-excel",
  protect,
  authorizeRoles("admin"),
  upload.single("file"),
  uploadResultsFromExcel
);

module.exports = router;