import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance"; // Import your axios instance
import { useParams } from "react-router-dom";
import dayjs from "dayjs"; // Import dayjs

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [quizDetails, setQuizDetails] = useState({});
  const { quizId } = useParams();

  // Effect to fetch questions and quiz details on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/question/${quizId}`); // Assuming this endpoint returns all details
        setQuestions(response?.data?.questions);
        if (response?.data?.questions[0]) {
          const quizInfo = response?.data?.questions[0]?.quizId; // Assuming quiz details are nested here
          setQuizDetails({
            ...quizInfo,
            startDate: quizInfo.openDate
              ? dayjs(quizInfo.openDate).format("DD/MM/YYYY")
              : "",
            endDate: quizInfo.endDate
              ? dayjs(quizInfo.endDate).format("DD/MM/YYYY")
              : "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch questions", error);
      }
    };

    fetchQuestions();
  }, [quizId]); // Include quizId in the dependency array to refetch if it changes

  const styles = {
    listContainer: {
      margin: "20px auto",
      padding: "20px",
      maxWidth: "600px",
      backgroundColor: "#f0f0f0",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    listItem: {
      padding: "10px",
      borderBottom: "1px solid #ccc",
      marginBottom: "10px",
    },
    questionHeader: {
      fontSize: "18px",
      color: "#333",
    },
    detail: {
      fontSize: "16px",
      color: "#666",
      marginBottom: "5px",
    },
    quizDetail: {
      marginBottom: "20px",
      fontSize: "16px",
      color: "#333",
    },
  };

  return (
    <div style={styles.listContainer}>
      <h1>Quiz Details</h1>
      <div style={styles.quizDetail}>
        <p>Name: {quizDetails?.quizName}</p>
        <p>Duration: {quizDetails?.duration} minutes</p>
        <p>Start Date: {quizDetails?.startDate}</p>
        <p>End Date: {quizDetails?.endDate}</p>
      </div>
      <h2>Questions List</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index} style={styles.listItem}>
            <h3 style={styles.questionHeader}>
              {question.questionType}: {question.question}
            </h3>
            <p style={styles.detail}>Options: {question.options.join(", ")}</p>
            <p style={styles.detail}>
              Correct Answer: {question.correctAnswer}
            </p>
            <p style={styles.detail}>Difficulty: {question.difficulty}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
