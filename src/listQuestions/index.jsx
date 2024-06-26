import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Header from "../header";

const array = ["A", "B", "C", "D"];

const QuestionListOfSpecificQuiz = ({ index, questionData }) => {
  return (
    <div className="quiz-question">
      Question : {index + 1}
      <div className="quiz-question-content">
        <h2>{questionData.question}</h2>
        <ul>
          {questionData.options.map((option, index) => (
            <li key={index}>
              Option {array[index]}: {option}
            </li>
          ))}
        </ul>
        <p>Correct Answer: {questionData.correctAnswer}</p>
        <p>Difficulty: {questionData.difficulty}</p>
      </div>
    </div>
  );
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [quizDetails, setQuizDetails] = useState({});
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/question/${quizId}`);
        if (response.data.success) {
          setQuestions(response.data.questions);
          if (response.data.questions.length > 0) {
            setQuizDetails(response.data.questions[0].quizId);
          }
        }
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };

    fetchQuestions();
  }, [quizId]);

  return (
    <>
      <Header />

      <div className="quiz-container">
        <div className="quiz-details">
          <h1>Quiz Name: {quizDetails.quizName}</h1>
          <p>Duration: {quizDetails.duration} minutes</p>
          <p>
            Open Date: {new Date(quizDetails.openDate).toLocaleDateString()}
          </p>
          <p>
            Close Date: {new Date(quizDetails.endDate).toLocaleDateString()}
          </p>
          <p>Category: {quizDetails.category}</p>
        </div>

        <div className="quiz-question-header">
          <span>Question Details</span>
        </div>
        {questions.map((questionData, index) => (
          <QuestionListOfSpecificQuiz
            key={index}
            index={index}
            questionData={questionData}
          />
        ))}

        <button
          className="btn btn-primary"
          onClick={() => {
            navigate(`/${quizDetails?._id}/question`);
          }}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default Quiz;
