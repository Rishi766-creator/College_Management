const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/results-template",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    const csvContent = [
      "studentId,semester,department,subjectName,marks,grade,sgpa",
      "S101,4,CSE,DBMS,85,A,8.4",
      "S101,4,CSE,OS,78,B+,8.4",
      "S101,4,CSE,CN,88,A,8.4",
      "S102,4,CSE,DBMS,80,A,8.1",
      "S102,4,CSE,OS,75,B+,8.1",
    ].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="results-template.csv"'
    );

    return res.status(200).send(csvContent);
  }
);

module.exports = router;