import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css"; // Make sure to have CSS for active class styling

function SideBar() {
  return (
    <>
      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <NavLink to="/dashboard" activeClassName="active">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/user-list" activeClassName="active">
                Student
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/instructor-list" activeClassName="active">
                Instructors
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/quiz-list" activeClassName="active">
                Quiz
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/feed-back" activeClassName="active">
                Feedback
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/top-students" activeClassName="active">
                Top Students
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default SideBar;
