const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const { role, department, semester, section } = req.query;

    let filter = {};

    if (role) filter.role = role;
    if (department) filter.department = department;
    if (semester) filter.semester = Number(semester); // 🔥 important
    if (section) filter.section = section;

    const users = await User.find(filter);

    return res.status(200).json({
      message: "Users fetched successfully",
      count: users.length,
      users,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

module.exports = { getUsers };