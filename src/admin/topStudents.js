import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import SideBar from "./sideBar";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./adminHeader";

import "./index.css";

const AdminDashboard = () => {
  const [quizList, setQuizList] = useState([]);
  const navigate = useNavigate();

  console.log("quizList", quizList);

  const getQuizList = async () => {
    try {
      const response = await axiosInstance.post("/quizStats/top-students", {});
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
                <th>Student VU ID</th>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Total Scors</th>

                <th>Register Date</th>
              </tr>
            </thead>
            <tbody>
              {quizList.map((quiz, index) => (
                <tr key={quiz._id}>
                  <td>{index + 1}</td>
                  <td>{quiz?.student?.vuId}</td>
                  <td>{quiz?.student?.fullName}</td>
                  <td>{quiz?.student?.email}</td>
                  <td>{quiz?.totalCorrectAnswers}</td>

                  <td>{formatDate(quiz?.student?.createdAt)}</td>

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
