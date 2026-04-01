import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Attendance from "../components/Attendance";
import Requests from "../components/Requests";
import Events from "../components/Events";
import Results from "../components/Results";
import Notices from "../components/Notices";
import "../styles/StudentDashboard.css";

const StudentDashboard = () => {

  const [active, setActive] = useState("attendance");

  const name = localStorage.getItem("name") || "Student";

  const renderPage = () => {

    switch (active) {

      case "attendance":
        return <Attendance />;

      case "requests":
        return <Requests />;

      case "events":
        return <Events />;

      case "results":
        return <Results />;

      case "notices":
        return <Notices />;

      default:
        return <Attendance />;
    }

  };

  return (

    <div className="dashboard">

      <Sidebar setActive={setActive} />

      <div className="main-content">

        <div className="top-bar">

          <h2>Hello, {name} 👋</h2>
          <p>Welcome to College Management System</p>

        </div>

        {renderPage()}

      </div>

    </div>

  );

};

export default StudentDashboard;