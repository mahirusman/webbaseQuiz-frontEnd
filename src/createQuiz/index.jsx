import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ObjectId } from "../utils";
import "./index.css";

const validationSchema = Yup.object().shape({
  quizName: Yup.string().required("Quiz Name is required"),
  duration: Yup.number()
    .required("Duration is required")
    .min(1, "Duration must be at least 1 minute"),
  openDate: Yup.date().required("Open Date is required"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("openDate"), "End Date cannot be before Open Date"),
  category: Yup.string().required("Category is required"),
});

const CreateQuiz = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axiosInstance.post("/quiz", {
        ...values,
      });
      if (response.data.success) {
        toast.success("Quiz register successfully");
        return navigate(`/${response?.data?.data._id}/question/`);
      }
    } catch (error) {
      console.error("Error fetching data:", error?.response?.data);
    }
  };

  return (
    <div className="container">
      <h2>Create Quiz</h2>
      <Formik
        initialValues={{
          quizName: "",
          duration: "",
          openDate: "",
          endDate: "",
          category: "Data Science",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="quizName">Quiz Name</label>
              <Field
                type="text"
                id="quizName"
                name="quizName"
                className="form-control"
              />
              <ErrorMessage name="quizName" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration (minutes)</label>
              <Field
                type="number"
                id="duration"
                name="duration"
                className="form-control"
              />
              <ErrorMessage name="duration" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="openDate">Open Date</label>
              <Field
                type="date"
                id="openDate"
                name="openDate"
                className="form-control"
              />
              <ErrorMessage name="openDate" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <Field
                type="date"
                id="endDate"
                name="endDate"
                className="form-control"
              />
              <ErrorMessage name="endDate" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <Field
                as="select"
                id="category"
                name="category"
                className="form-control"
              >
                <option value="Data Science">Data Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Literature">Literature</option>
              </Field>
              <ErrorMessage name="category" component="div" className="error" />
            </div>

            <button type="submit" className="btn btn-primary">
              Create Quiz
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateQuiz;
