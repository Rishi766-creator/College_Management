import React,{useEffect,useState} from "react";
import "../styles/Events.css";
import API from "../utils/axios";


const Events = () => {
  const [events,setEvents]=useState([]);
  const [exams,setExams]=useState([]);
  async function fetchEvents(){
    const res=await API.get("/events/upcoming",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    });
    setEvents(res.data.events);

    console.log(res?.data);
  };
  async function fetchExams(){
    const res=await API.get("/exams/upcoming",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    });
    setExams(res.data.exams);
    console.log(res?.data);
  }
  useEffect(()=>{
      fetchEvents();
      fetchExams();
    },[]);

  return (
  <div className="events-container">
      <div className="events-box">
        <h2>Upcoming Events</h2>
        <div className="events-grid">
          {events.map((event)=>(
        
            <div key={event._id} className="event-box" style={{ borderLeftColor: event.color }}>
              <h3>{event.title}</h3>
              <p className="event-date">{new Date(event.eventDate).toLocaleDateString()}</p>
              <p className="event-desc">{event.description}</p>
            </div>
          ))}

        </div>
      </div>
      <div className="events-box">
        <h2>Upcoming Exams</h2>
        <div className="events-grid">
          {exams.map((exam)=>(
        
            <div key={exam._id} className="event-box" style={{ borderLeftColor:exam.color }}>
              <h3>{exam.subject}</h3>
              <p className="event-date">{new Date(exam.examDate).toLocaleDateString()}</p>
              <p className="event-desc">Dept:{exam.department} Section:{exam.section} Sem:{exam.semester}</p>
              <p className="event-desc">StartTime:{exam.startTime}-EndTime:{exam.endTime}</p>
             <p className="event-desc">Venue:{exam.venue}</p>
            </div>
          ))}

        </div>
      </div>
      

      
    </div>
  );
};

export default Events;