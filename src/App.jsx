import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FormComponents from "./components/Form";
import "./app.css"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Halaman utama */}
        <Route path="/add-user" element={<FormComponents />} /> {/* Halaman form */}
      </Routes>
    </Router>
  );
};

export default App;
