import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css"; // Make sure to create and include the CSS file
import useLocalStorage from "../hooks/localStorage";

const Header = () => {
  const navigate = useNavigate();
  const [value, setValue] = useLocalStorage();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">Web Base Quiz Application</div>
      <nav className="nav">
        {value.role == "student" ? (
          <>
            <Link to="/quiz-list" className="nav-link">
              List All Quizzes
            </Link>
          </>
        ) : (
          <>
            <Link to="/quiz-list" className="nav-link">
              List All Quizzes
            </Link>
            <Link to="/create-quiz" className="nav-link">
              Create New Quiz
            </Link>
          </>
        )}

        <button className="nav-link logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
