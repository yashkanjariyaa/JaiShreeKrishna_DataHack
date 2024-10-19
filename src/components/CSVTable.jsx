// src/components/CSVTable.jsx
import React from 'react';

const CSVTable = ({ filename, data }) => {
    if (!data || data.length === 0) return null; // Return nothing if there's no data

    const headers = Object.keys(data[0]);

    return (
        <div className="overflow-x-auto mt-8 w-full max-w-4xl">
            <h2 className="text-2xl font-semibold mb-4 text-center">{filename}</h2>
            <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-800">
                        {headers.map((header, idx) => (
                            <th
                                key={idx}
                                className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={
                                rowIndex % 2 === 0
                                    ? 'bg-white dark:bg-gray-700'
                                    : 'bg-gray-50 dark:bg-gray-800'
                            }
                        >
                            {Object.values(row).map((value, idx) => (
                                <td
                                    key={idx}
                                    className="border border-gray-300 dark:border-gray-600 px-4 py-2"
                                >
                                    {value || 'N/A'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CSVTable;
