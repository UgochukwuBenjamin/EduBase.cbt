import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";


const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
            {/* {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/admindashboard" element={<AdminDashboard />} />
            {/* <Route path="/exam" element={<ExamPage />} /> */}  
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;

