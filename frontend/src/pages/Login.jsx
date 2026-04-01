import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import API from "../utils/axios";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage]=useState("")

  const handleLogin =  async (e) => {
    try{
    e.preventDefault();
    const res=await API.post("/auth/login",{
      email,
      password
    });
    const temp=res.data.user.role;
    const name=res.data.user.name;
    console.log(name);
    localStorage.setItem("name",res.data.user.name);
    localStorage.setItem("role",res.data.user.role);
    localStorage.setItem("token",res.data.token);
    if(temp=="student"){
      navigate("/studentdashboard");
    }
    else if(temp=="faculty"){
      navigate("/facultydashboard");
    }
    else if(temp=="admin"){
      navigate("/admindashboard");
    }
    }catch(error){
      setMessage(error.response?.data?.message);

    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <div className="logo-icon">
            <FaUserGraduate />
          </div>
          <h2>College Portal</h2>
        </div>

        <h1 className="welcome">Welcome Back</h1>
        <p className="subtitle">
          Sign in to access your college management dashboard
        </p>
        {message && <p className="subtitle">{message}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <MdEmail className="input-icon" />
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eye" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="login-btn">Sign In </button>
        </form>

        <p className="bottom-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Create Account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;