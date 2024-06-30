import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import SideBar from "./sideBar";
import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "./adminHeader";

import "./index.css";

const AdminDashboard = () => {
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  console.log("questions", questions);

  return (
    <>
      <AdminHeader />
      <div style={{ display: "flex" }}>
        <SideBar />
        <main className="main-content">
          <table>
            <thead>
              <tr>
                <th>Sr</th>
                <th>Question</th>
                <th>options</th>
                <th>Question Type</th>
                <th>Correct Answer</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {questions?.map((quiz, index) => (
                <tr key={quiz._id}>
                  <td>{index + 1}</td>
                  <td>{quiz?.question}</td>

                  <td>
                    {quiz?.options.map((data) => (
                      <div>{data}</div>
                    ))}
                  </td>
                  <td>{quiz.questionType}</td>
                  <td>{quiz.correctAnswer}</td>
                  <td>{quiz.difficulty}</td>

                  {/* <td>
                  <Switch
                    onChange={() =>
                      toggleUserBlockStatus(
                        quiz.createdBy._id,
                        quiz.createdBy.isBlocked
                      )
                    }
                    checked={!quiz.createdBy.isBlocked}
                    offColor="#ff0000"
                    onColor="#00ff00"
                    uncheckedIcon={<div style={{ padding: 2 }}>Blocked</div>}
                    checkedIcon={<div style={{ padding: 2 }}>Active</div>}
                  />
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
