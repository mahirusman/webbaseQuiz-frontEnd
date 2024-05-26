import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";

// Define the enum for question types
const QuestionType = {
  MCQ: "Multiple Choice",
  SHORTQ: "Short Question",
};

const CreateQuiz = () => {
  const [questionType, setQuestionType] = useState(QuestionType.MCQ);
  const navigate = useNavigate();
  const getValidationSchema = (questionType) => {
    return Yup.object().shape({
      questionType: Yup.string().required("Question Type is required"),
      question: Yup.string().required("Question is required"),
      correctAnswer: Yup.string()
        .required("Correct Answer is required")
        .test(
          "correct-answer-check",
          "Correct Answer must be one of the options",
          function (value) {
            const { options } = this.parent;
            if (questionType === QuestionType.MCQ) {
              const optionsArray = options ? options.split(",") : [];
              return optionsArray.includes(value);
            }
            return true;
          }
        ),
      difficulty: Yup.string().required("Difficulty is required"),
    });
  };
  const { questionId } = useParams();
  const handleSubmit = async (values) => {
    try {
      const response = await axiosInstance.post("/question", {
        ...values,
        _id: questionId,
      });
      if (response.data.success) {
        toast.success("Quiz register successfully");
        return navigate(`/${response?.data?.data._id}/question`);
      }
    } catch (error) {
      console.error("Error fetching data:", error?.response?.data);
    }
  };

  return (
    <div className="container">
      <div className="create-quiz">
        <div className="header">
          <h1>Create Questions</h1>
          <p>Total Questions Created: 0</p>
        </div>
        <Formik
          initialValues={{
            questionType: QuestionType.MCQ,
            question: "",
            options: "",
            correctAnswer: "",
            difficulty: "Easy",
          }}
          validationSchema={getValidationSchema(questionType)}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="questionType">Question Type</label>
                <Field
                  as="select"
                  name="questionType"
                  className="form-control"
                  onChange={(e) => {
                    setQuestionType(e.target.value);
                    setFieldValue("questionType", e.target.value);
                  }}
                >
                  <option value={QuestionType.MCQ}>{QuestionType.MCQ}</option>
                  <option value={QuestionType.SHORTQ}>
                    {QuestionType.SHORTQ}
                  </option>
                </Field>
                <ErrorMessage
                  name="questionType"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="question">Question</label>
                <Field as="textarea" name="question" className="form-control" />
                <ErrorMessage
                  name="question"
                  component="div"
                  className="error"
                />
              </div>

              {questionType === QuestionType.MCQ && (
                <div className="form-group">
                  <label htmlFor="options">
                    Options (Separate with commas)
                  </label>
                  <Field type="text" name="options" className="form-control" />
                  <ErrorMessage
                    name="options"
                    component="div"
                    className="error"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="correctAnswer">Correct Answer</label>
                <Field
                  type="text"
                  name="correctAnswer"
                  className="form-control"
                />
                <ErrorMessage
                  name="correctAnswer"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="difficulty">Difficulty</label>
                <Field as="select" name="difficulty" className="form-control">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Field>
                <ErrorMessage
                  name="difficulty"
                  component="div"
                  className="error"
                />
              </div>

              <div className="button-group">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  Submit Quiz
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  className="btn btn-secondary"
                >
                  Add Question
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateQuiz;
