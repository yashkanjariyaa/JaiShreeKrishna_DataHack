import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles
import Model from "./models";

const holidays = {
    Hinduism: [
        // 2023 Holidays
        {
            start: new Date(2023, 0, 14),
            end: new Date(2023, 0, 14),
            name: "Makar Sankranti",
        },
        { start: new Date(2023, 2, 8), end: new Date(2023, 2, 8), name: "Holi" }, // Holi was on March 8 in 2023
        {
            start: new Date(2023, 3, 30),
            end: new Date(2023, 3, 30),
            name: "Akshaya Tritiya",
        },
        {
            start: new Date(2023, 6, 4),
            end: new Date(2023, 6, 4),
            name: "Guru Purnima",
        },
        {
            start: new Date(2023, 8, 15),
            end: new Date(2023, 8, 24),
            name: "Navratri",
        },
        {
            start: new Date(2023, 8, 25),
            end: new Date(2023, 8, 25),
            name: "Dussehra",
        },
        {
            start: new Date(2023, 10, 12),
            end: new Date(2023, 10, 15),
            name: "Diwali",
        },

        // 2024 Holidays
        {
            start: new Date(2024, 0, 14),
            end: new Date(2024, 0, 14),
            name: "Makar Sankranti",
        },
        { start: new Date(2024, 2, 25), end: new Date(2024, 2, 25), name: "Holi" },
        {
            start: new Date(2024, 3, 30),
            end: new Date(2024, 3, 30),
            name: "Akshaya Tritiya",
        },
        {
            start: new Date(2024, 6, 4),
            end: new Date(2024, 6, 4),
            name: "Guru Purnima",
        },
        {
            start: new Date(2024, 8, 15),
            end: new Date(2024, 8, 24),
            name: "Navratri",
        },
        {
            start: new Date(2024, 8, 25),
            end: new Date(2024, 8, 25),
            name: "Dussehra",
        },
        {
            start: new Date(2024, 10, 12),
            end: new Date(2024, 10, 15),
            name: "Diwali",
        },

        // 2025 Holidays
        {
            start: new Date(2025, 0, 14),
            end: new Date(2025, 0, 14),
            name: "Makar Sankranti",
        },
        { start: new Date(2025, 2, 13), end: new Date(2025, 2, 13), name: "Holi" }, // Holi will be on March 13 in 2025
        {
            start: new Date(2025, 3, 30),
            end: new Date(2025, 3, 30),
            name: "Akshaya Tritiya",
        },
        {
            start: new Date(2025, 6, 4),
            end: new Date(2025, 6, 4),
            name: "Guru Purnima",
        },
        {
            start: new Date(2025, 8, 15),
            end: new Date(2025, 8, 24),
            name: "Navratri",
        },
        {
            start: new Date(2025, 8, 25),
            end: new Date(2025, 8, 25),
            name: "Dussehra",
        },
        {
            start: new Date(2025, 10, 12),
            end: new Date(2025, 10, 15),
            name: "Diwali",
        },
    ],
    Islam: [
        {
            start: new Date(2024, 3, 10),
            end: new Date(2024, 3, 11),
            name: "Eid al-Fitr",
        },
        {
            start: new Date(2024, 5, 29),
            end: new Date(2024, 5, 30),
            name: "Eid al-Adha",
        },
        // 2023 Holidays
        {
            start: new Date(2023, 3, 21),
            end: new Date(2023, 3, 21),
            name: "Eid al-Fitr",
        }, // Eid al-Fitr was on April 21 in 2023
        {
            start: new Date(2023, 5, 28),
            end: new Date(2023, 5, 29),
            name: "Eid al-Adha",
        }, // Eid al-Adha was on June 28 in 2023

        // 2025 Holidays
        {
            start: new Date(2025, 3, 9),
            end: new Date(2025, 3, 10),
            name: "Eid al-Fitr",
        }, // Eid al-Fitr will be on April 9 in 2025
        {
            start: new Date(2025, 5, 17),
            end: new Date(2025, 5, 18),
            name: "Eid al-Adha",
        }, // Eid al-Adha will be on June 17 in 2025
    ],
    Christianity: [
        // 2023 Holidays
        {
            start: new Date(2023, 11, 24),
            end: new Date(2023, 11, 26),
            name: "Christmas",
        },
        { start: new Date(2023, 3, 9), end: new Date(2023, 3, 9), name: "Easter" }, // Easter was on April 9 in 2023

        // 2024 Holidays
        {
            start: new Date(2024, 11, 24),
            end: new Date(2024, 11, 26),
            name: "Christmas",
        },
        {
            start: new Date(2024, 3, 31),
            end: new Date(2024, 3, 31),
            name: "Easter",
        },

        // 2025 Holidays
        {
            start: new Date(2025, 11, 24),
            end: new Date(2025, 11, 26),
            name: "Christmas",
        },
        {
            start: new Date(2025, 3, 20),
            end: new Date(2025, 3, 20),
            name: "Easter",
        }, // Easter will be on April 20 in 2025
    ],
    Jainism: [
        // 2023 Holidays
        {
            start: new Date(2023, 0, 1),
            end: new Date(2023, 0, 1),
            name: "New Year",
        },
        {
            start: new Date(2023, 9, 14),
            end: new Date(2023, 9, 14),
            name: "Paryushana",
        },
        {
            start: new Date(2023, 10, 23),
            end: new Date(2023, 10, 23),
            name: "Diwali",
        },

        // 2024 Holidays
        {
            start: new Date(2024, 0, 1),
            end: new Date(2024, 0, 1),
            name: "New Year",
        },
        {
            start: new Date(2024, 9, 2),
            end: new Date(2024, 9, 2),
            name: "Paryushana",
        },
        {
            start: new Date(2024, 10, 11),
            end: new Date(2024, 10, 11),
            name: "Diwali",
        },

        // 2025 Holidays
        {
            start: new Date(2025, 0, 1),
            end: new Date(2025, 0, 1),
            name: "New Year",
        },
        {
            start: new Date(2025, 9, 21),
            end: new Date(2025, 9, 21),
            name: "Paryushana",
        },
        {
            start: new Date(2025, 10, 1),
            end: new Date(2025, 10, 1),
            name: "Diwali",
        },
    ],
};

const salesData = {
    "2024-01-14": { zomato: 150, swiggy: 200, kot: 180 },
    "2024-01-29": { zomato: 155, swiggy: 205, kot: 190 },
    "2024-10-15": { zomato: 170, swiggy: 225, kot: 200 },
};

function generateDummyData(startDate, endDate) {
    let date = new Date(startDate);
    const end = new Date(endDate);
    const randomInt = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    while (date <= end) {
        const formattedDate = date.toISOString().slice(0, 10);
        salesData[formattedDate] = {
            zomato: randomInt(140, 180),
            swiggy: randomInt(190, 240),
            kot: randomInt(170, 210),
        };
        date.setDate(date.getDate() + 1);
    }
}

generateDummyData("2024-06-01", "2024-10-19");

const CustomCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventName, setEventName] = useState("");
    const [salesInfo, setSalesInfo] = useState({ zomato: 0, swiggy: 0, kot: 0 });
    const [noDataMessage, setNoDataMessage] = useState("");

    // Helper function to normalize dates to midnight
    const normalizeDate = (date) => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0); // Set time to midnight
        return newDate;
    };
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
    };

    const handleTileClick = async (date) => {
        const normalizedDate = normalizeDate(date); // Normalize clicked date
        console.log("Normalized Date:", normalizedDate);
        setSelectedDate(normalizedDate);

        let eventFound = false;

        // Find the holiday event name if available
        for (const [religion, events] of Object.entries(holidays)) {
            for (const event of events) {
                if (
                    normalizedDate >= normalizeDate(event.start) &&
                    normalizedDate <= normalizeDate(event.end)
                ) {
                    setEventName(event.name);
                    eventFound = true;
                    break;
                }
            }
            if (eventFound) break;
        }

        if (!eventFound) {
            setEventName("");
        }

        // Format the date correctly
        const dateString = formatDate(normalizedDate);
        console.log("Formatted Date String:", dateString);

        // Check for sales data from CSVs
        const sales = salesData[dateString] || (await getSalesData(dateString));
        console.log("Sales Data:", sales);

        if (sales) {
            setSalesInfo(sales);
            setNoDataMessage("");
        } else {
            setSalesInfo({ zomato: 0, swiggy: 0, kot: 0 });
            setNoDataMessage("No sales data available for this date.");
        }
    };

    // Helper function to load CSVs and count occurrences
    const getSalesData = async (date) => {
        try {
            // Import CSV data using dynamic imports
            const [zomatoData, swiggyData, kotData] = await Promise.all([
                import("../constant/zomato.csv"),
                import("../constant/swiggy.csv"),
                import("../constant/kot.csv"),
            ]);

            // Log the raw data to check if it is imported correctly
            console.log("Zomato Data:", zomatoData.default);
            console.log("Swiggy Data:", swiggyData.default);
            console.log("KOT Data:", kotData.default);

            // Parse CSVs - ensure that parseCSV is handling the data as expected
            const zomatoRows = parseCSV(zomatoData.default, "Date_z", date);
            const swiggyRows = parseCSV(swiggyData.default, "Date_s", date);
            const kotRows = parseCSV(kotData.default, "Prepared_Time_k", date);

            // Return counts
            return {
                zomato: zomatoRows.length,
                swiggy: swiggyRows.length,
                kot: kotRows.length,
            };
        } catch (error) {
            console.error("Error fetching sales data:", error);
            return null;
        }
    };

    const parseCSV = (csvData, dateColumn, targetDate) => {
        const rows = csvData.split("\n").slice(1); // Skip header row
        return rows.filter((row) => {
            const columns = row.split(","); // Adjust for actual delimiter if needed
            const dateTime = columns[dateColumn];
            const rowDate = parseDate(dateTime); // Use a safe date parsing function

            return rowDate === targetDate; // Compare with target date
        });
    };

    // Helper function to safely parse date and return only the date part (YYYY-MM-DD)
    const parseDate = (dateTime) => {
        try {
            const date = new Date(dateTime);
            if (isNaN(date.getTime())) {
                // Invalid date
                return null;
            }
            return date.toISOString().split("T")[0]; // Return the date part in YYYY-MM-DD format
        } catch (error) {
            console.error("Invalid date format:", dateTime);
            return null;
        }
    };

    const tileClassName = ({ date }) => {
        for (const [religion, events] of Object.entries(holidays)) {
            for (const event of events) {
                if (date >= event.start && date <= event.end) {
                    return "bg-yellow-400 rounded-full"; // Highlight the event dates
                }
            }
        }
        return null;
    };
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    return (

        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-teal-300' : 'bg-gray-100 text-gray-900'}`}>
            <header className="flex justify-between items-center p-5 shadow-md bg-white dark:bg-gray-800">
                <h1 className="text-3xl font-bold">Forcating Based on Historical Data</h1>
                <button
                    onClick={toggleTheme}
                    className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-purple-600' : 'bg-blue-500'} text-white`}
                >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </header>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center", // Center content vertically
                    alignItems: "center", // Center content horizontally
                    height: "100vh", // Full height of the viewport
                }}
            >
                <div style={{ padding: "100px" }}>
                    <Calendar
                        onClickDay={handleTileClick}
                        tileClassName={tileClassName}
                        value={selectedDate}
                    />
                    <div className="mt-4">
                        <h2 className="text-lg font-bold">
                            Selected Date: {selectedDate.toDateString()}
                        </h2>
                        {eventName && <p className="text-md">Event: {eventName}</p>}
                        <h3 className="text-md font-bold">Sales Data:</h3>
                        <ul>
                            <li>Zomato: {salesInfo.zomato}</li>
                            <li>Swiggy: {salesInfo.swiggy}</li>
                            <li>KOT: {salesInfo.kot}</li>
                        </ul>
                        {noDataMessage && <p className="text-red-500">{noDataMessage}</p>}
                    </div>
                </div>
                {/* Add the Model component below the existing div */}
                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: "1rem",
                        marginTop: "1rem", // Optional margin for spacing
                        maxHeight: "400px"
                    }}
                >
                    <Model />
                </div>
            </div>
        </div>
    );
};

export default CustomCalendar;
