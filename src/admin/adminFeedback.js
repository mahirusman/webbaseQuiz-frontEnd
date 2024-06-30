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
      const response = await axiosInstance.get("/feedback", {});
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
                <th>Title </th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {quizList.map((quiz, index) => (
                <tr key={quiz._id}>
                  <td>{index + 1}</td>
                  <td>{quiz.title}</td>
                  <td>{quiz.message}</td>

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
