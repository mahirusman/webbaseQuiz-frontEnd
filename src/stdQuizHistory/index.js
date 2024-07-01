import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import Header from "../header";
import "./index.css";

const StudentHistory = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post("/quizStats/student-history");
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student history:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return (
      <div className="student-history-container">
        <Header />

        <h1>No data available</h1>
      </div>
    );
  }

  return (
    <div className="student-history-container">
      <Header />
      <h1>Student Quiz History</h1>
      <table className="quiz-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Quiz Title</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Marks</th>
            <th>Quiz Status</th>
            <th>Submit Status</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {data?.attempts?.map((attempt, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <td>{index + 1}</td>
              <td>{attempt.quiz.quizName}</td>
              <td className="date">
                {new Date(attempt.quiz.openDate).toLocaleString()}
              </td>
              <td className="date">
                {new Date(attempt.quiz.endDate).toLocaleString()}
              </td>
              <td>{data.attempts.length || "N/A"}</td>
              <td
                className={
                  new Date() > new Date(attempt.quiz.endDate)
                    ? "status-closed"
                    : "status-open"
                }
              >
                {new Date() > new Date(attempt.quiz.endDate)
                  ? "Closed"
                  : "Open"}
              </td>
              <td className="submitted">
                Submitted
                <br />
                Submit Date: {new Date(attempt.attemptTime).toLocaleString()}
              </td>
              <td>{attempt.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentHistory;
