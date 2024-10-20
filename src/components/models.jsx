// Model.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Model = () => {
  const [inputData, setInputData] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const endpoints = [
    'https://ailearnserver.onrender.com/kot-predict',  // Using the proxy to avoid CORS issues
    'https://ailearnserver.onrender.com/sales-predict',
    'https://ailearnserver.onrender.com/inventory-predict',
  ];

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const postDataToAllEndpoints = async () => {
    setLoading(true);
    const responseArray = [];

    try {
      for (const endpoint of endpoints) {
        const response = await axios.post(endpoint, { forecast_steps: inputData });
        responseArray.push({ endpoint, data: response.data });
      }
      setResponses(responseArray); // Store all responses in state
    } catch (error) {
      console.error('Error posting to endpoints:', error);
      setResponses([{ endpoint: 'Error', data: 'An error occurred' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Post Data to API Endpoints and Display Responses</h2>
      <input
        type="text"
        value={inputData}
        onChange={handleInputChange}
        placeholder="Enter some data"
        style={{ padding: '8px', marginBottom: '10px', width: '300px' }}
      />
      <button onClick={postDataToAllEndpoints} style={{ padding: '8px 12px', marginLeft: '10px' }}>
        Submit
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        responses.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3>API Responses:</h3>
            {responses.map((res, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <strong>Endpoint:</strong> {res.endpoint}
                <pre>{JSON.stringify(res.data, null, 2)}</pre>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Model;
