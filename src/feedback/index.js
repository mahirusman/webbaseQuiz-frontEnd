import React, { useState } from "react";
import Header from "../header";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";

import "./index.css";

const FeedbackForm = ({ onSubmit }) => {
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = {
      title: subject,
      message: comment,
    };
    await axiosInstance.post(`/feedback`, feedback);
    toast.success(`Feedback recorded successfully`);

    setSubject("");
    setComment("");
  };

  return (
    <>
      <Header />
      <h1 className="heading">Provide Feedback to Improve the application</h1>

      <div className="feedback-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default FeedbackForm;
