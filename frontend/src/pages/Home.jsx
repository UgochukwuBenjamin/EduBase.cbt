import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section className="bg-gradient-to-b from-sky-600 to-blue-800 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center py-24 px-6">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Empower Your Learning with LearnPro CBT
        </motion.h1>
        <p className="text-lg mb-6">
          Professional online testing platform for schools and organizations.
        </p>
        <a
          href="/login"
          className="bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-xl shadow hover:bg-yellow-300 transition"
        >
          Get Started
        </a>
      </div>

      {/* Features Section */}
      <div className="bg-white text-gray-800 py-16 px-6 grid md:grid-cols-3 gap-10">
        {[
          { title: "Smart Testing", text: "AI-driven question randomization and secure exams." },
          { title: "Analytics", text: "Track your progress and improve with insights." },
          { title: "Multi-Device", text: "Works perfectly on mobile, tablet, and PC." },
        ].map((f, i) => (
          <div key={i} className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
