import React, { useState } from "react";
import "../styles/Signup.css";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserGraduate,
  FaUserTie,
  FaUserShield
} from "react-icons/fa";

const Signup = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [studentId, setStudentId] = useState("");
  const [dept, setDept] = useState("");
  const [sem, setSem] = useState("");
  const [section, setSection] = useState("");
  const [parentEmail, setParentEmail] = useState("");

  const [employeeId, setEmployeeId] = useState("");
  const [message,setMessage]=useState("");

  const handleSignup = async (e) => {
    try{

    e.preventDefault();
    if( !role){
      return setMessage("Role is required");
    }
    const res=await API.post("/auth/register",{
      name,
      email,
      password,
      role,
      department:dept,
      semester:sem,
      section,
      parentEmail,
      employeeId,
      studentId

    });
    
    localStorage.setItem("name",res.data.user.name);
    localStorage.setItem("token",res.data.token);
    localStorage.setItem("role",res.data.user.role);
    
    if(role=="student"){
      navigate("/studentdashboard");
    }
    else if(role=="faculty"){
      navigate("/facultydashboard");
    }



  
  }catch(error){
  setMessage(error.response?.data?.message || error.message);
  }

  };

  return (

    <div className="signup-container">

      <div className="signup-card">

        <div className="logo-section">

          <div className="logo-icon">
            <FaUserGraduate />
          </div>

          <h2>College Portal</h2>

        </div>

        <h1 className="welcome">Create Account</h1>

        <p className="subtitle">
          Register to access the college management dashboard
        </p>

        <form onSubmit={handleSignup} >

          <div className="input-group">

            <FaUser className="input-icon" />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="College Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <div className="role-selection">

            <div
              className={`role-card ${role === "student" ? "active" : ""}`}
              onClick={() => setRole("student")}
            >

              <FaUserGraduate className="role-icon" />

              <span>Student</span>

            </div>

            <div
              className={`role-card ${role === "faculty" ? "active" : ""}`}
              onClick={() => setRole("faculty")}
            >

              <FaUserTie className="role-icon" />

              <span>Faculty</span>

            </div>


          </div>

          {role === "student" && (

            <div className="extra-fields">

              <input
                type="text"
                placeholder="Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />

              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              >

                <option value="">Department</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>

              </select>

              <select
                value={sem}
                onChange={(e) => setSem(e.target.value)}
              >

                <option value="">Semester</option>
                <option value="1">Sem 1</option>
                <option value="2">Sem 2</option>
                <option value="3">Sem 3</option>
                <option value="4">Sem 4</option>
                <option value="5">Sem 5</option>
                <option value="6">Sem 6</option>
                <option value="7">Sem 7</option>
                <option value="8">Sem 8</option>

              </select>

              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >

                <option value="">Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>

              </select>

             <input
        className="full-field"
        type="email"
        placeholder="Parent Email"
        value={parentEmail}
        onChange={(e)=>setParentEmail(e.target.value)}
        />

            </div>

          )}

          {role === "faculty" && (

            <div className="extra-fields">

              <input
                type="text"
                placeholder="Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />

              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              >

                <option value="">Department</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>

              </select>

            </div>

          )}

          <button className="signup-btn">
            Create Account
          </button>
          {message && <p className="subtitle" >{message}</p>}

        </form>

        <p className="bottom-text">

          Already have an account?

          <span onClick={() => navigate("/login")}>
            Sign In
          </span>

        </p>

      </div>

    </div>

  );

};

export default Signup;