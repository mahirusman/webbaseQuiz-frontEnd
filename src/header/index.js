import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css"; // Make sure to create and include the CSS file

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">MyApp</div>
      <nav className="nav">
        <Link to="/quiz-list" className="nav-link">
          List All Quizzes
        </Link>
        <Link to="/create-quiz" className="nav-link">
          Create New Quiz
        </Link>
        <button className="nav-link logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
