import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import DisplayInfo from "./components/DisplayInfo";
import Dashboard2 from "./components/Dashboard2";
import TableauDashboard from "./components/TableauDashboard";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <nav style={{ marginBottom: '20px', backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
          <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', gap: '15px' }}>
            <li>
              <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
            </li>
            <li>
              <Link to="/file-upload" style={{ textDecoration: 'none', color: '#333' }}>File Upload</Link>
            </li>
            <li>
              <Link to="/info1" style={{ textDecoration: 'none', color: '#333' }}>Forecasting</Link>
            </li>
            <li>
              <Link to="/info2" style={{ textDecoration: 'none', color: '#333' }}>Anomaly</Link>
            </li>
            <li>
              <Link to="/tableau" style={{ textDecoration: 'none', color: '#333' }}>Dashboard</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/file-upload" element={<FileUpload />} />
          <Route path="/info1" element={<DisplayInfo />} />
          <Route path="/info2" element={<Dashboard2 />} />
          <Route path="/tableau" element={<TableauDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
