import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    className: "",
    regNo: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, className, regNo } = formData;
    const students = JSON.parse(localStorage.getItem("students")) || [];

    // 🔍 Find if this student exists
    const matchedStudent = students.find(
      (s) =>
        s.name.toLowerCase() === name.trim().toLowerCase() &&
        s.className.toLowerCase() === className.trim().toLowerCase() &&
        s.regNo.trim().toUpperCase() === regNo.trim().toUpperCase()
    );

    if (matchedStudent) {
      localStorage.setItem("currentStudent", JSON.stringify(matchedStudent));
      alert(`Welcome ${matchedStudent.name}!`);
      navigate("/dashboard"); // ✅ Corrected route
    } else {
      setError("Invalid login details. Please check and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <motion.div
        className="bg-white p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-6">
          <LogIn className="text-sky-700 mr-2" size={26} />
          <h2 className="text-2xl font-bold text-sky-700">Student Login</h2>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-sky-600 outline-none"
            required
          />

          <input
            type="text"
            name="className"
            placeholder="Class (e.g. SS1)"
            value={formData.className}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-sky-600 outline-none"
            required
          />

          <input
            type="text"
            name="regNo"
            placeholder="Registration Number"
            value={formData.regNo}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-sky-600 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-sky-700 text-white py-3 rounded-lg font-medium hover:bg-sky-800 transition"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
