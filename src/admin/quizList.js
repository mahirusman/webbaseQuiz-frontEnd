import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import SideBar from "./sideBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./index.css";

const AdminDashboard = () => {
  const [quizList, setQuizList] = useState([]);
  const navigate = useNavigate();

  const getQuizList = async () => {
    try {
      const response = await axiosInstance.post("/quiz/list", {});
      if (response.data.success) {
        setQuizList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error?.response?.data);
    }
  };

  useEffect(() => {
    getQuizList();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleUserBlockStatus = async (userId, isBlocked) => {
    try {
      const url = `/auth/${userId}/block`;
      const response = await axiosInstance.put(url);
      if (response.data.success) {
        toast.success(
          `User ${isBlocked ? "unblocked" : "blocked"} successfully`
        );
        getQuizList(); // Refresh the user list
      }
    } catch (error) {
      console.error(
        `Error ${isBlocked ? "unblocking" : "blocking"} user:`,
        error?.response?.data
      );
    }
  };

  return (
    <div className="admin-dashboard">
      <SideBar />
      <main className="main-content">
        <header className="header">
          <h1>Admin Dashboard</h1>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <table>
          <thead>
            <tr>
              <th>Sr</th>
              <th>Quiz Name</th>
              <th>Duration</th>
              <th>Open Date</th>
              <th>End Date</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {quizList.map((quiz, index) => (
              <tr key={quiz._id}>
                <td>{index + 1}</td>
                <td>{quiz.quizName}</td>
                <td>{quiz.duration}</td>
                <td>{formatDate(quiz.openDate)}</td>
                <td>{formatDate(quiz.endDate)}</td>
                <td>{quiz.category}</td>
                <td>{quiz.createdBy.fullName}</td>
                <td>{formatDate(quiz.createdAt)}</td>
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
  );
};

export default AdminDashboard;
