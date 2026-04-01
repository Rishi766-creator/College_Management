import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [percent, setPercent] = useState(0);
  const [animatedPercent, setAnimatedPercent] = useState(0);

  // Replace with your API base URL
  const API_URL = "http://localhost:5000/api/attendance/me/monthly";

  // -----------------------------
  // 1️⃣ Fetch monthly attendance
  // -----------------------------
  useEffect(() => {
    const fetchMonthlyAttendance = async () => {
      try {
        const data = [];
        const now = new Date();

        for (let i = 5; i >= 0; i--) {
          let month = now.getMonth() - i + 1; // JS months start at 0
          let year = now.getFullYear();

          // If month <=0, go to previous year
          if (month <= 0) {
            month += 12;
            year -= 1;
          }

          const res = await axios.get(`${API_URL}?month=${month}&year=${year}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;

          data.push({
            month: new Date(year, month - 1).toLocaleString("default", { month: "long" }),
            total: res.data.totalClasses,
            attended: res.data.presentCount,
            color,
          });
        }

        setMonthlyData(data);

        const totalClasses = data.reduce((sum, m) => sum + m.total, 0);
        const attendedClasses = data.reduce((sum, m) => sum + m.attended, 0);

        const calculatedPercent = totalClasses
          ? Math.round((attendedClasses / totalClasses) * 100)
          : 0;

        setPercent(calculatedPercent);
      } catch (error) {
        console.error("Failed to fetch monthly attendance", error);
      }
    };

    fetchMonthlyAttendance();
  }, []);

  // -----------------------------
  // 2️⃣ Animate percentage circle
  // -----------------------------
  useEffect(() => {
    let start = 0;
    setAnimatedPercent(0); // reset to 0 before animation

    const interval = setInterval(() => {
      start += 1;
      if (start >= percent) {
        setAnimatedPercent(percent);
        clearInterval(interval);
      } else {
        setAnimatedPercent(start);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [percent]);

  return (
    <div className="attendance-container">
      <h2>Attendance Overview</h2>

      <div className="monthly-grid">
        {monthlyData.map((m, index) => (
          <div
            key={index}
            className="month-card"
            style={{ borderLeft: `6px solid ${m.color}` }}
          >
            <h3>{m.month}</h3>
            <p>Total Classes: <b>{m.total}</b></p>
            <p>Attended: <b>{m.attended}</b></p>
          </div>
        ))}
      </div>

      <div className="overall-progress">
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: "15px" }}>Attendance (Till Date)</h3>
          <div className="stat-box tc" style={{ marginBottom: "15px" }}>
            <p>Total Classes</p>
            <h2>{monthlyData.reduce((sum, m) => sum + m.total, 0)}</h2>
          </div>
          <div className="stat-box attended" style={{ marginBottom: "15px" }}>
            <p>Attended</p>
            <h2>{monthlyData.reduce((sum, m) => sum + m.attended, 0)}</h2>
          </div>
          <div className="stat-box percent">
            <p>Percentage</p>
            <h2>{percent}%</h2>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3 className="attendance-tracking-heading">Attendance Tracking</h3>
          <div className="attendance-tracking-box">
            <div className="circle-progress">
              <div className="circle" style={{ "--p": animatedPercent }}>
                <span>{animatedPercent}%</span>
              </div>
            </div>
            <p>Keep your attendance above 75%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;