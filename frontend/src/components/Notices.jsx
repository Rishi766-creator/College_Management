import "../styles/StudentDashboard.css";
import {useEffect,useState} from 'react';
import API from "../utils/axios";


const Notices = () => {
  const [notices,setNotices]=useState([]);
  async function fetchNotices(){
    const res=await API.get("/notices",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    });
    console.log(res.data.notices);
    setNotices(res.data.notices);
  
  }
  useEffect(()=>{
    fetchNotices()

  }
    ,[]
  )

  return (

    <div className="notices-container">

      <h2 className="page-title">Latest Notices</h2>
      {notices.map((notice)=>(

      <div className="notice-box" key={notice._id}>
        <h3>{notice.title}</h3>
        <p>{notice.description}</p>
        <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
      </div>
      ))}


    </div>

  );

};

export default Notices;