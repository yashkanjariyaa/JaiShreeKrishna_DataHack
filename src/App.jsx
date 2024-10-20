import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUpload from "./components/FileUpload"; // Ensure the path is correct
import CustomCalendar from "./components/Calender";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/calendar" element={<CustomCalendar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
