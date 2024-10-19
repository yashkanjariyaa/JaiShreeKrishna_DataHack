import React, { useState } from 'react';
// import CustomCalendar from './CustomCalendar'; // Ensure this component is imported

const ReligionType = () => {
    const [religionConfirmed, setReligionConfirmed] = useState('');
    const [selectedReligions, setSelectedReligions] = useState([]);
    const [establishmentType, setEstablishmentType] = useState('');
    const [error, setError] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false); // Add state for showing calendar
    const [reason, setReason] = useState(''); // Add state for reason if applicable

    const handleSubmit = (event) => {
        event.preventDefault();
        // Adjusted error handling
        if (!religionConfirmed || !establishmentType || (religionConfirmed === 'No' && selectedReligions.length === 0)) {
            setError('Please fill all the required fields.');
            return;
        }
        setError(null);
        console.log('Submitted Data:', { religionConfirmed, establishmentType, selectedReligions });
        setShowCalendar(true); // Show the calendar on submit
    };

    const handleReligionChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setSelectedReligions((prev) => [...prev, value]);
        } else {
            setSelectedReligions((prev) => prev.filter((religion) => religion !== value));
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Select Your Preferences</h2>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
                {/* Religion Confirmation Radio Buttons */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">
                        Is the religion mentioned in the locality true?
                    </label>
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="Yes"
                                checked={religionConfirmed === 'Yes'}
                                onChange={(e) => setReligionConfirmed(e.target.value)}
                                className="mr-2"
                            />
                            Yes
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="No"
                                checked={religionConfirmed === 'No'}
                                onChange={(e) => setReligionConfirmed(e.target.value)}
                                className="mr-2"
                            />
                            No
                        </label>
                    </div>
                </div>

                {/* Conditional Checkboxes if "No" is selected */}
                {religionConfirmed === 'No' && (
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Choose the dominant religion(s):</label>
                        <div className="flex flex-col space-y-2">
                            {['Hinduism', 'Islam', 'Christian', 'Jainism', 'Other'].map((religion) => (
                                <label key={religion} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={religion}
                                        checked={selectedReligions.includes(religion)}
                                        onChange={handleReligionChange}
                                        className="mr-2"
                                    />
                                    {religion}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Establishment Type Radio Buttons */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">Select the type</label>
                    <div className="flex space-x-4">
                        {['Cafe', 'Restaurant', 'Bar', 'Hotel'].map((type) => (
                            <label key={type} className="flex items-center">
                                <input
                                    type="radio"
                                    value={type}
                                    checked={establishmentType === type}
                                    onChange={(e) => setEstablishmentType(e.target.value)}
                                    className="mr-2"
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                >
                    Submit
                </button>
            </form>

            {showCalendar && <CustomCalendar />}
        </div>
    );
};

export default ReligionType;
