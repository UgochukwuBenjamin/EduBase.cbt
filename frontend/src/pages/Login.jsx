import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("edubaseUser"));

    if (!storedUser) {
      setError("No registered user found. Please sign up first.");
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      alert("Login successful!");
      navigate("/admindashboard");
    } else {
      setError("Invalid email or password.");
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
          <h2 className="text-2xl font-bold text-sky-700">Welcome Back</h2>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-sky-600 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-sky-700 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
