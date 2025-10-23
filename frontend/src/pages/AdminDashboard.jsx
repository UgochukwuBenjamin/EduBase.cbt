import React from "react";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("edubaseUser"));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50 text-center">
      <h1 className="text-3xl font-bold text-sky-700 mb-3">
        Welcome, {user?.fullName || "Admin"} 👋
      </h1>
      <p className="text-gray-600">You have successfully logged in to your Admin Dashboard.</p>
    </div>
  );
};

export default AdminDashboard;
