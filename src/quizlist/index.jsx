import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import "./index.css";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/localStorage";
import Header from "../header";

const CombinedComponent = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  const [value, setValue] = useLocalStorage();

  const handleData = async () => {
    try {
      const response = await axiosInstance.post("/quiz/list", {});
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
    <>
      <Header />
      <div className="full-container">
        {/* <div className="header"> */}
        <h1 className="heading">Quiz List</h1>
        {/* <button
            className="submit-btn"
            onClick={() => {
              navigate("/create-quiz");
            }}
          >
            Create New Quiz
          </button> */}
        {/* </div> */}

        <div className="quiz-list">
          {quizzes.length == 0 ? (
            <div>
              <b>No Quiz Availble to attempt</b>
            </div>
          ) : null}

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
              {value.role == "student" ? (
                <button
                  disabled={!isQuizActive(quiz.openDate, quiz.endDate)}
                  className="take-quiz-btn"
                  onClick={() => navigate(`/take-quiz/${quiz._id}`)}
                >
                  {isQuizActive(quiz.openDate, quiz.endDate)
                    ? "Take Quiz"
                    : "Quiz Not Available"}
                </button>
              ) : (
                <button
                  className="take-quiz-btn"
                  onClick={() => navigate(`/${quiz?._id}/question/`)}
                >
                  Add Questions
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CombinedComponent;
