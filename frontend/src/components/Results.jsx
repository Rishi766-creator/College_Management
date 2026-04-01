import React from "react";
import "../styles/Results.css";

const Results = () => {
  return (
    <div className="results-card card">
      <h2>Results</h2>
      <p>
        Your semester results are available on the official university results portal. 
        Click below to view your results.
      </p>
      <button
        className="action-btn"
        onClick={() => window.open("http://nexus.rguktong.ac.in/Nexus/")}
      >
        View Results
      </button>
    </div>
  );
};

export default Results;