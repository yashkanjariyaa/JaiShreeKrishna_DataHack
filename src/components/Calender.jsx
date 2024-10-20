import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles

const holidays = {
    Hinduism: {
        2023: [
            { start: new Date(2023, 0, 14), end: new Date(2023, 0, 14), name: 'Makar Sankranti' },
            { start: new Date(2023, 2, 8), end: new Date(2023, 2, 8), name: 'Holi' },
            { start: new Date(2023, 3, 22), end: new Date(2023, 3, 22), name: 'Akshaya Tritiya' },
            { start: new Date(2023, 6, 3), end: new Date(2023, 6, 3), name: 'Guru Purnima' },
            { start: new Date(2023, 8, 15), end: new Date(2023, 8, 24), name: 'Navratri' },
            { start: new Date(2023, 8, 25), end: new Date(2023, 8, 25), name: 'Dussehra' },
            { start: new Date(2023, 10, 12), end: new Date(2023, 10, 15), name: 'Diwali' },
        ],
        2024: [
            { start: new Date(2024, 0, 14), end: new Date(2024, 0, 14), name: 'Makar Sankranti' },
            { start: new Date(2024, 2, 25), end: new Date(2024, 2, 25), name: 'Holi' },
            { start: new Date(2024, 3, 30), end: new Date(2024, 3, 30), name: 'Akshaya Tritiya' },
            { start: new Date(2024, 6, 4), end: new Date(2024, 6, 4), name: 'Guru Purnima' },
            { start: new Date(2024, 8, 15), end: new Date(2024, 8, 24), name: 'Navratri' },
            { start: new Date(2024, 8, 25), end: new Date(2024, 8, 25), name: 'Dussehra' },
            { start: new Date(2024, 10, 12), end: new Date(2024, 10, 15), name: 'Diwali' },
        ],
        2025: [
            { start: new Date(2025, 0, 14), end: new Date(2025, 0, 14), name: 'Makar Sankranti' },
            { start: new Date(2025, 2, 13), end: new Date(2025, 2, 13), name: 'Holi' },
            { start: new Date(2025, 3, 10), end: new Date(2025, 3, 10), name: 'Akshaya Tritiya' },
            { start: new Date(2025, 6, 21), end: new Date(2025, 6, 21), name: 'Guru Purnima' },
            { start: new Date(2025, 8, 15), end: new Date(2025, 8, 24), name: 'Navratri' },
            { start: new Date(2025, 8, 25), end: new Date(2025, 8, 25), name: 'Dussehra' },
            { start: new Date(2025, 10, 1), end: new Date(2025, 10, 4), name: 'Diwali' },
        ],
    },
    Islam: {
        2023: [
            { start: new Date(2023, 3, 21), end: new Date(2023, 3, 22), name: 'Eid al-Fitr' },
            { start: new Date(2023, 5, 28), end: new Date(2023, 5, 29), name: 'Eid al-Adha' },
        ],
        2024: [
            { start: new Date(2024, 3, 10), end: new Date(2024, 3, 11), name: 'Eid al-Fitr' },
            { start: new Date(2024, 5, 29), end: new Date(2024, 5, 30), name: 'Eid al-Adha' },
        ],
        2025: [
            { start: new Date(2025, 2, 30), end: new Date(2025, 2, 31), name: 'Eid al-Fitr' },
            { start: new Date(2025, 5, 17), end: new Date(2025, 5, 18), name: 'Eid al-Adha' },
        ],
    },
    Christianity: {
        2023: [
            { start: new Date(2023, 11, 24), end: new Date(2023, 11, 26), name: 'Christmas' },
            { start: new Date(2023, 3, 9), end: new Date(2023, 3, 9), name: 'Easter' },
        ],
        2024: [
            { start: new Date(2024, 11, 24), end: new Date(2024, 11, 26), name: 'Christmas' },
            { start: new Date(2024, 3, 31), end: new Date(2024, 3, 31), name: 'Easter' },
        ],
        2025: [
            { start: new Date(2025, 11, 24), end: new Date(2025, 11, 26), name: 'Christmas' },
            { start: new Date(2025, 3, 20), end: new Date(2025, 3, 20), name: 'Easter' },
        ],
    },
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
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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
        setSelectedDate(normalizedDate);

        let eventFound = false;

        // Find the holiday event name if available
        for (const [religion, events] of Object.entries(holidays)) {
            const yearEvents = events[selectedYear]; // Get events for selected year
            for (const event of yearEvents) {
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

    const tileClassName = ({ date, view }) => {
        // Highlight holidays
        const normalizedDate = normalizeDate(date);
        let isHoliday = false;

        for (const [religion, events] of Object.entries(holidays)) {
            const yearEvents = events[selectedYear]; // Get events for selected year
            for (const event of yearEvents) {
                if (
                    normalizedDate >= normalizeDate(event.start) &&
                    normalizedDate <= normalizeDate(event.end)
                ) {
                    isHoliday = true;
                    break;
                }
            }
            if (isHoliday) break;
        }

        return isHoliday ? 'holiday' : null;
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Custom Calendar</h1>
            <select onChange={(e) => setSelectedYear(Number(e.target.value))} value={selectedYear} className="mb-4 p-2 border rounded">
                {Object.keys(holidays.Hinduism).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <Calendar
                onClickDay={handleTileClick}
                tileClassName={tileClassName}
            />
            <div className="mt-4">
                {eventName && <h2 className="text-xl font-semibold">Event: {eventName}</h2>}
                {noDataMessage && <p className="text-red-500">{noDataMessage}</p>}
                <h3 className="mt-2">Sales Data:</h3>
                <p>Zomato: {salesInfo.zomato}</p>
                <p>Swiggy: {salesInfo.swiggy}</p>
                <p>KOT: {salesInfo.kot}</p>
            </div>
        </div>
    );
};

export default CustomCalendar;
