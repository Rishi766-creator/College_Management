import {
  FaClipboardCheck,
  FaUserClock,
  FaBell,
  FaCalendarAlt,
  FaSignOutAlt,
  FaCog
} from "react-icons/fa";
import "../styles/Sidebar.css";

const FacultySidebar = ({ setActive }) => {
  return (
    <div className="sidebar">

      <div className="sidebar-top">

        <h2 className="logo">CMS</h2>

        <ul className="menu">

          <li onClick={() => setActive("attendance")}>
            <FaClipboardCheck /> Attendance
          </li>

          <li onClick={() => setActive("approvals")}>
            <FaUserClock /> Leave Approvals
          </li>

          <li onClick={() => setActive("notices")}>
            <FaBell /> Notices
          </li>

          <li onClick={() => setActive("events")}>
            <FaCalendarAlt /> Events & Exams
          </li>

        </ul>

      </div>

      <div className="sidebar-bottom">

        <button className="settings">
          <FaCog /> Settings
        </button>

        <button className="logout">
          <FaSignOutAlt /> Logout
        </button>

      </div>

    </div>
  );
};

export default FacultySidebar;