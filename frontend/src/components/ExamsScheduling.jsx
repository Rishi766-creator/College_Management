import { useState } from "react";

const ExamScheduling = () => {

  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");

  const addExam = () => {
    alert("Exam Added");
  };

  return (

    <div>

      <h2>Exam Scheduling</h2>

      <div className="form-box">

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={addExam}>Add Exam</button>

      </div>

    </div>

  );

};

export default ExamScheduling;