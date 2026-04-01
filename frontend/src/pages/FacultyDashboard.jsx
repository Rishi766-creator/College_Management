import { useState } from "react";
import FacultySidebar from "../components/FacultySidebar";
import FacultyAttendance from "../components/FacultyAttendance";
import FacultyApprovals from "../components/FacultyApprovals";
import Events from "../components/Events";
import Notices from "../components/Notices";
import "../styles/FacultyDashboard.css";

const FacultyDashboard = () => {
  const [active, setActive] = useState("attendance");
  const name = localStorage.getItem("name") || "Faculty";

  const renderPage = () => {
    switch (active) {
      case "attendance":
        return <FacultyAttendance />;
      case "approvals":
        return <FacultyApprovals />;
      case "events":
        return <Events />;
      case "notices":
        return <Notices />;
      default:
        return <FacultyAttendance />;
    }
  };

  return (
    <div className="dashboard">
      <FacultySidebar setActive={setActive} />

      <div className="main-content">
        <div className="top-bar">
          <h2>Hello, {name} 👋</h2>
          <p>Welcome to Faculty Dashboard</p>
        </div>

        {renderPage()}
      </div>
    </div>
  );
};

export default FacultyDashboard;