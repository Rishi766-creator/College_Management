const cron = require("node-cron");
const { sendMonthlyAttendanceToParents } = require("../controllers/attendanceController");

// Run at 12:00 AM on the 1st of every month
cron.schedule("0 0 1 * *", async () => {
  try {
    const now = new Date();
    let month = now.getMonth(); // last month
    let year = now.getFullYear();
    if (month === 0) {
      month = 12;
      year -= 1;
    }

    await sendMonthlyAttendanceToParents({
      body: { month, year }
    }, {
      status: () => ({ json: console.log }),
      json: console.log
    });

    console.log("Monthly attendance emails sent successfully (cron)");
  } catch (err) {
    console.error("Failed to send monthly attendance emails (cron):", err);
  }
});