import React, { useState, useEffect } from "react";
import "../styles/Requests.css";
import API from "../utils/axios";

const FacultyRequests = () => {
  const [activeForm, setActiveForm] = useState(null);

  const [leaveData, setLeaveData] = useState({
    reason: "",
    startDate: "",
    endDate: ""
  });

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    description: "",
    venue: ""
  });

  const [leaveHistory, setLeaveHistory] = useState([]);
  const [eventHistory, setEventHistory] = useState([]);

  const token = localStorage.getItem("token");

  // 🔹 Handle input change
  const handleInputChange = (e, type) => {
    const { name, value } = e.target;

    if (type === "leave") {
      setLeaveData({ ...leaveData, [name]: value });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  const handleCancel = () => setActiveForm(null);

  // 🔹 Fetch Leave History
  const fetchLeaveHistory = async () => {
    try {
      console.log("Fetching Leave...");
      const res = await API.get("/student-leaves/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeaveHistory(res.data?.leaveRequests || []);
    } catch (err) {
      console.log("Leave Error:", err);
    }
  };

  // 🔹 Fetch Event History
  const fetchEventHistory = async () => {
    try {
      console.log("Fetching Event...");
      const res = await API.get("/event-requests/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEventHistory(res.data?.requests || []);
    } catch (err) {
      console.log("Event Error:", err);
    }
  };

  // 🔥 FIXED useEffect (SAFE VERSION)
  useEffect(() => {
    if (!token) {
      console.log("No token found");
      return;
    }

    const fetchAll = async () => {
      try {
        await fetchLeaveHistory();
        await fetchEventHistory();
      } catch (err) {
        console.log("useEffect Error:", err);
      }
    };

    fetchAll();
  }, [token]);

  // 🔹 Submit Leave
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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchLeaveHistory();
      handleCancel();
    } catch (err) {
      console.log("Leave Submit Error:", err);
    }
  };

  // 🔹 Submit Event
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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchEventHistory();
      handleCancel();
    } catch (err) {
      console.log("Event Submit Error:", err);
    }
  };

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