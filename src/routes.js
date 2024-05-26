import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./signup/index"; // Assuming you have the Signup component
import Login from "./login/index"; // Assuming you have the Login component
import CreateQuestions from "./createQuestions"; // Assuming you have the Login component
import CreateQuiz from "./createQuiz"; // Assuming you have the Login component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route
          path="/:quizId/question/:questionId"
          element={<CreateQuestions />}
        />
      </Routes>
    </Router>
  );
};

export default App;
