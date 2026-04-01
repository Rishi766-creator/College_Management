import { useState, useEffect } from "react";
import "../styles/FacultyDashboard.css";
import API from "../utils/axios";

const colors = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b", "#a855f7"];

const FacultyAttendance = () => {
  const [students, setStudents] = useState([]);

  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");

  // 🔥 Fetch students
  const getStudents = async () => {
    try {
      const res = await API.get(
        `/users?role=student&department=${department}&semester=${semester}&section=${section}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setStudents(
        res.data.users.map((u) => ({
          id: u._id,
          name: u.name,
          roll: u.studentId,
          sid: u._id,
          present: true,
        }))
      );
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  useEffect(() => {
    if (department && semester && section) {
      getStudents();
    }
  }, [department, semester, section]);

  const handleAttendance = (id, value) => {
    setStudents(
      students.map((s) =>
        s.id === id ? { ...s, present: value } : s
      )
    );
  };

  const prepareRecords = () => {
    return students.map((s) => ({
      studentId: s.sid,
      status: s.present ? "present" : "absent",
    }));
  };

  const markAttendance = async () => {
    try {
      const res = await API.post(
        "/attendance",
        {
          subject,
          date,
          semester,
          section,
          department,
          records: prepareRecords(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Attendance marked successfully ✅");
      console.log(res.data);

    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const total = students.length;
  const present = students.filter((s) => s.present).length;
  const absent = total - present;

  return (
    <div className="attendance-wrapper">

      {/* TOP FORM */}
      <div className="top-form card">

        <div className="form-group">
          <label>Department</label>
          <select onChange={(e) => setDepartment(e.target.value)}>
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CE">CE</option>
          </select>
        </div>

        <div className="form-group">
          <label>Class</label>
          <select onChange={(e) => setSemester(e.target.value)}>
            <option>Select Class</option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
            <option value="8">8th</option>
          </select>
        </div>

        <div className="form-group">
          <label>Section</label>
          <select onChange={(e) => setSection(e.target.value)}>
            <option>Select Section</option>
            <option>A</option>
            <option>B</option>
          </select>
        </div>

        {/* SAME STYLE SUBJECT */}
        <div className="form-group">
          <label>Subject</label>
          <select onChange={(e) => setSubject(e.target.value)}>
            <option>Select Subject</option>
            <option>Maths</option>
            <option>Physics</option>
            <option>DBMS</option>
          </select>
        </div>

        {/* SAME STYLE DATE */}
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="date-input"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

      </div>

      {/* SUMMARY */}
      <div className="summary-container">
        <div className="summary-box total-box">
          <h3>Total</h3>
          <p>{total}</p>
        </div>

        <div className="summary-box present-box">
          <h3>Present</h3>
          <p>{present}</p>
        </div>

        <div className="summary-box absent-box">
          <h3>Absent</h3>
          <p>{absent}</p>
        </div>
      </div>

      {/* STUDENTS */}
      <div className="student-grid">
        {students.map((s, index) => (
          <div
            key={s.id}
            className="student-card"
            style={{ borderLeft: `5px solid ${colors[index % colors.length]}` }}
          >
            <p className="student-name">Name: {s.name}</p>

            <div className="student-row">
              <span>ID: {s.sid}</span>
              <span>Roll: {s.roll}</span>
            </div>

            <div className="toggle-group">
              <button
                className={s.present ? "active-present" : ""}
                onClick={() => handleAttendance(s.id, true)}
              >
                Present
              </button>

              <button
                className={!s.present ? "active-absent" : ""}
                onClick={() => handleAttendance(s.id, false)}
              >
                Absent
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SUBMIT */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={markAttendance} className="add-btn">
          Submit Attendance
        </button>
      </div>

    </div>
  );
};

export default FacultyAttendance;