require('dotenv').config();
const mongoose = require('mongoose');
const { sendMonthlyAttendanceToParents } = require('./controllers/attendanceController');
// connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

const testEmail = async () => {
  await connectDB();

  try {
    await sendMonthlyAttendanceToParents({
      body: {
        month: 3, // example month
        year: 2026,
        semester: 1,
        section: "A",
        department: "CSE",
      },
    }, {
      status: () => {},
      json: () => {}
    });

    console.log("Test email sent successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error sending test email:", err);
    process.exit(1);
  }
};

testEmail();