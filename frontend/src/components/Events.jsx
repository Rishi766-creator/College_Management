import React, { useState, useEffect } from "react";
import "../styles/Requests.css";
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
    <div className="requests-card">
      <h2>Faculty Requests</h2>

      {/* 🔹 Top Buttons */}
      <div className="request-grid">
        <div
          className="request-box leave-box"
          onClick={() =>
            setActiveForm(activeForm === "leave" ? null : "leave")
          }
        >
          Apply Leave
        </div>

        <div
          className="request-box event-box"
          onClick={() =>
            setActiveForm(activeForm === "event" ? null : "event")
          }
        >
          Request Event
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
      

      {/* 🔹 Leave Form */}
      {activeForm === "leave" && (
        <form className="request-form" onSubmit={handleLeaveRequest}>
          <div className="form-row">
            <label>Reason:</label>
            <input
              type="text"
              name="reason"
              value={leaveData.reason}
              onChange={(e) => handleInputChange(e, "leave")}
              required
            />
          </div>

          <div className="form-row">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={leaveData.startDate}
              onChange={(e) => handleInputChange(e, "leave")}
              required
            />
          </div>

          <div className="form-row">
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={leaveData.endDate}
              onChange={(e) => handleInputChange(e, "leave")}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* 🔹 Event Form */}
      {activeForm === "event" && (
        <form className="request-form" onSubmit={handleEventRequest}>
          <div className="form-row">
            <label>Event Name:</label>
            <input
              type="text"
              name="name"
              value={eventData.name}
              onChange={(e) => handleInputChange(e, "event")}
              required
            />
          </div>

          <div className="form-row">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={(e) => handleInputChange(e, "event")}
              required
            />
          </div>

          <div className="form-row">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={eventData.description}
              onChange={(e) => handleInputChange(e, "event")}
              required
            />
          </div>

          <div className="form-row">
            <label>Venue:</label>
            <input
              type="text"
              name="venue"
              value={eventData.venue}
              onChange={(e) => handleInputChange(e, "event")}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* 🔹 Event History */}
      <div className="history-section">
        <h3>Event History</h3>

        {eventHistory.length === 0 ? (
          <p>No events</p>
        ) : (
          eventHistory.map((e, i) => (
            <div key={i} className="history-card event">
              <div className="history-info">
                <span className="history-type">Event</span>
                <span className="history-title">{e.title}</span>
                <span className="history-desc">{e.status}</span>
              </div>

              <div className="history-date">
                {e.proposedDate}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔹 Leave History */}
      <div className="history-section">
        <h3>Leave History</h3>

        {leaveHistory.length === 0 ? (
          <p>No leaves</p>
        ) : (
          leaveHistory.map((l, i) => (
            <div key={i} className="history-card leave">
              <div className="history-info">
                <span className="history-type">Leave</span>
                <span className="history-title">{l.reason}</span>
                <span className="history-desc">{l.status}</span>
              </div>

              <div className="history-date">
                {l.fromDate} → {l.toDate}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FacultyRequests;