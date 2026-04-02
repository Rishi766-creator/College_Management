// import {
//   FaUserCheck,
//   FaCertificate,
//   FaClipboardList,
//   FaBell,
//   FaCalendarAlt,
//   FaRegFileAlt ,
//   FaRegCalendarCheck,

// } from "react-icons/fa";

// import "../styles/Sidebar.css";

// const AdminSidebar = ({ setActive }) => {
//   return (
//     <div className="sidebar">

//       <div className="sidebar-top">
//         <h2 className="logo">CMS</h2>

//         <ul className="menu">

//           <li onClick={() => setActive("approvals")}>
//             <FaUserCheck /> Approvals
//           </li>


//           <li onClick={() => setActive("exams")}>
//             <FaClipboardList /> Exam Scheduling
//           </li>
//            <li onClick={() => setActive("results")}>
//             <FaClipboardList /> Results
//           </li>
//           <li onClick={() => setActive("notices")}>
//             <FaBell /> Add Notices
//           </li>

//           {/* ✅ UPDATED ICON */}
//           <li onClick={() => setActive("mynotices")}>
//             <FaRegFileAlt /> My Notices
//           </li>

//           <li onClick={() => setActive("events")}>
//             <FaCalendarAlt /> Events 
//           </li>
//            <li onClick={() => setActive("myevents")}>
//             <FaRegCalendarCheck /> My Events 
//           </li>
//         </ul>
//       </div>

//     </div>
//   );
// };

// export default AdminSidebar;

import {
  FaUserCheck,
  FaClipboardList,
  FaBell,
  FaCalendarAlt,
  FaRegFileAlt,
  FaRegCalendarCheck,
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

          <li onClick={() => setActive("exams")}>
            <FaClipboardList /> Exam Scheduling
          </li>

          <li onClick={() => setActive("results")}>
            <FaClipboardList /> Results
          </li>

          <li onClick={() => setActive("notices")}>
            <FaBell /> Add Notices
          </li>

          <li onClick={() => setActive("mynotices")}>
            <FaRegFileAlt /> My Notices
          </li>

          <li onClick={() => setActive("events")}>
            <FaCalendarAlt /> Events
          </li>

          <li onClick={() => setActive("myevents")}>
            <FaRegCalendarCheck /> My Events
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;