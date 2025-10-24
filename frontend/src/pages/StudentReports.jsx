import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileSpreadsheet,
  Trash2,
} from "lucide-react";

const StudentReport = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  // 📊 Load reports from localStorage
 useEffect(() => {
  const storedReports = JSON.parse(localStorage.getItem("reports")) || [];

  // 🛡 Remove duplicates: keep only the latest report per student per subject per class
  const uniqueReportsMap = {};
  storedReports.forEach((r) => {
    const key = `${r.regNo.toLowerCase()}-${r.subject.toLowerCase()}-${r.className.toLowerCase()}`;
    if (!uniqueReportsMap[key] || new Date(r.date) > new Date(uniqueReportsMap[key].date)) {
      uniqueReportsMap[key] = r;
    }
  });

  const uniqueReports = Object.values(uniqueReportsMap);
  setReports(uniqueReports);
}, []);


  // 🧩 Group reports by class → subject
  const groupedReports = reports.reduce((acc, report) => {
    const { className, subject } = report;
    if (!acc[className]) acc[className] = {};
    if (!acc[className][subject]) acc[className][subject] = [];
    acc[className][subject].push(report);
    return acc;
  }, {});

  // 🗑️ Delete individual report
  const deleteReport = (reportToDelete) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${reportToDelete.name}'s record in ${reportToDelete.subject}?`
      )
    )
      return;

    const updatedReports = reports.filter(
      (r) =>
        !(
          r.regNo === reportToDelete.regNo &&
          r.subject === reportToDelete.subject &&
          r.className === reportToDelete.className
        )
    );
    localStorage.setItem("reports", JSON.stringify(updatedReports));
    setReports(updatedReports);
  };

  // 🧹 Delete all reports for a subject
  const deleteSubjectReports = (className, subject) => {
    if (
      !window.confirm(
        `Delete all reports for ${subject} in ${className}? This cannot be undone.`
      )
    )
      return;

    const updatedReports = reports.filter(
      (r) => !(r.className === className && r.subject === subject)
    );
    localStorage.setItem("reports", JSON.stringify(updatedReports));
    setReports(updatedReports);
  };

  // 🧹 Delete all reports for a class
  const deleteClassReports = (className) => {
    if (
      !window.confirm(
        `Delete all reports for ${className}? This will remove every subject record in that class.`
      )
    )
      return;

    const updatedReports = reports.filter((r) => r.className !== className);
    localStorage.setItem("reports", JSON.stringify(updatedReports));
    setReports(updatedReports);
  };

  // 🧮 Sort alphabetically
  const sortByName = (arr) =>
    arr.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/admindashboard")}
          className="flex items-center text-sky-600 font-medium hover:text-sky-800"
        >
          <ArrowLeft size={20} className="mr-1" /> Back
        </button>
        <h1 className="text-2xl font-bold text-sky-700 flex items-center gap-2">
          <FileSpreadsheet size={24} /> Student Reports
        </h1>
      </div>

      {/* No Reports */}
      {reports.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <p>No reports available yet.</p>
        </div>
      ) : (
        Object.keys(groupedReports).map((className, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 mb-10 overflow-x-auto"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-sky-700">
                Class: {className.toUpperCase()}
              </h2>
              <button
                onClick={() => deleteClassReports(className)}
                className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
              >
                <Trash2 size={16} /> Delete Class Reports
              </button>
            </div>

            {Object.keys(groupedReports[className]).map((subject, j) => (
              <div key={j} className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Subject: {subject}
                  </h3>
                  <button
                    onClick={() =>
                      deleteSubjectReports(className, subject)
                    }
                    className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete Subject Reports
                  </button>
                </div>

                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead className="bg-sky-700 text-white">
                    <tr>
                      <th className="border border-gray-300 p-3">#</th>
                      <th className="border border-gray-300 p-3">Name</th>
                      <th className="border border-gray-300 p-3">Reg No</th>
                      <th className="border border-gray-300 p-3">Score (%)</th>
                      <th className="border border-gray-300 p-3">Answered</th>
                      <th className="border border-gray-300 p-3">Total</th>
                      <th className="border border-gray-300 p-3">Date</th>
                      <th className="border border-gray-300 p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortByName(groupedReports[className][subject]).map(
                      (r, k) => (
                        <tr
                          key={k}
                          className={`hover:bg-gray-100 ${
                            r.score >= 50 ? "bg-green-50" : "bg-red-50"
                          }`}
                        >
                          <td className="border border-gray-300 p-2 text-center">
                            {k + 1}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {r.name}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {r.regNo}
                          </td>
                          <td className="border border-gray-300 p-2 text-center font-semibold">
                            {r.score}%
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            {r.correctCount}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            {r.total}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            {r.date}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            <button
                              onClick={() => deleteReport(r)}
                              className="text-red-500 hover:text-red-700"
                              title="Delete this record"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default StudentReport;
