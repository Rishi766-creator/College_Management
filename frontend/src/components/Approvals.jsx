import {useEffect,useState} from 'react';
import API from "../utils/axios";
const Approvals = () => {
  const [certificates,setCertificates]=useState([]);
  const [events,setEvents]=useState([]);
  async function getCertificateRequest(){
    const res=await API.get('/certificates',{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    });
    setCertificates(res.data.requests);
    console.log(res?.data);

  };
  async function getEventRequest(){
    const res=await API.get("/event-requests",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    });
    setEvents(res.data.requests);
    console.log(res?.data);
  };
  const updateCertificateStatus = async (id, status) => {
  try {
    const body =
      status === "approved"
        ? {
            status: "approved",
            collectionOffice: "Admin Office", // you can make this dynamic later
            collectionDate: new Date().toISOString()
          }
        : {
            status: "rejected",
            rejectionReason: "Not valid" // can be input later
          };

    const res = await API.patch(`/certificates/${id}/status`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    console.log(res.data);

    // 🔥 Refresh list after update
    getCertificateRequest();

  } catch (err) {
    console.log(err);
  }
};
const updateEventStatus = async (id, status) => {
  try {
    const body =
      status === "approved"
        ? { status: "approved" }
        : {
            status: "rejected",
            rejectionReason: "Not valid" // later make input
          };

    const res = await API.patch(`/event-requests/${id}/status`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    console.log(res.data);

    // 🔥 Refresh events after update
    getEventRequest();

  } catch (err) {
    console.log(err.response?.data);
  }
};
  useEffect(()=>{
    getCertificateRequest();
    getEventRequest();
  },[])

  return (

    <div>

      <h2>Certificate Requests</h2>
      
      {certificates.filter(certificate=>certificate.status==="pending").map((certificate)=>(
         <div className="notice-box" key={certificate._id}>
        <h3>{certificate.certificateType}-{certificate.student.name}</h3>
        <p>{certificate.reason}</p>
        <button className="approve" onClick={() => updateCertificateStatus(certificate._id, "approved")}>Approve</button>
        <button className="reject" onClick={() => updateCertificateStatus(certificate._id, "rejected")}>Reject</button>
      </div>


      ))}
      

      <h2>Faculty Leave Requests</h2>

     
      <div className="notice-box">
        <h3>Leave Request - Anitha</h3>
        <button className="approve">Approve</button>
        <button className="reject">Reject</button>
      </div>

      <h2>Event Requests</h2>
      {
        events.filter(event=>event.status==="pending").map((event)=>(
          <div className="notice-box" key={event._id}>
        <h3>{event.title}-{event.requestedBy.name},{event.requestedByRole}</h3>
        <p>Proposed Date:{new Date(event.proposedDate).toLocaleDateString()}</p>
        <p>Venue:{event.venue}</p>
        <button className="approve" onClick={() => updateEventStatus(event._id, "approved")}>Approve</button>
        <button className="reject" onClick={() => updateEventStatus(event._id, "rejected")}>Reject</button>
      </div>


        ))
      }

      
     
    </div>

  );

};

export default Approvals;