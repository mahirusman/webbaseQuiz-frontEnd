import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const QuestionListOfSpecificQuiz = ({ questionData, onEdit }) => {
  return (
    <div className="quiz-question">
      <div className="edit-icon-container">
        <FontAwesomeIcon
          icon={faEdit}
          className="edit-icon"
          onClick={() => onEdit(questionData)}
        />
      </div>
      <div className="quiz-question-content">
        <h2>{questionData.question}</h2>
        <ul>
          {questionData.options.map((option, index) => (
            <li key={index}>{option}</li>
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
  const { quizId } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/question/${quizId}`);
        if (response.data.success) {
          setQuestions(response.data.questions);
        }
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };

    fetchQuestions();
  }, [quizId]);

  const handleEdit = (questionData) => {
    // Implement the edit functionality here
    console.log("Edit question:", questionData);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-question-header">
        <span>Edit</span>
        <span>Question Details</span>
      </div>
      {questions.map((questionData, index) => (
        <QuestionListOfSpecificQuiz
          key={index}
          questionData={questionData}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default Quiz;
