import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import { ObjectId } from "../utils";

// Define the enum for question types
const QuestionType = {
  MCQ: "Multiple Choice",
  SHORTQ: "Short Question",
};

const CreateQuiz = () => {
  const [questionType, setQuestionType] = useState(QuestionType.MCQ);
  const navigate = useNavigate();
  const { questionId, quizId } = useParams();
  const [questionData, setQuestionData] = useState();
  console.log("questionData", questionData);

  useEffect(() => {
    if (questionId && quizId) {
      axiosInstance
        .get(`/question/${quizId}/${questionId}`)
        .then((response) => {
          if (response.data.success) {
            setQuestionData(response.data);
          }
        });
    }
  }, [questionId, quizId]);

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

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axiosInstance.post("/question", {
        ...values,
        _id: questionId,
        quizId,
      });
      if (response.data.success) {
        toast.success("Question created successfully");

        handleNextClick(resetForm);
      }
    } catch (error) {
      console.error("Error fetching data:", error?.response?.data);
    }
  };

  const handleNextClick = (resetForm) => {
    resetForm(); // Resets the form to initial values
    navigate(`/${quizId}/question/${ObjectId()}`);
  };

  const handleBackClick = () => {
    navigate(`/${quizId}/question/${ObjectId()}`);
  };

  // const handleNextClikc = () => {

  //   return navigate(`/${questionId}/question/${ObjectId()}`);
  // };

  return (
    <div className="container">
      <div className="create-quiz">
        <div className="header">
          <h1>Create Questions</h1>
          <p>
            Total Questions Created:{" "}
            {!questionData?.question && !questionData?.quiz
              ? "0"
              : questionData?.quiz?.questionCount}
          </p>
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
          {({ isSubmitting, setFieldValue, resetForm }) => (
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
                  Save QUestion
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleNextClick(resetForm)}
                  className="btn btn-secondary"
                >
                  Next
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleBackClick(resetForm)}
                  className="btn btn-secondary"
                >
                  Back
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
