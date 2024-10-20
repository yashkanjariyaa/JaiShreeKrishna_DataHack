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
        console.log('post')
        setLoading(true);
        const responseArray = [];

        try {
            for (const endpoint of endpoints) {
                const config = {
                    method: "POST",
                    url: endpoint,
                    headers: {
                        'Content-type': 'application/json'
                    },
                    data: {
                        "forecast_steps": inputData
                    }
                };

                const response = await axios(config);
                responseArray.push({ endpoint, data: response.data });
            }
            console.log(responseArray)
            setResponses(responseArray);
        } catch (error) {
            console.error('Error posting to endpoints:', error);
            setResponses([{ endpoint: 'Error', data: 'An error occurred' }]);
        } finally {
            setLoading(false);
        }
    };

    const createChartData = () => {
        const labels = Array.from({ length: 10 }, (_, i) => `Day ${i + 1}`);
        const datasets = responses.map((res, index) => ({
            label: res.endpoint.split('/').pop(),
            data: res.data.forecast || res.data.predicted_kot || [],
            borderColor: index === 0 ? 'rgba(255, 99, 132, 1)' : index === 1 ? 'rgba(54, 162, 235, 1)' : 'rgba(75, 192, 192, 1)',
            backgroundColor: index === 0 ? 'rgba(255, 99, 132, 0.2)' : index === 1 ? 'rgba(54, 162, 235, 0.2)' : 'rgba(75, 192, 192, 0.2)',
            fill: true,
        }));

        return {
            labels,
            datasets,
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Disable default aspect ratio
    };

    return (
        <div style={{ padding: '20px', height: '100%' }}> {/* Set a fixed height for the outer div */}
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
                    <div style={{ marginTop: '30px', height: '100%' }}> {/* Allow the chart div to take full height */}
                        <h3>Forecast Graphs:</h3>
                        <div style={{ position: 'relative', height: '100%', width: "100%" }}> {/* Ensure relative positioning for the chart */}
                            <Line data={createChartData()} options={chartOptions} style={{ height: '100%', width: '100%' }} />
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Model;
