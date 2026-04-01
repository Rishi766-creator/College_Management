import { useState } from "react";
import "../styles/FacultyDashboard.css";
import API from "../utils/axios";
import { useEffect } from "react";
const FacultyApprovals = () => {
  const [requests, setRequests] = useState([]);
  const updateStudentLeaveStatus = async (id, status) => {
  try {
    const body =
      status === "approved"
        ? { status: "approved" }
        : {
            status: "rejected",
            rejectionReason: "Not valid" // later make dynamic
          };

    const res = await API.patch(`/student-leaves/${id}/status`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    console.log(res.data);

    // 🔥 refresh data
    fetchRequests();

  } catch (err) {
    console.log(err.response?.data);
  }
};
  async function fetchRequests(){
    const res=await API.get("/student-leaves",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }

    });
    setRequests(res.data.leaveRequests);
    console.log(res?.data);
  }

  useEffect(()=>{
    fetchRequests()
  },[]);

  const handleAction = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  return (
    <div>
      <h2>Leave Requests</h2>

      {requests.filter(leave => leave.status === "pending").map((req) => (
        <div className="card" key={req._id}>
          <p><b>Name:</b> {req.student.name}</p>
          <p><b>Reason:</b> {req.reason}</p>
          <p><b>From:</b> {new Date(req.fromDate).toLocaleDateString()}</p>
          <p><b>To:</b> {new Date(req.toDate).toLocaleDateString()}</p>

          <button className="accept"  onClick={() =>
          updateStudentLeaveStatus(req._id, "approved")
        }>
            Accept
          </button>
          <button className="reject"  onClick={() =>
          updateStudentLeaveStatus(req._id, "rejected")
        }>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
};

export default FacultyApprovals;