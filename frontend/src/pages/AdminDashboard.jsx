// import { useState } from "react";
// import { FaTrash } from "react-icons/fa";
// import AdminSidebar from "../components/AdminSidebar";
// import Approvals from "../components/Approvals";
// import ExamScheduling from "../components/ExamsScheduling";
// import Notices from "../components/Notices";
// import "../styles/AdminDashboard.css";
// import API from "../utils/axios";

// const AdminDashboard = () => {

//   const [active,setActive] = useState("approvals");

//   const [showNoticeForm,setShowNoticeForm] = useState(false);
//   const [showEventForm,setShowEventForm] = useState(false);

//   const [noticeTitle,setNoticeTitle] = useState("");
//   const [noticeDesc,setNoticeDesc] = useState("");

//   const [eventTitle,setEventTitle] = useState("");
//   const [eventDate,setEventDate] = useState("");
//   const [eventDesc,setEventDesc] = useState("");
//   const [eventType,setEventType] = useState("Event");
//   const [eventVenue,setEventVenue]=useState("");
//   const [audience, setAudience] = useState([]);

//   const [notices,setNotices] = useState(
//     JSON.parse(localStorage.getItem("notices")) || []
//   );
//   const handleAudienceChange = (e) => {
//   const value = e.target.value;

//   if (e.target.checked) {
//     setAudience([...audience, value]); 
//   } else {
//     setAudience(audience.filter((a) => a !== value)); 
//   }
// };
//   const [events,setEvents] = useState(
//    []
//   );

//   const name = localStorage.getItem("name") || "Admin";

// const addNotice =async  () => {
//   const res=await API.post("/notices",{
//     title:noticeTitle,
//     description:noticeDesc,
//     audience


//   },{
//     headers:{
//       Authorization:`Bearer ${localStorage.getItem("token")}`
//     }
//   });
//   console.log(res?.data);

    
//   };


//   const addEvent = async () => {

//      const res=await API.post("/events",{
//     title:eventTitle,
//     description:eventDesc,
//     eventDate,
//     venue:eventVenue,
//     audience


//   },{
//     headers:{
//       Authorization:`Bearer ${localStorage.getItem("token")}`
//     }
//   });
//   console.log(res?.data);


    
//     setEventTitle("");
//     setEventDate("");
//     setEventDesc("");
//     setEventVenue("");
//     setShowEventForm(false);
//   };


//   const deleteNotice = (index) => {

//     const updated = notices.filter((_,i)=>i!==index);

//     setNotices(updated);
//     localStorage.setItem("notices",JSON.stringify(updated));
//   };


//   const deleteEvent = (index) => {

//     const updated = events.filter((_,i)=>i!==index);

//     setEvents(updated);
//     localStorage.setItem("events",JSON.stringify(updated));
//   };

//   const renderPage = () => {

//     switch(active){

//       case "approvals":
//         return <Approvals/>;

//       case "certificates":
//         return <Certificates/>;

//       case "exams":
//         return <ExamScheduling/>;

//       case "notices":

//         return(

//           <div>

//             <div className="page-header">
//               <h2>Notices</h2>

//               <button onClick={()=>setShowNoticeForm(!showNoticeForm)}>
//                 {showNoticeForm ? "Cancel" : "Add Notice"}
//               </button>

//             </div>

//             {showNoticeForm && (

//               <div className="form-box">

//                 <input
//                 placeholder="Notice Title"
//                 value={noticeTitle}
//                 onChange={(e)=>setNoticeTitle(e.target.value)}
//                 />

//                 <textarea
//                 placeholder="Description"
//                 value={noticeDesc}
//                 onChange={(e)=>setNoticeDesc(e.target.value)}
//                 />
//                 <label>
//   <input
//     type="checkbox"
//     value="student"
//     onChange={handleAudienceChange}
//   />
//   Student
// </label>

// <label>
//   <input
//     type="checkbox"
//     value="faculty"
//     onChange={handleAudienceChange}
//   />
//   Faculty
// </label>


                

//                 <button onClick={addNotice}>
//                   Post Notice
//                 </button>

//               </div>

//             )}

//             <div className="notices-container">

//               {notices.map((n,i)=>(

//                 <div className="notice-box" key={i}>

//                   <div className="card-header">

//                     <h3>{n.title}</h3>

//                     <FaTrash
//                       className="delete-icon"
//                       onClick={()=>deleteNotice(i)}
//                     />

//                   </div>

//                   <p>{n.desc}</p>
//                   <span>{n.date}</span>

//                 </div>

//               ))}

//             </div>

//           </div>

//         );
//         case  "mynotices":
//         return <Notices/>;

//       case "events":

//         return(

//           <div>

//             <div className="page-header">
//               <h2>Upcoming Events </h2>

//               <button onClick={()=>setShowEventForm(!showEventForm)}>
//                 {showEventForm ? "Cancel" : "Add Event"}
//               </button>

//             </div>

//             {showEventForm && (

//               <div className="form-box">


//                 <input
//                 placeholder="Title"
//                 value={eventTitle}
//                 onChange={(e)=>setEventTitle(e.target.value)}
//                 />

//                 <input
//                 type="date"
//                 value={eventDate}
//                 onChange={(e)=>setEventDate(e.target.value)}
//                 />

//                 <textarea
//                 placeholder="Description"
//                 value={eventDesc}
//                 onChange={(e)=>setEventDesc(e.target.value)}
//                 />

//                 <input
//                 placeholder="Venue"
//                 value={eventVenue}
//                 onChange={(e)=>setEventVenue(e.target.value)}
//                 />
//                 <label>
//   <input
//     type="checkbox"
//     value="student"
//     onChange={handleAudienceChange}
//   />
//   Student
// </label>

// <label>
//   <input
//     type="checkbox"
//     value="faculty"
//     onChange={handleAudienceChange}
//   />
//   Faculty
// </label>

//                 <button onClick={addEvent}>
//                   Add
//                 </button>

//               </div>

//             )}

//             <div className="events-container">

//               {events.map((e,i)=>(

//                 <div className="event-box" key={i}>

//                   <div className="card-header">

//                     <h3>{e.type}: {e.title}</h3>

//                     <FaTrash
//                       className="delete-icon"
//                       onClick={()=>deleteEvent(i)}
//                     />

//                   </div>

//                   <p>{e.desc}</p>
//                   <span>{e.date}</span>

//                 </div>

//               ))}

//             </div>

//           </div>

//         );

//       default:
//         return <Approvals/>;

//     }

//   };

//   return(

//     <div className="dashboard">

//       <AdminSidebar setActive={setActive}/>

//       <div className="main-content">

//         <div className="top-bar">
//           <h2>Hello, {name} 👋</h2>
//           <p>Admin Control Panel</p>
//         </div>

//         {renderPage()}

//       </div>

//     </div>

//   );

// };

// export default AdminDashboard;

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import Approvals from "../components/Approvals";
import ExamScheduling from "../components/ExamsScheduling";
import Notices from "../components/Notices";
import MyEvents from "../components/MyEvents";
import "../styles/AdminDashboard.css";
import API from "../utils/axios";

const AdminDashboard = () => {

  const [active, setActive] = useState("approvals");

  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeDesc, setNoticeDesc] = useState("");

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventVenue, setEventVenue] = useState("");

  const [audience, setAudience] = useState([]);

  const name = localStorage.getItem("name") || "Admin";

  // ✅ Audience checkbox handler
  const handleAudienceChange = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setAudience([...audience, value]);
    } else {
      setAudience(audience.filter((a) => a !== value));
    }
  };

  // ✅ Add Notice
  const addNotice = async () => {
    try {
      await API.post(
        "/notices",
        {
          title: noticeTitle,
          description: noticeDesc,
          audience,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNoticeTitle("");
      setNoticeDesc("");
      setShowNoticeForm(false);
      alert("Notice Added ✅");
    } catch (err) {
      console.log(err);
      alert("Error adding notice ❌");
    }
  };

  // ✅ Add Event
  const addEvent = async () => {
    try {
      await API.post(
        "/events",
        {
          title: eventTitle,
          description: eventDesc,
          eventDate,
          venue: eventVenue,
          audience,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setEventTitle("");
      setEventDate("");
      setEventDesc("");
      setEventVenue("");
      setShowEventForm(false);

      alert("Event Added ✅");
    } catch (err) {
      console.log(err);
      alert("Error adding event ❌");
    }
  };

  const renderPage = () => {
    switch (active) {
      case "approvals":
        return <Approvals />;

      case "exams":
        return <ExamScheduling />;
    case "results":
  return (
    <div className="results-container-dark">

      <div className="results-box-dark">
        <h2>Results</h2>

        <p>
          Clicking the button will notify all parents via email.
        </p>
        <p>
          They will be informed that the results are officially released.
        </p>

        <div className="btn-center">
          <button
            className="send-btn-dark"
            onClick={() => alert("Results Sent Successfully ✅")}
          >
            Send Results
          </button>
        </div>
      </div>

    </div>
  );


      case "notices":
        return (
          <div>
            <div className="page-header">
              <h2>Notices</h2>

              <button onClick={() => setShowNoticeForm(!showNoticeForm)}>
                {showNoticeForm ? "Cancel" : "Add Notice"}
              </button>
            </div>

            {showNoticeForm && (
              <div className="form-box">
                <input
                  placeholder="Notice Title"
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                />

                <textarea
                  placeholder="Description"
                  value={noticeDesc}
                  onChange={(e) => setNoticeDesc(e.target.value)}
                />

                <label>
                  <input
                    type="checkbox"
                    value="student"
                    onChange={handleAudienceChange}
                  />
                  Student
                </label>

                <label>
                  <input
                    type="checkbox"
                    value="faculty"
                    onChange={handleAudienceChange}
                  />
                  Faculty
                </label>

                <button onClick={addNotice}>Post Notice</button>
              </div>
            )}
          </div>
        );

      case "mynotices":
        return <Notices />; // ✅ fetch from backend

      case "events":
        return (
          <div>
            <div className="page-header">
              <h2>Upcoming Events</h2>

              <button onClick={() => setShowEventForm(!showEventForm)}>
                {showEventForm ? "Cancel" : "Add Event"}
              </button>
            </div>

            {showEventForm && (
              <div className="form-box">
                <input
                  placeholder="Title"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />

                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />

                <textarea
                  placeholder="Description"
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                />

                <input
                  placeholder="Venue"
                  value={eventVenue}
                  onChange={(e) => setEventVenue(e.target.value)}
                />

                <button onClick={addEvent}>Add</button>
              </div>
            )}
          </div>
        );
 case "myevents":
        return <MyEvents />;
      default:
        return <Approvals />;
    }
  };

  return (
    <div className="dashboard">
      <AdminSidebar setActive={setActive} />

      <div className="main-content">
        <div className="top-bar">
          <h2>Hello, {name} 👋</h2>
          <p>Admin Control Panel</p>
        </div>

        {renderPage()}
      </div>
    </div>
  );
};

export default AdminDashboard;
