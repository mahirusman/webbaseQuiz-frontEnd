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
import Feedback from "./feedback";
import AdminFeedback from "./admin/adminFeedback";
import TopStudents from "./admin/topStudents";
import TopStudentsStd from "./topStudents";

import ListQuestions from "./listQuestions";
import ShowQuestionStudents from "./showQuestionStudents";
import AdminList from "./admin/listUsers";
import Instructors from "./admin/instructors";
import QuizList from "./admin/quizList";
import QuizSummary from "./QuizSummary/";
import StdQuizHistory from "./stdQuizHistory";
import AdminQuizDetail from "./admin/quizQuestionsList";
import ProtectedRoute from "./hooks/protectedRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/quiz-list" element={<Quizlist />} />
          <Route path="/feed-back" element={<Feedback />} />
          <Route path="/admin/feed-back" element={<AdminFeedback />} />
          <Route path="/admin/top-students" element={<TopStudents />} />
          <Route path="/top-students" element={<TopStudentsStd />} />

          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/:quizId/question" element={<CreateQuestions />} />
          <Route path="/detail/:quizId" element={<ListQuestions />} />
          <Route path="/take-quiz/:quizId" element={<ShowQuestionStudents />} />
          <Route path="/admin/user-list" element={<AdminList />} />
          <Route path="/admin/instructor-list" element={<Instructors />} />
          <Route path="/admin/quiz-list" element={<QuizList />} />
          <Route path="/quizSummary/:attemptId" element={<QuizSummary />} />
          <Route path="/quiz-history" element={<StdQuizHistory />} />
          <Route path="/admin/detail/:quizId" element={<AdminQuizDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
