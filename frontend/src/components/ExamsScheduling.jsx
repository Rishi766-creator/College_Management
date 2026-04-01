import { useState } from "react";

const ExamScheduling = () => {
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venue, setVenue] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [department, setDepartment] = useState("");

  const addExam = () => {
    const examData = {
      subject,
      date,
      startTime,
      endTime,
      venue,
      semester,
      section,
      department,
    };

    console.log(examData);
    alert("Exam Added");
  };

  return (
    <div>
      <h2>Exam Scheduling</h2>

      <div className="form-box">
        <label>Subject:</label>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <label>Exam Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <label>Venue:</label>
        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        />

        <label>Semester:</label>
        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />

        <label>Section:</label>
        <input
          type="text"
          placeholder="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />

        <label>Department:</label>
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <button onClick={addExam}>Add Exam</button>
      </div>
    </div>
  );
};

export default ExamScheduling;