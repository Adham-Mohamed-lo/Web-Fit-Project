document.addEventListener('DOMContentLoaded', function() {
    const scheduleData = [
        { day: 'Monday', morning: { time: '9:00 AM - 10:30 AM', activity: 'Zumba Fitness' }, afternoon: null, evening: { time: '6:00 PM - 7:30 PM', activity: 'Zumba Toning' } },
        { day: 'Tuesday', morning: { time: '10:00 AM - 11:30 AM', activity: 'Zumba Gold' }, afternoon: { time: '4:00 PM - 5:30 PM', activity: 'Zumba Fitness' }, evening: null },
        { day: 'Wednesday', morning: { time: '9:00 AM - 10:30 AM', activity: 'Zumba Fitness' }, afternoon: null, evening: { time: '6:00 PM - 7:30 PM', activity: 'Zumba Gold' } },
        { day: 'Thursday', morning: { time: '10:00 AM - 11:30 AM', activity: 'Zumba Toning' }, afternoon: { time: '4:00 PM - 5:30 PM', activity: 'Zumba Fitness' }, evening: null },
        { day: 'Friday', morning: { time: '9:00 AM - 10:30 AM', activity: 'Zumba Fitness' }, afternoon: null, evening: { time: '6:00 PM - 7:30 PM', activity: 'Zumba Toning' } },
        { day: 'Saturday', morning: { time: '10:00 AM - 11:30 AM', activity: 'Zumba Gold' }, afternoon: null, evening: { time: '5:00 PM - 6:30 PM', activity: 'Zumba Fitness' } },
        { day: 'Sunday', morning: null, afternoon: null, evening: null } // Rest day
    ];

    const scheduleContainer = document.getElementById('schedule-container');
    const scheduleTable = document.createElement('table');
    scheduleTable.classList.add('schedule-table');

    // Create table headers
    const tableHeaders = ['Day', 'Morning', 'Afternoon', 'Evening'];
    const tableHeaderRow = document.createElement('tr');
    tableHeaders.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        tableHeaderRow.appendChild(th);
    });
    scheduleTable.appendChild(tableHeaderRow);

    // Create table rows
    scheduleData.forEach(day => {
        const row = document.createElement('tr');
        const dayCell = document.createElement('td');
        dayCell.textContent = day.day;
        row.appendChild(dayCell);
        ['morning', 'afternoon', 'evening'].forEach(timeSlot => {
            const td = document.createElement('td');
            const slot = day[timeSlot];
            if (slot) {
                td.innerHTML = slot ? `${slot.time}<br>${slot.activity}` : '-';
            } else {
                td.textContent = '-';
            }
            row.appendChild(td);
        });
        scheduleTable.appendChild(row);
    });

    scheduleContainer.appendChild(scheduleTable);
});