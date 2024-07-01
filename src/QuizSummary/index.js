import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useParams } from "react-router-dom";
import Header from "../header";
import "./index.css";

const QuizResults = () => {
  const [quizData, setQuizData] = useState(null);
  const [totalMarks, setTotalMarks] = useState(0);
  const { attemptId } = useParams();

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const response = await axiosInstance.post(`/quizStats/quiz-results`, {
          attemptId,
        });

        const data = response.data.data;
        setQuizData(data);

        const correctAnswers = data.questions.filter(
          (question) => question.isCorrect
        ).length;
        setTotalMarks(correctAnswers);
      } catch (error) {
        console.error("Error fetching quiz results:", error);
      }
    };

    fetchQuizResults();
  }, [attemptId]);

  if (!quizData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-results">
      <Header />
      <div className="">
        <h1>Assessment Quiz</h1>
        <h2>Post-Assessment</h2>
      </div>
      <div className="summary">
        <p>
          <strong>Total Questions:</strong> {quizData.questions.length}
        </p>
        <p>
          <strong>Quiz Duration:</strong>{" "}
          {Math.floor(quizData.quiz.duration / 60)} Minute(s),{" "}
          {quizData.quiz.duration % 60} Second(s)
        </p>
        <p>
          <strong>Quiz Result:</strong> {totalMarks} out of{" "}
          {quizData.questions.length}
        </p>
      </div>
      <h3>Assessment Attempt Detail</h3>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Result</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {quizData.questions.map((question, index) => (
            <tr key={index}>
              <td>{question.questionId.question}</td>
              <td className={question.isCorrect ? "correct" : "incorrect"}>
                {question.isCorrect ? "✔ - Correct" : "✘ - Incorrect"}
              </td>
              <td>
                {!question.isCorrect && question.questionId.correctAnswer}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizResults;
