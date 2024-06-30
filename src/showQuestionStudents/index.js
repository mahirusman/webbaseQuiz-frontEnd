import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import useLocalStorage from "../hooks/localStorage";
import { useNavigate } from "react-router-dom";
import "./index.css";

const QuizAttempt = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizDetails, setQuizDetails] = useState({});
  const [attemptedQuestions, setAttemptedQuestions] = useState({});
  const [timeLeft, setTimeLeft] = useState(-1); // Timer in minutes
  const { quizId } = useParams();
  const [quizAttemptInstance, setquizAttemptInstance] = useState();
  const [value, setValue] = useLocalStorage();
  const currentQuestion = questions[currentQuestionIndex];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/question/${quizId}`);
        if (response.data.success) {
          setQuestions(response.data.questions);
          if (response.data.questions.length > 0) {
            setQuizDetails(response.data.questions[0].quizId);
            // setTimeLeft(response.data.questions[0].quizId.duration);
            setTimeLeft(response.data.questions[0].quizId.duration * 60);
          }
        }
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };

    fetchQuestions();
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000); // Decrease timeLeft by 1 second (1000 ms)

    return () => clearInterval(timer);
  }, [quizId]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleFinishExam();
    }
  }, [timeLeft]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const onSaveClick = async () => {
    const response = await axiosInstance.post("/quizStats/quiz-attempt", {
      student: value?._id,
      quiz: quizId,
      totalQUestions: questions?.length,
      question: {
        questionId: currentQuestion?._id,
        selectedOption: selectedOption,
        isCorrect: selectedOption == currentQuestion?.correctAnswer,
      },
    });
    setquizAttemptInstance(response?.data?.data?._id);
  };

  const handleNextQuestion = () => {
    setAttemptedQuestions({
      ...attemptedQuestions,
      [currentQuestionIndex]: selectedOption,
    });
    setSelectedOption(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setSelectedOption(attemptedQuestions[currentQuestionIndex - 1] || null);
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleFinishExam = () => {
    navigate(`/quizSummary/${quizAttemptInstance}`);
  };

  const handleSaveClick = () => {};

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins < 10 ? "0" : ""}${mins}`;
  };

  if (questions.length === 0) return <div>Loading...</div>;

  return (
    <div className="quiz-attempt-container">
      <div className="quiz-header">
        <h1 className="quiz-title">{quizDetails.quizName}</h1>
        <div className="quiz-details">
          <p>Category: {quizDetails.category}</p>
          <p>Student ID: {value.vuId}</p>
        </div>
        <div className="timer">{formatTime(timeLeft)}</div>
      </div>
      <div className="question-section">
        <h2>
          Question No: {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <p>{currentQuestion.question}</p>
      </div>
      <div className="options-section">
        {currentQuestion.options.map((option, index) => (
          <label key={index} className="option">
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        ))}
      </div>
      <div className="navigation-section">
        {/* <button
          className="nav-btn"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button> */}

        <button className="nav-btn" onClick={onSaveClick}>
          Save
        </button>

        <button
          className="nav-btn"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
        <button
          className="finish-btn"
          disabled={!quizAttemptInstance}
          onClick={handleFinishExam}
        >
          Finish Exam
        </button>
      </div>
      {/* <div className="summary-section">
        <h2>Summary</h2>
        <div className="question-summary">
          {questions.map((question, index) => (
            <button
              key={index}
              className={`summary-btn ${
                attemptedQuestions[index] ? "attempted" : ""
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default QuizAttempt;
