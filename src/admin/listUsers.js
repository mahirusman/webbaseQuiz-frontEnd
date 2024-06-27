import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import SideBar from "./sideBar";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { toast } from "react-toastify";

import "./index.css";

const AdminDashboard = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  const getUsersList = async () => {
    try {
      const response = await axiosInstance.get(
        "/auth/userList?role=student",
        {}
      );
      if (response.data.success) {
        setUserList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error?.response?.data);
    }
  };

  useEffect(() => {
    getUsersList();
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
        getUsersList(); // Refresh the user list
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

              <th>VU ID</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Register at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((student, index) => (
              <tr key={student.vuId}>
                <td>{index + 1}</td>

                <td>{student.vuId}</td>
                <td>{student.email}</td>
                <td>{student.fullName}</td>
                <td>{student.role}</td>
                <td>{formatDate(student.createdAt)}</td>
                <td>
                  <Switch
                    onChange={() =>
                      toggleUserBlockStatus(student?._id, student.isBlocked)
                    }
                    checked={!student.isBlocked}
                    offColor="#ff0000"
                    onColor="#00ff00"
                    uncheckedIcon={<div style={{ padding: 2 }}>Blocked</div>}
                    checkedIcon={<div style={{ padding: 2 }}>Active</div>}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminDashboard;
