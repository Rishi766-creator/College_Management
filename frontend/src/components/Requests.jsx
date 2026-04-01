import React, { useState } from "react";
import "../styles/Requests.css";
import API from "../utils/axios";

const Requests = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [leaveData, setLeaveData] = useState({ reason: "", startDate: "", endDate: "" });
  const [certificateData, setCertificateData] = useState({ type: "", purpose: "" });
  const [eventData, setEventData] = useState({ name: "", date: "", description: "" ,venue: ""});

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "leave") setLeaveData({ ...leaveData, [name]: value });
    else if (formType === "certificate") setCertificateData({ ...certificateData, [name]: value });
    else setEventData({ ...eventData, [name]: value });
  };

  

  const handleCertificateRequest=async (e)=>{
    e.preventDefault();
    const res=await API.post("/certificates",{
      certificateType:certificateData.type,
      reason:certificateData.purpose

    },{
      headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    
    }});
    console.log(res?.data);
  };
  const handleLeaveRequest=async(e)=>{
    e.preventDefault();
    const res=await API.post("/student-leaves",{
      fromDate:leaveData.startDate,
      toDate:leaveData.endDate,
      reason:leaveData.reason
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    });
    cosole.log(res?.data);
  }
  const handleEventRequest=async(e)=>{
    e.preventDefault();

    const res=await API.post("/event-requests",{
      title:eventData.name,
      description:eventData.description,
      proposedDate:eventData.date,
      venue:eventData.venue

    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`

      }
    });

  }

  function handleCancel(){
    setActiveForm(null);
  }

  return (
    <div className="requests-card">
      <h2>Requests</h2>
      <div className="request-grid">
        <div
          className="request-box leave-box"
          onClick={() => setActiveForm(activeForm === "leave" ? null : "leave")}
        >
          Leave Request
        </div>
        <div
          className="request-box certificate-box"
          onClick={() => setActiveForm(activeForm === "certificate" ? null : "certificate")}
        >
          Certificate Request
        </div>
        <div
          className="request-box event-box"
          onClick={() => setActiveForm(activeForm === "event" ? null : "event")}
        >
          Event Request
        </div>
      </div>

      {activeForm === "leave" && (
        <form className="request-form" onSubmit={handleLeaveRequest}>
          <div className="form-row">
            <label>Reason:</label>
            <input type="text" name="reason" value={leaveData.reason} onChange={(e) => handleInputChange(e, "leave")} required />
          </div>
          <div className="form-row">
            <label>Start Date:</label>
            <input type="date" name="startDate" value={leaveData.startDate} onChange={(e) => handleInputChange(e, "leave")} required />
          </div>
          <div className="form-row">
            <label>End Date:</label>
            <input type="date" name="endDate" value={leaveData.endDate} onChange={(e) => handleInputChange(e, "leave")} required />
          </div>
          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
          </div>
        </form>
      )}

      {activeForm === "certificate" && (
        <form className="request-form" onSubmit={handleCertificateRequest}>
          <div className="form-row">
            <label>Certificate Type:</label>
            <input type="text" name="type" value={certificateData.type} onChange={(e) => handleInputChange(e, "certificate")} required />
          </div>
          <div className="form-row">
            <label>Purpose:</label>
            <input type="text" name="purpose" value={certificateData.purpose} onChange={(e) => handleInputChange(e, "certificate")} required />
          </div>
          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
          </div>
        </form>
      )}

      {activeForm === "event" && (
        <form className="request-form" onSubmit={handleEventRequest}>
          <div className="form-row">
            <label>Event Name:</label>
            <input type="text" name="name" value={eventData.name} onChange={(e) => handleInputChange(e, "event")} required />
          </div>
          <div className="form-row">
            <label>Date:</label>
            <input type="date" name="date" value={eventData.date} onChange={(e) => handleInputChange(e, "event")} required />
          </div>
          <div className="form-row">
            <label>Description:</label>
            <input type="text" name="description" value={eventData.description} onChange={(e) => handleInputChange(e, "event")} required />
          </div>
           <div className="form-row">
            <label>Event venue:</label>
            <input type="text" name="venue" value={eventData.venue} onChange={(e) => handleInputChange(e, "event")} required />
          </div>
          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Requests;