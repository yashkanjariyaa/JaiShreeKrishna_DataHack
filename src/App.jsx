import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FileUpload from './components/FileUpload'; 
import DisplayInfo from './components/DisplayInfo';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        {/* <nav style={{ marginBottom: '20px', backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
          <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', gap: '15px' }}>
            <li>
              <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
            </li>
            <li>
              <Link to="/file-upload" style={{ textDecoration: 'none', color: '#333' }}>File Upload</Link>
            </li>
            <li>
              <Link to="/calendar" style={{ textDecoration: 'none', color: '#333' }}>Calendar</Link>
            </li>
            <li>
              <Link to="/model" style={{ textDecoration: 'none', color: '#333' }}>Model</Link>
            </li>
          </ul>
        </nav> */}

        <Routes>
          <Route path="/" element={<h2>Welcome to the App</h2>} />
          <Route path="/file-upload" element={<FileUpload />} />
          <Route path="/info" element={<DisplayInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
