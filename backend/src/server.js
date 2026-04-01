const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const studentLeaveRoutes = require("./routes/studentLeaveRoutes");
const authRoutes = require("./routes/authRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const facultyLeaveRoutes = require("./routes/facultyLeaveRoutes");
const eventRequestRoutes = require("./routes/eventRequestRoutes");
const eventRoutes = require("./routes/eventRoutes");
const examRoutes = require("./routes/examRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const resultRoutes = require("./routes/resultRoutes");
const resultUploadRoutes = require("./routes/resultUploadRoutes");
const templateRoutes = require("./routes/templateRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("College Management Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/faculty-leaves", facultyLeaveRoutes);
app.use("/api/event-requests", eventRequestRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/results", resultUploadRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/student-leaves", studentLeaveRoutes);
app.use("/api/users", userRoutes);
// At the bottom of server.js
require("./cron/monthlyAttendance");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});