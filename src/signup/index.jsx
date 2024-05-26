import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "./index.css";

const SignupSchema = Yup.object().shape({
  vuId: Yup.string().required("VU ID is required"),
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  role: Yup.string().required("Role is required"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axiosInstance.post("/auth/signup", {
        ...values,
      });
      if (response.data.success) {
        toast.success("Account created successfully");
        return navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching data:", error?.response?.data);
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <Formik
        initialValues={{
          vuId: "",
          fullName: "",
          email: "",
          password: "",
          role: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="vuId">VU ID</label>
              <Field type="text" id="vuId" name="vuId" />
              <ErrorMessage
                name="vuId"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <Field type="text" id="fullName" name="fullName" />
              <ErrorMessage
                name="fullName"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="eye-icon"
                  onClick={handleTogglePassword}
                />
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <Field
                as="select"
                id="role"
                name="role"
                className="role-dropdown"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className="error-message"
              />
            </div>
            <button type="submit" className="submit-btn">
              Signup
            </button>
          </Form>
        )}
      </Formik>
      <div className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default Signup;
