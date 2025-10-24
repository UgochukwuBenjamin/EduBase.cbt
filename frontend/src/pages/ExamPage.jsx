import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle, AlertCircle, Info } from "lucide-react";

const ExamPage = () => {
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [student, setStudent] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
    icon: "",
    color: "",
    autoRedirect: false,
  });

  // Load exam & student
  useEffect(() => {
    const storedExam = JSON.parse(localStorage.getItem("currentExam"));
    const storedStudent = JSON.parse(localStorage.getItem("currentStudent"));

    if (!storedExam || !storedStudent) {
      navigate("/dashboard");
      return;
    }

    setExam(storedExam);
    setStudent(storedStudent);
    setTimeLeft(parseInt(storedExam.timer || 600));

    // Check if exam already taken
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const taken = reports.some(
      (r) =>
        r.regNo?.toLowerCase() === storedStudent.regNo?.toLowerCase() &&
        r.subject?.toLowerCase() === storedExam.subject?.toLowerCase() &&
        r.className?.toLowerCase() === storedStudent.className?.toLowerCase()
    );
    if (taken) {
      setModal({
        show: true,
        title: "Exam Already Taken",
        message: `You have already completed the ${storedExam.subject} exam.`,
        icon: "info",
        color: "blue",
        autoRedirect: true,
      });
      setTimeout(() => navigate("/dashboard"), 4000);
    }
  }, [navigate]);

  // Countdown timer
  useEffect(() => {
    if (!exam || submitted) return;
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted, exam]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? `${h}:` : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleAnswer = (index, option) => {
    if (submitted) return;
    setAnswers({ ...answers, [index]: option });
  };

  // Save report
  const saveReport = (finalScore, correctCount, total, answeredCount) => {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const exists = reports.some(
      (r) =>
        r.regNo.toLowerCase() === student.regNo.toLowerCase() &&
        r.subject.toLowerCase() === exam.subject.toLowerCase() &&
        r.className.toLowerCase() === student.className.toLowerCase()
    );
    if (exists) return;

    const reportEntry = {
      name: student.name,
      className: student.className,
      regNo: student.regNo,
      subject: exam.subject,
      score: finalScore,
      correctCount,
      total,
      answeredCount,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("reports", JSON.stringify([...reports, reportEntry]));
  };

  const submitExam = (auto = false) => {
    if (!exam || !student || submitted) return;

    const total = exam.questions?.length || 0;
    const answeredCount = Object.keys(answers).length;

    let correctCount = 0;
    exam.questions?.forEach((q, i) => {
      if (answers[i]?.trim().toUpperCase() === q.correct?.trim().toUpperCase()) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / total) * 100);
    setScore(finalScore);
    setSubmitted(true);
    saveReport(finalScore, correctCount, total, answeredCount);

    if (auto) {
      setModal({
        show: true,
        title: "Time is Up!",
        message: "Your exam was automatically submitted. Redirecting...",
        icon: "alert",
        color: "red",
        autoRedirect: true,
      });
    } else {
      setModal({
        show: true,
        title: "Exam Submitted",
        message: `You answered ${answeredCount} of ${total} questions. Score: ${finalScore}%.`,
        icon: "success",
        color: "green",
        autoRedirect: true,
      });
    }

    setTimeout(() => navigate("/dashboard"), 4000);
  };

  const handleAutoSubmit = () => {
    if (!submitted) submitExam(true);
  };
  const handleSubmit = () => submitExam(false);

  // Modal component
  const Modal = () => {
    if (!modal.show) return null;
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm animate-fadeIn">
          {modal.icon === "alert" && <AlertCircle className={`mx-auto mb-3 text-${modal.color}-600`} size={48} />}
          {modal.icon === "success" && <CheckCircle className={`mx-auto mb-3 text-${modal.color}-600`} size={48} />}
          {modal.icon === "info" && <Info className={`mx-auto mb-3 text-${modal.color}-600`} size={48} />}
          <h2 className={`text-2xl font-bold text-${modal.color}-700 mb-2`}>{modal.title}</h2>
          <p className="text-gray-700 mb-4">{modal.message}</p>
          {!modal.autoRedirect && (
            <button
              onClick={() => setModal({ ...modal, show: false })}
              className={`mt-2 bg-${modal.color}-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-${modal.color}-700 transition`}
            >
              OK
            </button>
          )}
        </div>
      </div>
    );
  };

  if (!exam) return <div className="min-h-screen flex items-center justify-center">Loading exam...</div>;

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">
      <Modal />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-sky-700">{exam.subject} Exam ({student?.className})</h1>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock size={20} className="text-yellow-500" />
            <span className="font-semibold">
              Time Left: <span className="text-red-600">{formatTime(timeLeft)}</span>
            </span>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {exam.questions?.length > 0 ? (
            exam.questions.map((q, index) => (
              <div key={index} className="border p-4 rounded-xl shadow-sm hover:shadow transition">
                <p className="font-medium text-gray-800 mb-2">{index + 1}. {q.text}</p>
                {["A","B","C","D"].map((opt) => (
                  <label
                    key={opt}
                    className={`block p-2 border rounded-lg cursor-pointer mb-2 ${answers[index] === opt ? "bg-sky-600 text-white border-sky-600" : "hover:bg-gray-100"}`}
                  >
                    <input type="radio" name={`q-${index}`} value={opt} checked={answers[index] === opt} onChange={() => handleAnswer(index,opt)} className="hidden" />
                    <span className="font-semibold mr-2">{opt}.</span> {q[`option${opt}`]}
                  </label>
                ))}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No questions available.</p>
          )}
        </div>

        {!submitted && (
          <button onClick={handleSubmit} className="mt-6 w-full bg-sky-700 text-white py-3 rounded-lg font-semibold hover:bg-sky-800 transition">
            Submit Exam
          </button>
        )}
      </div>
    </div>
  );
};

export default ExamPage;
