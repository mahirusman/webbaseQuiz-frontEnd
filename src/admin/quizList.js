import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import SideBar from "./sideBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminHeader from "./adminHeader";

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

  const handleViewDetailClick = (quiz) => {
    navigate(`/admin/detail/${quiz?._id}`);
  };

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
                <th>Quiz Name</th>
                <th>Duration</th>
                <th>Open Date</th>
                <th>End Date</th>
                <th>Category</th>
                <th>Created By</th>
                <th>Created At</th>
                <th>Action</th>
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
                  <td
                    onClick={() => handleViewDetailClick(quiz)}
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    View Detail
                  </td>

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
