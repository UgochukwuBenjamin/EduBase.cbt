import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlus, ArrowLeft, Users, Edit, Trash2, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    name: "",
    className: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("students"));
    if (stored) setStudents(stored);
  }, []);

  const generateRegNumber = () => {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `EDU-${new Date().getFullYear()}-${num}`;
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const addStudent = () => {
    if (!student.name || !student.className) {
      showMessage("Please enter student name and class!");
      return;
    }

    if (editingIndex !== null) {
      const updated = [...students];
      updated[editingIndex] = { ...updated[editingIndex], name: student.name, className: student.className };
      setStudents(updated);
      localStorage.setItem("students", JSON.stringify(updated));
      setEditingIndex(null);
      setStudent({ name: "", className: "" });
      showMessage("Student details updated!");
    } else {
      const newStudent = { ...student, regNo: generateRegNumber() };
      const updated = [...students, newStudent];
      setStudents(updated);
      localStorage.setItem("students", JSON.stringify(updated));
      setStudent({ name: "", className: "" });
      showMessage(`Student added successfully! Registration No: ${newStudent.regNo}`);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setStudent({ name: students[index].name, className: students[index].className });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
    showMessage("Student deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Message */}
      {message && (
        <motion.div
          className="bg-green-100 text-green-800 p-3 rounded mb-4 shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {message}
        </motion.div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/admindashboard")}
          className="flex items-center text-sky-600 font-medium hover:text-sky-800"
        >
          <ArrowLeft size={20} className="mr-1" /> Back
        </button>
        <h1 className="text-2xl font-bold text-sky-700 flex items-center gap-2">
          <UserPlus size={24} /> {editingIndex !== null ? "Edit Student" : "Add Student"}
        </h1>
      </div>

      {/* Add/Edit Student Form */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-md mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {editingIndex !== null ? "Edit Student Details" : "Register New Student"}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Student Full Name"
            value={student.name}
            onChange={(e) => setStudent({ ...student, name: e.target.value })}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-sky-600 outline-none"
          />
          <input
            type="text"
            placeholder="Class (e.g. SS1)"
            value={student.className}
            onChange={(e) => setStudent({ ...student, className: e.target.value })}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-sky-600 outline-none"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={addStudent}
            className="bg-sky-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-sky-800 transition flex items-center gap-2"
          >
            {editingIndex !== null ? <Check size={18} /> : <UserPlus size={18} />}
            {editingIndex !== null ? "Update Student" : "Add Student"}
          </button>
        </div>
      </motion.div>

      {/* Student List */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Users size={20} className="text-sky-600" /> Registered Students
        </h2>

        {students.length === 0 ? (
          <p className="text-gray-500">No students added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-sky-700 text-white">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Class</th>
                  <th className="p-3 text-left">Reg. Number</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3">{s.name}</td>
                    <td className="p-3">{s.className}</td>
                    <td className="p-3 text-sky-700 font-semibold">{s.regNo}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(i)}
                        className="text-green-600 flex items-center gap-1 hover:text-green-800"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(i)}
                        className="text-red-500 flex items-center gap-1 hover:text-red-700"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AddStudent;
