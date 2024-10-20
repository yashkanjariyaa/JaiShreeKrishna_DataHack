import React, { useState, useEffect } from 'react';
import InventoryImage from './Inventory.jpg'; // Import your images
import SalesImage from './Sales.jpg';

const Dashboard2 = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [images, setImages] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [question, setQuestion] = useState('');
  const geminiApiKey = 'AIzaSyCLVFGlzlD38y9oiMSlKCm1hUuA-Ln_RT8'; // Replace with your actual API key

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Load specific images for analysis
  const loadImages = () => {
    const loadedImages = [InventoryImage, SalesImage];
    setImages(loadedImages);
  };

  const analyzeImages = async () => {
    if (images.length === 0) {
      console.error('No images to analyze');
      return;
    }

    try {
      const formData = new FormData();
      images.forEach(image => formData.append('images', image)); // Use image blob if required

      const response = await fetch('https://api.gemini.com/v1/analyze_images', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${geminiApiKey}`, // Uncomment and replace with your API key
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisResult(data);
      } else {
        console.error('Error fetching analysis data:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleQuestionSubmit = () => {
    // Handle question submission for further analysis
    console.log("Question submitted: ", question);
    // You can add logic here to send the question to your API for further analysis
  };

  useEffect(() => {
    loadImages(); // Automatically load images on component mount
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-teal-300' : 'bg-gray-100 text-gray-900'}`}>
      <header className="flex justify-between items-center p-5 shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold">AI Prop in Dashboard</h1>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-purple-600' : 'bg-blue-500'} text-white`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <main className="m-0 p-5">
        <button
          onClick={analyzeImages}
          className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-purple-600' : 'bg-blue-500'} text-white`}
        >
          Analyze Images
        </button>

        {images.length > 0 && (
          <div className="mt-4 flex flex-col items-center">
            <h2 className="text-2xl mb-2">Graphs</h2>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Graph ${index + 1}`}
                className="mb-4 border rounded-md shadow-md"
                style={{ maxWidth: '600px', width: '100%' }}
              />
            ))}
          </div>
        )}

        {analysisResult && (
          <div className="mt-4">
            <h2 className="text-2xl">Analysis Result</h2>
            <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
          </div>
        )}

        <div className="mt-4">
          <input
            type="text"
            placeholder="Ask a question about the analysis..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border rounded-md p-2 mr-2"
          />
          <button
            onClick={handleQuestionSubmit}
            className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-purple-600' : 'bg-blue-500'} text-white`}
          >
            Submit Question
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard2;
