// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("currentStudent"));
    if (!storedStudent) {
      navigate("/student-login");
      return;
    }
    setStudent(storedStudent);

    // Load all exams from localStorage
    const exams = JSON.parse(localStorage.getItem("exams")) || [];

    // Filter exams for this student's class
    const classExams = exams.filter(
      (e) =>
        e.className?.toLowerCase() === storedStudent.className?.toLowerCase()
    );

    // Extract unique subjects
    const subjectList = [...new Set(classExams.map((e) => e.subject))];
    setSubjects(subjectList);
  }, [navigate]);

  const handleStartExam = () => {
    if (!subject) {
      alert("Please select a subject to continue.");
      return;
    }

    const exams = JSON.parse(localStorage.getItem("exams")) || [];
    const selectedExam = exams.find(
      (e) =>
        e.className?.toLowerCase() === student.className?.toLowerCase() &&
        e.subject?.toLowerCase() === subject.toLowerCase()
    );

    if (!selectedExam) {
      alert(`Exam for ${subject} is not ready yet.`);
      return;
    }

    // ✅ Store selected exam for ExamPage
    localStorage.setItem("currentExam", JSON.stringify(selectedExam));

    // Navigate to exam page
    navigate("/exam");


  };

  const logout = () => {
    localStorage.removeItem("currentStudent");
    navigate("/student-login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-6">
      <BookOpen size={40} className="text-sky-700 mb-3" />
      <h1 className="text-3xl font-bold text-sky-700 mb-2">
        Welcome, {student?.name || "Student"} 👋
      </h1>
      <p className="text-gray-600 mb-6">
        Class: {student?.className} <br />
        Reg No: {student?.regNo}
      </p>

      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md mb-6">
        <h2 className="text-lg font-semibold text-sky-700 mb-3">
          Select Subject to Start Exam
        </h2>

        {subjects.length === 0 ? (
          <p className="text-gray-600">No subjects available for your class.</p>
        ) : (
          <>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-sky-600 outline-none mb-4"
            >
              <option value="">-- Select Subject --</option>
              {subjects.map((subj, i) => (
                <option key={i} value={subj}>
                  {subj}
                </option>
              ))}
            </select>

            <button
              onClick={handleStartExam}
              className="bg-sky-700 text-white w-full py-3 rounded-lg font-medium hover:bg-sky-800 transition"
            >
              Start Exam
            </button>
          </>
        )}
      </div>

      <button
        onClick={logout}
        className="text-red-500 font-medium hover:underline mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
