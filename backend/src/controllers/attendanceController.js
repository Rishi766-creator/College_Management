const Attendance = require("../models/Attendance");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const markAttendance = async (req, res) => {
  try {
    const { subject, date, semester, section, department, records } = req.body;

    if (
      !subject ||
      !date ||
      !semester ||
      !section ||
      !department ||
      !records ||
      records.length === 0
    ) {
      return res.status(400).json({
        message: "Subject, date, semester, section, department, and records are required",
      });
    }

    const attendanceDate = new Date(date);

    for (const record of records) {
      await Attendance.findOneAndUpdate(
        {
          student: record.studentId,
          subject,
          date: attendanceDate,
        },
        {
          student: record.studentId,
          faculty: req.user._id,
          subject,
          date: attendanceDate,
          status: record.status,
          semester,
          section,
          department,
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );
    }

    return res.status(200).json({
      message: "Attendance marked successfully",
      count: records.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to mark attendance",
      error: error.message,
    });
  }
};
const getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      student: req.user._id,
    })
      .populate("faculty", "name email role")
      .sort({ date: -1 });

    return res.status(200).json({
      message: "Attendance fetched successfully",
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

const getMyMonthlyAttendance = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        message: "Month and year are required",
      });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const records = await Attendance.find({
      student: req.user._id,
      date: { $gte: startDate, $lt: endDate },
    });

    const totalClasses = records.length;
    const presentCount = records.filter((r) => r.status === "present").length;
    const absentCount = records.filter((r) => r.status === "absent").length;

    const percentage =
      totalClasses > 0 ? ((presentCount / totalClasses) * 100).toFixed(2) : 0;

    return res.status(200).json({
      message: "Monthly attendance fetched successfully",
      month,
      year,
      totalClasses,
      presentCount,
      absentCount,
      percentage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch monthly attendance",
      error: error.message,
    });
  }
};

const getClassAttendance = async (req, res) => {
  try {
    const { date, semester, section, department, subject } = req.query;

    if (!date || !semester || !section || !department || !subject) {
      return res.status(400).json({
        message: "Date, semester, section, department, and subject are required",
      });
    }

    const records = await Attendance.find({
      date,
      semester,
      section,
      department,
      subject,
    })
      .populate("student", "name email studentId")
      .populate("faculty", "name email");

    return res.status(200).json({
      message: "Class attendance fetched successfully",
      count: records.length,
      records,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch class attendance",
      error: error.message,
    });
  }
};

const sendMonthlyAttendanceToParents = async (req, res) => {
  try {
    console.log("API HIT - Sending monthly emails");
    const { month, year, semester, section, department } = req.body;

    if (!month || !year || !semester || !section || !department) {
      return res.status(400).json({
        message: "Month, year, semester, section, and department are required",
      });
    }

    const students = await User.find({ role: "student" });
    console.log("Students found:", students.length);

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    for (const student of students) {
  const records = await Attendance.find({
    student: student._id,
    date: { $gte: startDate, $lt: endDate },
  });

  const totalClasses = records.length;
  const presentCount = records.filter((r) => r.status === "present").length;
  const absentCount = records.filter((r) => r.status === "absent").length;

  const percentage =
    totalClasses > 0
      ? ((presentCount / totalClasses) * 100).toFixed(2)
      : 0;

  if (student.parentEmail) {
    await sendEmail({
      to: student.parentEmail,
      subject: `Monthly Attendance Report - ${student.name}`,
      text: `Hello, attendance report for ${student.name} for ${month}/${year}:\n\nTotal Classes: ${totalClasses}\nPresent: ${presentCount}\nAbsent: ${absentCount}\nAttendance Percentage: ${percentage}%`,
    });
  }
}

    return res.status(200).json({
      message: "Monthly attendance emails sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to send monthly attendance emails",
      error: error.message,
    });
  }
};

module.exports = {
  markAttendance,
  getMyAttendance,
  getMyMonthlyAttendance,
  getClassAttendance,
  sendMonthlyAttendanceToParents,
};