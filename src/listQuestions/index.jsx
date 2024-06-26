import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import "./index.css";
import { useNavigate } from "react-router-dom";

const CombinedComponent = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  const handleData = async () => {
    try {
      const response = await axiosInstance.get("/quiz");
      console.log("response", response);
      if (response.data.success) {
        setQuizzes(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error?.response?.data);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  const isQuizActive = (openDate, endDate) => {
    const currentDate = new Date();
    return (
      currentDate >= new Date(openDate) && currentDate <= new Date(endDate)
    );
  };

  return (
    <div className="full-container">
      <div className="header">
        <h1 className="heading">Quiz List</h1>
      </div>
      {quizzes.length === 0 ? (
        <div className="no-quizzes">
          <p>No quizzes available. Click the button below to create a quiz.</p>
        </div>
      ) : (
        <div className="quiz-list">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card">
              <h2>{quiz.quizName}</h2>
              <p>
                <strong>Duration:</strong> {quiz.duration} hours
              </p>
              <p>
                <strong>Category:</strong> {quiz.category}
              </p>
              <p>
                <strong>Open Date:</strong>{" "}
                {new Date(quiz.openDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(quiz.endDate).toLocaleDateString()}
              </p>
              <button
                className="take-quiz-btn"
                disabled={!isQuizActive(quiz.openDate, quiz.endDate)}
                onClick={() => navigate(`/take-quiz/${quiz._id}`)}
              >
                {isQuizActive(quiz.openDate, quiz.endDate)
                  ? "Take Quiz"
                  : "Quiz Not Available"}
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="footer">
        <button
          className="submit-btn"
          onClick={() => {
            navigate("/create-quiz");
          }}
        >
          Create New Quiz
        </button>
      </div>
    </div>
  );
};

export default CombinedComponent;
