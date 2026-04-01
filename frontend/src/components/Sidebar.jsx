import {
  FaCalendarCheck,
  FaClipboardList,
  FaPaperPlane,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
  FaBell
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS
import "../styles/Sidebar.css";

const Sidebar = ({ setActive }) => {

  const navigate = useNavigate(); // ✅

  const handleLogout = () => {
    console.log("logout function");
    // 🧹 remove token
    localStorage.removeItem("token");

    // (optional) remove user info if stored
    localStorage.removeItem("user");

    // 🔁 redirect to login
    navigate("/login");
  };

  return (
    <div className="sidebar">

      <div className="sidebar-top">
        <h2 className="logo">CMS</h2>

        <ul className="menu">
          <li onClick={() => setActive("attendance")}>
            <FaCalendarCheck /> Attendance
          </li>

          <li onClick={() => setActive("results")}>
            <FaClipboardList /> Results
          </li>

          <li onClick={() => setActive("requests")}>
            <FaPaperPlane /> Requests
          </li>

          <li onClick={() => setActive("events")}>
            <FaCalendarAlt /> Events & Exams
          </li>

          <li onClick={() => setActive("notices")}>
            <FaBell /> Notices
          </li>
        </ul>
      </div>

    

    </div>
  );
};

export default Sidebar;