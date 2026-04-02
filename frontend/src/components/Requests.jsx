import React, { useState, useEffect } from "react";
import "../styles/Requests.css";
import API from "../utils/axios";

const Requests = () => {
  const [activeForm, setActiveForm] = useState(null);

  const [leaveData, setLeaveData] = useState({
    reason: "",
    startDate: "",
    endDate: ""
  });

  const [certificateData, setCertificateData] = useState({
    type: "",
    purpose: ""
  });

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    description: "",
    venue: ""
  });

  const [leaveHistory, setLeaveHistory] = useState([]);
  const [certificateHistory,setCertificateHistory]=useState([]);
  const [eventHistory,setEventHistory]=useState([]);

  // 🔹 Handle input changes
  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;

    if (formType === "leave") {
      setLeaveData({ ...leaveData, [name]: value });
    } else if (formType === "certificate") {
      setCertificateData({ ...certificateData, [name]: value });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  // 🔹 Cancel form
  const handleCancel = () => {
    setActiveForm(null);
  };

  // 🔹 Fetch history
  const fetchLeaveHistory=async ()=>{
    const res=await API.get("/student-leaves/my",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    });
    console.log(res?.data);
    setLeaveHistory(res.data.leaveRequests);
    

  };
  const fetchEventHistory=async ()=>{
    const res=await API.get("/event-requests/my",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    });
    console.log(res?.data);
    setEventHistory(res.data.requests);
    

  };
  const fetchCertificateHistory=async ()=>{
    const res=await API.get("/certificates/my",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    });
    
    console.log(res?.data);
    setCertificateHistory(res.data.requests);
  }

  
useEffect(() => {
  const fetchAll = async () => {
    await fetchLeaveHistory();
    await fetchCertificateHistory();
    await fetchEventHistory();
  };

  fetchAll();
}, []);
  // 🔹 Certificate request
  const handleCertificateRequest = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/certificates",
        {
          certificateType: certificateData.type,
          reason: certificateData.purpose
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      fetchCertificateHistory(); // refresh history
      handleCancel();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Leave request
  const handleLeaveRequest = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/student-leaves",
        {
          fromDate: leaveData.startDate,
          toDate: leaveData.endDate,
          reason: leaveData.reason
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      fetchLeaveHistory();
      handleCancel();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Event request
  const handleEventRequest = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/event-requests",
        {
          title: eventData.name,
          description: eventData.description,
          proposedDate: eventData.date,
          venue: eventData.venue
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      fetchEventHistory();
      handleCancel();
    } catch (err) {
      console.log(err);
    }
  };

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
          onClick={() =>
            setActiveForm(activeForm === "certificate" ? null : "certificate")
          }
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

      {/* 🔹 Leave Form */}
      {activeForm === "leave" && (
        <form className="request-form" onSubmit={handleLeaveRequest}>
          <input
            type="text"
            name="reason"
            placeholder="Reason"
            value={leaveData.reason}
            onChange={(e) => handleInputChange(e, "leave")}
            required
          />

          <input
            type="date"
            name="startDate"
            value={leaveData.startDate}
            onChange={(e) => handleInputChange(e, "leave")}
            required
          />

          <input
            type="date"
            name="endDate"
            value={leaveData.endDate}
            onChange={(e) => handleInputChange(e, "leave")}
            required
          />

          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}

      {/* 🔹 Certificate Form */}
      {activeForm === "certificate" && (
        <form className="request-form" onSubmit={handleCertificateRequest}>
          <input
            type="text"
            name="type"
            placeholder="Certificate Type"
            value={certificateData.type}
            onChange={(e) => handleInputChange(e, "certificate")}
            required
          />

          <input
            type="text"
            name="purpose"
            placeholder="Purpose"
            value={certificateData.purpose}
            onChange={(e) => handleInputChange(e, "certificate")}
            required
          />

          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}

      {/* 🔹 Event Form */}
      {activeForm === "event" && (
        <>
        <form className="request-form" onSubmit={handleEventRequest}>
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={eventData.name}
            onChange={(e) => handleInputChange(e, "event")}
            required
          />

          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={(e) => handleInputChange(e, "event")}
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={eventData.description}
            onChange={(e) => handleInputChange(e, "event")}
            required
          />

          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={eventData.venue}
            onChange={(e) => handleInputChange(e, "event")}
            required
          />

          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        </>
      )}
      <div className="history-section">
    <h3>Event History</h3>

    {eventHistory.length === 0 ? (
      <p>No event requests</p>
    ) : (
      eventHistory.map((event, index) => (
        <div key={index} className="history-card">
          <p><b>Title:</b> {event.title}</p>
          <p><b>Date:</b> {event.proposedDate}</p>
          <p><b>Venue:</b> {event.venue}</p>
          <p><b>Status:</b> {event.status}</p>
        </div>
      ))
    )}
  </div>
  <div className="history-section">
    <h3>Leave History</h3>

    {leaveHistory.length === 0 ? (
      <p>No leave requests</p>
    ) : (
      leaveHistory.map((leave, index) => (
        <div key={index} className="history-card">
          <p><b>Reason:</b> {leave.reason}</p>
          <p><b>From Date:</b> {leave.fromDate}</p>
          <p><b>To Date:</b> {leave.toDate}</p>
          <p><b>Status:</b> {leave.status}</p>
        </div>
      ))
    )}
  </div>
  <div className="history-section">
    <h3>Certificate History</h3>

    {certificateHistory.length === 0 ? (
      <p>No certificate requests</p>
    ) : (
      certificateHistory.map((certificate, index) => (
        <div key={index} className="history-card">
          <p><b>Certificate Type:</b> {certificate.certificateType}</p>
          <p><b>Reason:</b> {certificate.reason}</p>

          <p><b>Status:</b> {certificate.status}</p>
        
        </div>
      ))
    )}
  </div>

    </div>
  );
};

export default Requests;