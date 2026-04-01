const Result = require("../models/Result");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const createResult = async (req, res) => {
  try {
    const { student, semester, department, subjects, sgpa } = req.body;

    if (
      !student ||
      !semester ||
      !department ||
      !subjects ||
      subjects.length === 0 ||
      sgpa === undefined
    ) {
      return res.status(400).json({
        message: "Student, semester, department, subjects, and sgpa are required",
      });
    }

    const existingResult = await Result.findOne({ student, semester });

    if (existingResult) {
      return res.status(400).json({
        message: "Result for this student and semester already exists",
      });
    }

    const studentUser = await User.findById(student);

    if (!studentUser) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const result = await Result.create({
      student,
      semester,
      department,
      subjects,
      sgpa,
      createdBy: req.user._id,
    });

    const subjectLines = subjects
      .map(
        (sub) =>
          `${sub.subjectName}: Marks ${sub.marks}, Grade ${sub.grade}`
      )
      .join("\n");

    if (studentUser.parentEmail) {
      await sendEmail({
        to: studentUser.parentEmail,
        subject: `Semester ${semester} Results Published - ${studentUser.name}`,
        text: `Hello,\n\nThe semester ${semester} results for ${studentUser.name} have been published.\n\nDepartment: ${department}\nSGPA: ${sgpa}\n\nSubjects:\n${subjectLines}\n\nRegards,\nCollege Management System`,
      });
    }

    return res.status(201).json({
      message: "Result created successfully and email sent to parent",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create result",
      error: error.message,
    });
  }
};
const getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user._id })
      .populate("student", "name email studentId semester department")
      .populate("createdBy", "name email role")
      .sort({ semester: 1 });

    return res.status(200).json({
      message: "Results fetched successfully",
      count: results.length,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch results",
      error: error.message,
    });
  }
};

const getAllResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("student", "name email studentId semester department")
      .populate("createdBy", "name email role")
      .sort({ semester: 1 });

    return res.status(200).json({
      message: "All results fetched successfully",
      count: results.length,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch all results",
      error: error.message,
    });
  }
};

const getStudentResultsById = async (req, res) => {
  try {
    const results = await Result.find({ student: req.params.studentId })
      .populate("student", "name email studentId semester department")
      .populate("createdBy", "name email role")
      .sort({ semester: 1 });

    return res.status(200).json({
      message: "Student results fetched successfully",
      count: results.length,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch student results",
      error: error.message,
    });
  }
};

const updateResult = async (req, res) => {
  try {
    const { subjects, sgpa, department } = req.body;

    const result = await Result.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        message: "Result not found",
      });
    }

    if (subjects) result.subjects = subjects;
    if (sgpa !== undefined) result.sgpa = sgpa;
    if (department) result.department = department;

    await result.save();

    return res.status(200).json({
      message: "Result updated successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update result",
      error: error.message,
    });
  }
};

const deleteResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        message: "Result not found",
      });
    }

    await result.deleteOne();

    return res.status(200).json({
      message: "Result deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete result",
      error: error.message,
    });
  }
};

module.exports = {
  createResult,
  getMyResults,
  getAllResults,
  getStudentResultsById,
  updateResult,
  deleteResult,
};