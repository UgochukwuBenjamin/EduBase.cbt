import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Clock,
  ArrowLeft,
  BookOpen,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const defaultSubjects = [
  "English",
  "Mathematics",
  "Biology",
  "Chemistry",
  "Physics",
  "Economics",
  "Government",
  "Civic Education",
  "Computer Studies",
];

const CreateExam = () => {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState(defaultSubjects);
  const [newSubject, setNewSubject] = useState("");
  const [exams, setExams] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [examDetails, setExamDetails] = useState({
    subject: "",
    className: "",
    timer: 0,
    questions: [],
  });

  const [timerH, setTimerH] = useState(0);
  const [timerM, setTimerM] = useState(0);
  const [timerS, setTimerS] = useState(0);

  const [question, setQuestion] = useState({
    text: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correct: "",
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);

  // Load exams & subjects from localStorage
  useEffect(() => {
    const storedExams = JSON.parse(localStorage.getItem("exams")) || [];
    const storedSubjects =
      JSON.parse(localStorage.getItem("subjects")) || defaultSubjects;
    setExams(storedExams);
    setSubjects(storedSubjects);
  }, []);

  // Update timer in seconds
  useEffect(() => {
    setExamDetails((prev) => ({
      ...prev,
      timer: timerH * 3600 + timerM * 60 + timerS,
    }));
  }, [timerH, timerM, timerS]);

  const addNewSubject = () => {
    if (!newSubject.trim()) return alert("Enter a valid subject name.");
    const updated = [...subjects, newSubject.trim()];
    setSubjects(updated);
    localStorage.setItem("subjects", JSON.stringify(updated));
    setNewSubject("");
    alert("New subject added!");
  };

  const addQuestion = () => {
    const { text, optionA, optionB, optionC, optionD, correct } = question;
    if (!text || !optionA || !optionB || !optionC || !optionD || !correct) {
      return alert("Fill all question fields!");
    }

    const updatedQuestions = [...examDetails.questions];
    if (currentQuestionIndex !== null) {
      updatedQuestions[currentQuestionIndex] = question;
    } else {
      updatedQuestions.push(question);
    }

    setExamDetails({ ...examDetails, questions: updatedQuestions });
    setQuestion({ text: "", optionA: "", optionB: "", optionC: "", optionD: "", correct: "" });
    setCurrentQuestionIndex(null);
  };

  const saveExam = () => {
    const { subject, className, timer, questions } = examDetails;
    if (!subject || !className || !timer) return alert("Complete all exam fields!");
    if (questions.length === 0) return alert("Add at least one question!");

    const updatedExams = [...exams];
    if (editingIndex !== null) {
      updatedExams[editingIndex] = examDetails;
      alert("Exam updated!");
    } else {
      updatedExams.push(examDetails);
      alert("Exam created!");
    }

    setExams(updatedExams);
    localStorage.setItem("exams", JSON.stringify(updatedExams));
    setExamDetails({ subject: "", className: "", timer: 0, questions: [] });
    setTimerH(0);
    setTimerM(0);
    setTimerS(0);
    setEditingIndex(null);
  };

  const handleEditExam = (index) => {
    const e = exams[index];
    setExamDetails(e);
    setEditingIndex(index);
    setTimerH(Math.floor(e.timer / 3600));
    setTimerM(Math.floor((e.timer % 3600) / 60));
    setTimerS(e.timer % 60);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteExam = (index) => {
    if (!window.confirm("Delete this exam?")) return;
    const updatedExams = exams.filter((_, i) => i !== index);
    setExams(updatedExams);
    localStorage.setItem("exams", JSON.stringify(updatedExams));
  };

  const handleSelectQuestion = (index) => {
    const q = examDetails.questions[index];
    if (q) {
      setQuestion(q);
    } else {
      setQuestion({ text: "", optionA: "", optionB: "", optionC: "", optionD: "", correct: "" });
    }
    setCurrentQuestionIndex(index);
  };

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
          <BookOpen size={24} /> {editingIndex !== null ? "Edit Exam" : "Create Exam"}
        </h1>
      </div>

      {/* Exam Details */}
      <motion.div
        className="bg-white rounded-2xl shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <PlusCircle className="text-sky-600" /> Exam Details
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <select
            value={examDetails.subject}
            onChange={(e) => setExamDetails({ ...examDetails, subject: e.target.value })}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-sky-600 outline-none w-full"
          >
            <option value="">Select Subject</option>
            {subjects.map((subj, i) => (
              <option key={i} value={subj}>{subj}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Class (e.g. SS1)"
            value={examDetails.className}
            onChange={(e) => setExamDetails({ ...examDetails, className: e.target.value })}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-sky-600 outline-none"
          />

          <div className="flex items-center gap-2 border p-3 rounded-lg focus-within:ring-2 focus-within:ring-sky-600">
            <input type="number" min="0" value={timerH} onChange={e => setTimerH(parseInt(e.target.value)||0)} className="w-14 text-center border rounded-lg p-2 outline-none focus:ring-1 focus:ring-sky-600"/>
            <span>:</span>
            <input type="number" min="0" max="59" value={timerM} onChange={e => setTimerM(parseInt(e.target.value)||0)} className="w-14 text-center border rounded-lg p-2 outline-none focus:ring-1 focus:ring-sky-600"/>
            <span>:</span>
            <input type="number" min="0" max="59" value={timerS} onChange={e => setTimerS(parseInt(e.target.value)||0)} className="w-14 text-center border rounded-lg p-2 outline-none focus:ring-1 focus:ring-sky-600"/>
            <span className="ml-2 text-gray-600">hr:min:sec</span>
          </div>
        </div>

        {/* Add new subject */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Add new subject..."
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none flex-grow"
          />
          <button
            onClick={addNewSubject}
            className="flex items-center gap-2 bg-yellow-400 text-blue-900 px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            <Plus size={18} /> Add
          </button>
        </div>

        {/* Question Form */}
        <div className="border p-6 rounded-xl mb-4">
          <h3 className="font-semibold text-gray-800 mb-3">Add Question</h3>
          <input type="text" placeholder="Question Text" value={question.text} onChange={e=>setQuestion({...question,text:e.target.value})} className="w-full border p-2 rounded-lg mb-2 outline-none"/>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input type="text" placeholder="Option A" value={question.optionA} onChange={e=>setQuestion({...question,optionA:e.target.value})} className="border p-2 rounded-lg outline-none"/>
            <input type="text" placeholder="Option B" value={question.optionB} onChange={e=>setQuestion({...question,optionB:e.target.value})} className="border p-2 rounded-lg outline-none"/>
            <input type="text" placeholder="Option C" value={question.optionC} onChange={e=>setQuestion({...question,optionC:e.target.value})} className="border p-2 rounded-lg outline-none"/>
            <input type="text" placeholder="Option D" value={question.optionD} onChange={e=>setQuestion({...question,optionD:e.target.value})} className="border p-2 rounded-lg outline-none"/>
          </div>
          <input type="text" placeholder="Correct Answer (A/B/C/D)" value={question.correct} onChange={e=>setQuestion({...question,correct:e.target.value.toUpperCase()})} className="border p-2 rounded-lg mb-3 outline-none"/>
          
          {/* Question Number Buttons with filled/empty colors */}
          <div className="flex flex-wrap gap-2 mb-3 max-h-40 overflow-y-auto">
            {Array.from({ length: 100 }, (_, i) => {
              const q = examDetails.questions[i];
              const isSelected = currentQuestionIndex === i;
              const isFilled = q && q.text && q.optionA && q.optionB && q.optionC && q.optionD && q.correct;

              return (
                <button
                  key={i}
                  onClick={() => handleSelectQuestion(i)}
                  className={`px-3 py-1 rounded border text-white
                    ${isSelected ? 'bg-sky-600' : isFilled ? 'bg-green-500' : 'bg-red-500'}
                    hover:brightness-110 transition`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <button onClick={addQuestion} className="bg-sky-700 text-white px-6 py-2 rounded-lg hover:bg-sky-800 transition">
            {currentQuestionIndex !== null ? "Update Question" : "Add Question"}
          </button>
        </div>

        <button onClick={saveExam} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
          {editingIndex !== null ? "Update Exam" : "Save Exam"}
        </button>
      </motion.div>

      {/* Display Exams */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Created Exams</h2>
        {exams.length===0?<p>No exams created yet.</p>:
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((e,i)=>{
            const hrs=Math.floor(e.timer/3600);
            const mins=Math.floor((e.timer%3600)/60);
            const secs=e.timer%60;
            return(
              <div key={i} className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition relative">
                <h3 className="font-bold text-sky-700 mb-1">{e.subject} ({e.className})</h3>
                <p className="text-gray-600 text-sm flex items-center gap-1"><Clock size={14}/> {hrs}h {mins}m {secs}s</p>
                <p className="text-gray-500 text-sm mb-2">{e.questions.length} Questions</p>
                <div className="flex gap-2">
                  <button onClick={()=>handleEditExam(i)} className="text-green-600 flex items-center gap-1"><Edit size={16}/> Edit</button>
                  <button onClick={()=>handleDeleteExam(i)} className="text-red-500 flex items-center gap-1"><Trash2 size={16}/> Delete</button>
                </div>
              </div>
            );
          })}
        </div>}
      </div>
    </div>
  );
};

export default CreateExam;
