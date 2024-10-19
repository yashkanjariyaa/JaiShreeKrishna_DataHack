import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles

const holidays = {
    Hinduism: [
        { start: new Date(2024, 0, 14), end: new Date(2024, 0, 14), name: 'Makar Sankranti' },
        { start: new Date(2024, 2, 25), end: new Date(2024, 2, 25), name: 'Holi' },
        { start: new Date(2024, 3, 30), end: new Date(2024, 3, 30), name: 'Akshaya Tritiya' },
        { start: new Date(2024, 6, 4), end: new Date(2024, 6, 4), name: 'Guru Purnima' },
        { start: new Date(2024, 8, 15), end: new Date(2024, 8, 24), name: 'Navratri' },
        { start: new Date(2024, 8, 25), end: new Date(2024, 8, 25), name: 'Dussehra' },
        { start: new Date(2024, 10, 12), end: new Date(2024, 10, 15), name: 'Diwali' },
    ],
    Islam: [
        { start: new Date(2024, 3, 10), end: new Date(2024, 3, 11), name: 'Eid al-Fitr' },
        { start: new Date(2024, 5, 29), end: new Date(2024, 5, 30), name: 'Eid al-Adha' },
    ],
    Christianity: [
        { start: new Date(2024, 11, 24), end: new Date(2024, 11, 26), name: 'Christmas' },
        { start: new Date(2024, 3, 31), end: new Date(2024, 3, 31), name: 'Easter' },
    ]
};

const salesData = {
    "2024-01-14": { zomato: 150, swiggy: 200, kot: 180 },
    "2024-01-29": { zomato: 155, swiggy: 205, kot: 190 },
    "2024-10-15": { zomato: 170, swiggy: 225, kot: 200 },
};

const CustomCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventName, setEventName] = useState('');
    const [salesInfo, setSalesInfo] = useState({ zomato: 0, swiggy: 0, kot: 0 });
    const [noDataMessage, setNoDataMessage] = useState('');

    // Helper function to normalize dates to midnight
    const normalizeDate = (date) => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0); // Set time to midnight
        return newDate;
    };
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
    };

    const handleTileClick = (date) => {
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
            setEventName('');
        }

        // Format the date correctly
        const dateString = formatDate(normalizedDate);
        console.log("Formatted Date String:", dateString);

        // Check for sales data
        const sales = salesData[dateString];

        if (sales) {
            setSalesInfo(sales);
            setNoDataMessage('');
        } else {
            setSalesInfo({ zomato: 0, swiggy: 0, kot: 0 });
            setNoDataMessage('No sales data available for this date.');
        }
    };


    const tileClassName = ({ date }) => {
        for (const [religion, events] of Object.entries(holidays)) {
            for (const event of events) {
                if (date >= event.start && date <= event.end) {
                    return 'bg-yellow-400 rounded-full'; // Highlight the event dates
                }
            }
        }
        return null;
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <Calendar
                onClickDay={handleTileClick}
                tileClassName={tileClassName}
                value={selectedDate}
            />
            <div className="mt-4">
                <h2 className="text-lg font-bold">Selected Date: {selectedDate.toDateString()}</h2>
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
    );
};

export default CustomCalendar;
