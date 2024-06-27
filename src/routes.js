import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./signup/index";
import Login from "./login/index";
import CreateQuestions from "./createQuestions";
import CreateQuiz from "./createQuiz";
import Quizlist from "./quizlist";
import ListQuestions from "./listQuestions";
import ShowQuestionStudents from "./showQuestionStudents";
import AdminList from "./admin/listUsers";
import Instructors from "./admin/instructors";
import QuizList from "./admin/quizList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/:quizId/question" element={<CreateQuestions />} />
        <Route path="/detail/:quizId" element={<ListQuestions />} />
        <Route path="/quiz-list" element={<Quizlist />} />
        <Route path="/take-quiz/:quizId" element={<ShowQuestionStudents />} />
        <Route path="/admin/user-list" element={<AdminList />} />
        <Route path="/admin/instructor-list" element={<Instructors />} />
        <Route path="/admin/quiz-list" element={<QuizList />} />

        {/* <Route path="/quiz/:quizId" element={<Quizlist />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
