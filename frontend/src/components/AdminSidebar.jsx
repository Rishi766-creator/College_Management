import {
  FaUserCheck,
  FaCertificate,
  FaClipboardList,
  FaBell,
  FaCalendarAlt,
  FaSignOutAlt,FaCog
} from "react-icons/fa";
import "../styles/Sidebar.css";

const AdminSidebar = ({ setActive }) => {

  return (

    <div className="sidebar">

      <div className="sidebar-top">

        <h2 className="logo">CMS</h2>

        <ul className="menu">

          <li onClick={() => setActive("approvals")}>
            <FaUserCheck /> Approvals
          </li>

          <li onClick={() => setActive("certificates")}>
            <FaCertificate /> Certificates
          </li>

          <li onClick={() => setActive("exams")}>
            <FaClipboardList /> Exam Scheduling
          </li>

          <li onClick={() => setActive("notices")}>
            <FaBell /> Add Notices
          </li>
           <li onClick={() => setActive("notices")}>
            <FaBell /> My Notices
          </li>

          <li onClick={() => setActive("events")}>
            <FaCalendarAlt /> Events & Exams
          </li>
           
        </ul>

      </div>

    

    </div>

  );

};

export default AdminSidebar;