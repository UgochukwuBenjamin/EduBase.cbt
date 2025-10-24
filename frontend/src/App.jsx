import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import CreateExam from "./pages/CreateExam";
import AddStudent from "./pages/AddStudent";
import Dashboard from "./pages/Dashboard";
import StudentLogin from "./pages/StudentLogin";
import StudentReport from "./pages/StudentReports";
import ExamPage from "./pages/ExamPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/student-login" element={<StudentLogin />} />

            {/* Student Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute type="student">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/exam"
              element={
                <ProtectedRoute type="student">
                  <ExamPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Routes */}
            <Route
              path="/admindashboard"
              element={
                <ProtectedRoute type="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/create-exam"
              element={
                <ProtectedRoute type="admin">
                  <CreateExam />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-student"
              element={
                <ProtectedRoute type="admin">
                  <AddStudent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute type="admin">
                  <StudentReport />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
