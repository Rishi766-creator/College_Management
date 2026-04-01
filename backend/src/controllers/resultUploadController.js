const XLSX = require("xlsx");
const fs = require("fs");
const Result = require("../models/Result");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

/*
Expected Excel columns:
studentId | semester | department | subjectName | marks | grade | sgpa

Example:
studentId | semester | department | subjectName | marks | grade | sgpa
S101      | 4        | CSE        | DBMS        | 85    | A     | 8.4
S101      | 4        | CSE        | OS          | 78    | B+    | 8.4
S102      | 4        | CSE        | DBMS        | 80    | A     | 8.1
*/

const uploadResultsFromExcel = async (req, res) => {
  let filePath = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Excel file is required",
      });
    }

    filePath = req.file.path;

    const workbook = XLSX.readFile(filePath);
    const firstSheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[firstSheetName];

    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    if (!rows.length) {
      return res.status(400).json({
        message: "Excel sheet is empty",
      });
    }

    const grouped = new Map();

    for (const row of rows) {
      const studentId = String(row.studentId || "").trim();
      const semester = Number(row.semester);
      const department = String(row.department || "").trim();
      const subjectName = String(row.subjectName || "").trim();
      const marks = Number(row.marks);
      const grade = String(row.grade || "").trim();
      const sgpa = Number(row.sgpa);

      if (
        !studentId ||
        !semester ||
        !department ||
        !subjectName ||
        Number.isNaN(marks) ||
        !grade ||
        Number.isNaN(sgpa)
      ) {
        return res.status(400).json({
          message: "Invalid or missing data in Excel sheet",
          row,
        });
      }

      const key = `${studentId}-${semester}`;

      if (!grouped.has(key)) {
        grouped.set(key, {
          studentId,
          semester,
          department,
          sgpa,
          subjects: [],
        });
      }

      grouped.get(key).subjects.push({
        subjectName,
        marks,
        grade,
      });
    }

    const savedResults = [];
    const skippedResults = [];

    for (const [, value] of grouped) {
      const student = await User.findOne({
        studentId: value.studentId,
        role: "student",
      });

      if (!student) {
        skippedResults.push({
          studentId: value.studentId,
          reason: "Student not found",
        });
        continue;
      }

      const existingResult = await Result.findOne({
        student: student._id,
        semester: value.semester,
      });

      if (existingResult) {
        // Update existing result
        existingResult.department = value.department;
        existingResult.subjects = value.subjects;
        existingResult.sgpa = value.sgpa;
        existingResult.createdBy = req.user._id;
        existingResult.publishedAt = new Date();

        await existingResult.save();
        savedResults.push(existingResult);
      } else {
        // Create new result
        const result = await Result.create({
          student: student._id,
          semester: value.semester,
          department: value.department,
          subjects: value.subjects,
          sgpa: value.sgpa,
          createdBy: req.user._id,
        });

        savedResults.push(result);
      }

      // Parent email
      if (student.parentEmail) {
        const subjectLines = value.subjects
          .map(
            (sub) => `${sub.subjectName}: Marks ${sub.marks}, Grade ${sub.grade}`
          )
          .join("\n");

        await sendEmail({
          to: student.parentEmail,
          subject: `Semester ${value.semester} Results Published - ${student.name}`,
          text: `Hello,

The semester ${value.semester} results for ${student.name} have been published.

Department: ${value.department}
SGPA: ${value.sgpa}

Subjects:
${subjectLines}

Regards,
College Management System`,
        });
      }
    }

    return res.status(200).json({
      message: "Results processed successfully",
      savedCount: savedResults.length,
      skippedCount: skippedResults.length,
      skippedResults,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to process Excel file",
      error: error.message,
    });
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

module.exports = {
  uploadResultsFromExcel,
};