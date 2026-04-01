import React,{useEffect,useState} from "react";
import "../styles/Events.css";
import API from "../utils/axios";


const Events = () => {
  const [events,setEvents]=useState([]);
  async function fetchEvents(){
    const res=await API.get("/events/upcoming",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    });
    setEvents(res.data.events);

    console.log(res?.data);
  }
  useEffect(()=>{
      fetchEvents()
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

      
    </div>
  );
};

export default Events;