import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const AdminDashboard = () => {
  const students = [
    {
      vuId: "BC001",
      email: "johndoe@example.com",
      fullName: "John Doe",
      registerAt: "2023-05-20",
    },
    {
      vuId: "BC002",
      email: "janedoe@example.com",
      fullName: "Jane Doe",
      registerAt: "2023-06-10",
    },
    {
      vuId: "BC003",
      email: "ali.ahmed@example.com",
      fullName: "Ali Ahmed",
      registerAt: "2023-07-05",
    },
    {
      vuId: "BC004",
      email: "sana.khan@example.com",
      fullName: "Sana Khan",
      registerAt: "2023-08-15",
    },
  ];

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/students" className="active">
                Student
              </Link>
            </li>
            <li>
              <Link to="/instructors">Instructors</Link>
            </li>
            <li>
              <Link to="/quiz">Quiz</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <h1>Admin Dashboard</h1>
        <table>
          <thead>
            <tr>
              <th>VU ID</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Register at</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.vuId}>
                <td>{student.vuId}</td>
                <td>{student.email}</td>
                <td>{student.fullName}</td>
                <td>{student.registerAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminDashboard;
