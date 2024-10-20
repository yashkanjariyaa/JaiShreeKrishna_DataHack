import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Model = () => {
    const [inputData, setInputData] = useState('');
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);

    const endpoints = [
        'https://ailearnserver.onrender.com/kot-predict',
        'https://ailearnserver.onrender.com/sales-predict',
        'https://ailearnserver.onrender.com/inventory-predict',
    ];

    const handleInputChange = (e) => {
        setInputData(e.target.value);
    };

    const postDataToAllEndpoints = async () => {
        console.log('post');
        setLoading(true);
        const responseArray = [];

        try {
            for (const endpoint of endpoints) {
                const config = {
                    method: 'POST',
                    url: endpoint,
                    headers: {
                        'Content-type': 'application/json',
                    },
                    data: {
                        forecast_steps: inputData,
                    },
                };

                const response = await axios(config);
                responseArray.push({ endpoint, data: response.data });
            }
            console.log(responseArray);
            setResponses(responseArray);
        } catch (error) {
            console.error('Error posting to endpoints:', error);
            setResponses([{ endpoint: 'Error', data: 'An error occurred' }]);
        } finally {
            setLoading(false);
        }
    };

    const createChartData = (data, label) => {
        const labels = Array.from({ length: data.length }, (_, i) => `Day ${i + 1}`);
        return {
            labels,
            datasets: [
                {
                    label,
                    data,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true,
                },
            ],
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ padding: '20px', height: '100%' }}>
            <h2>Post Data to API Endpoints and Display Responses</h2>
            <input
                type="text"
                value={inputData}
                onChange={handleInputChange}
                placeholder="Enter forecast steps"
                style={{ padding: '8px', marginBottom: '10px', width: '300px' }}
            />
            <button onClick={postDataToAllEndpoints} style={{ padding: '8px 12px', marginLeft: '10px' }}>
                Submit
            </button>

            {loading ? (
                <p>Loading...</p>
            ) : (
                responses.length > 0 && (
                    <div style={{ marginTop: '30px' }}>
                        <h3>Forecast Graphs:</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                            {responses.map((res, index) => (
                                <div
                                    key={index}
                                    style={{ width: '30%', height: '300px', marginBottom: '20px' }}
                                >
                                    <h4>{res.endpoint.split('/').pop()}</h4>
                                    <Line
                                        data={createChartData(
                                            res.data.forecast || res.data.predicted_kot || [],
                                            res.endpoint.split('/').pop()
                                        )}
                                        options={chartOptions}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Model;
