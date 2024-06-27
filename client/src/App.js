// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./component/Auth/Login";
import Signup from "./component/Auth/Signup";
import UserProfile from "./component/pages/UserProfile";
import Home from "./component/pages/Home";
import Admin from "./component/pages/Admin";
import StudentPage from "./component/pages/StudentPage";

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {user && user.role === "admin" ? (
          <>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/admin" />} />
          </>
        ) : user && user.role === "student" ? (
          <>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="*" element={<Navigate to="/student" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
