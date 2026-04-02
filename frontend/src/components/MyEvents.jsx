import React, { useEffect, useState } from "react";
import "../styles/StudentDashboard.css";

const MyEvents = () => {
  const [events, setEvents] = useState([]);

  // ✅ Dummy data (no backend)
  const fetchMyEvents = () => {
    const dummyEvents = [
      {
        _id: "1",
        title: "Tech Fest 2026",
        description: "A technical festival with coding competitions.",
        eventDate: "2026-04-10",
      },
      {
        _id: "2",
        title: "Workshop on AI",
        description: "Learn basics of AI and Machine Learning.",
        eventDate: "2026-04-15",
      },
      {
        _id: "3",
        title: "Sports Meet",
        description: "Annual sports meet for all students.",
        eventDate: "2026-04-20",
      },
    ];

    setEvents(dummyEvents);
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  return (
    <div className="notices-container"> {/* ✅ same styling */}

      <h2 className="page-title">My Events</h2>

      {events.map((event) => (
        <div className="notice-box" key={event._id}> {/* ✅ same box */}

          <h3>{event.title}</h3>

          <p>{event.description}</p>

          <span>
            {new Date(event.eventDate).toLocaleDateString()}
          </span>

        </div>
      ))}

    </div>
  );
};

export default MyEvents;