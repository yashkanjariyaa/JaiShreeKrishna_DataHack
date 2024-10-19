// FileUpload.jsx
import React, { useState } from 'react';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false); // State for theme toggle

    const handleFileChange = (event) => {
        setFiles(Array.from(event.target.files));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (files.length === 0) {
            setError('Please select at least one file.');
            return;
        }

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`file_${index}`, file);
        });

        try {
            const res = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setResponse(data);
                setError(null);
            } else {
                const errorData = await res.json();
                setError(errorData.message || 'Error uploading files');
                setResponse(null);
            }
        } catch (err) {
            setError('Network error: ' + err.message);
            setResponse(null);
        }
    };

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-500`}>
            <header className="flex justify-between items-center p-5 shadow-md">
                <h1 className="text-3xl font-bold">Upload CSV Files</h1>
                <button
                    className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                    onClick={toggleTheme}
                >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </header>

            <main className="flex flex-col items-center justify-center p-10">
                <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
                    <label className="block text-lg font-medium mb-2">
                        Select CSV Files:
                    </label>
                    <input
                        type="file"
                        accept=".csv"
                        multiple
                        onChange={handleFileChange}
                        className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 mt-2 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 transition"
                    >
                        Upload
                    </button>
                </form>

                {response && (
                    <div className="mt-5 p-4 w-full max-w-lg bg-green-100 text-green-800 rounded-lg shadow-md dark:bg-green-900 dark:text-green-200">
                        <h2 className="text-lg font-semibold">Response:</h2>
                        <pre>{JSON.stringify(response, null, 2)}</pre>
                    </div>
                )}

                {error && (
                    <div className="mt-5 p-4 w-full max-w-lg bg-red-100 text-red-800 rounded-lg shadow-md dark:bg-red-900 dark:text-red-200">
                        <h2 className="text-lg font-semibold">Error:</h2>
                        <p>{error}</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default FileUpload;
