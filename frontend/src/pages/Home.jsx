import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="overlay">
        <div className="home-content">

          <h1 className="title">
            College <span>Management System</span>
          </h1>

          <p className="subtitle">
            A smart platform to manage students, faculty,parents, and college
            administration efficiently in one place.
          </p>

          <button
            className="start-btn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

        </div>
      </div>
    </div>
  );
};

export default Home;