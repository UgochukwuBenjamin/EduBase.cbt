import React from "react";
import { motion } from "framer-motion";
import { BookOpen, UserPlus, BarChart3, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("edubaseUser");
    navigate("/login");
  };

  const features = [
    {
      title: "Create Exam",
      icon: <BookOpen size={40} className="text-sky-700" />,
      desc: "Set exams for various subjects and classes with timers.",
      path: "/admin/create-exam",
      bg: "bg-blue-50",
    },
    {
      title: "Add Student",
      icon: <UserPlus size={40} className="text-yellow-500" />,
      desc: "Register new students for your institution’s CBT platform.",
      path: "/admin/add-student",
      bg: "bg-yellow-50",
    },
    {
      title: "Check Student Report",
      icon: <BarChart3 size={40} className="text-green-600" />,
      desc: "View students’ scores, progress, and test analytics.",
      path: "/admin/reports",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-sky-700">
          EduBase Admin Dashboard
        </h1>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>

      {/* Dashboard Cards */}
      <motion.div
        className="grid md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {features.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className={`cursor-pointer ${item.bg} p-8 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1`}
          >
            <div className="flex flex-col items-center text-center">
              {item.icon}
              <h3 className="text-xl font-semibold mt-4 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
