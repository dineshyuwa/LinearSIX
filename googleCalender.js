const { google } = require('googleapis');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/busy-intervals', async (req, res) => {
    try {
        const calendarId = 'yuwarajalingamd@gmail.com';
        const startTime = new Date('2023-07-10T09:00:00Z');
        const endTime = new Date('2023-07-10T17:00:00Z');

        const busyIntervals = await getBusyIntervals(calendarId, startTime, endTime);
        res.json(busyIntervals);
    } catch (error) {
        console.error('Error retrieving busy intervals:', error);
        res.status(500).json({ error: 'Failed to retrieve busy intervals' });
    }
});

async function getBusyIntervals(calendarId, startTime, endTime) {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'client_secret.json',
        scopes: ['https://www.googleapis.com/auth/calendar.readonly']
    });

    const calendar = google.calendar({ version: 'v3', auth });

    try {
        const response = await calendar.events.list({
            calendarId,
            timeMin: startTime.toISOString(),
            timeMax: endTime.toISOString(),
            singleEvents: true,
            orderBy: 'startTime'
        });

        const busyIntervals = [];
        const events = response.data.items;

        if (events.length > 0) {
            let currentStartTime = startTime;
            for (const event of events) {
                const eventStartTime = new Date(event.start.dateTime || event.start.date);
                const eventEndTime = new Date(event.end.dateTime || event.end.date);

                if (currentStartTime < eventStartTime) {
                    busyIntervals.push({ start: currentStartTime, end: eventStartTime });
                }

                currentStartTime = eventEndTime;
            }

            if (currentStartTime < endTime) {
                busyIntervals.push({ start: currentStartTime, end: endTime });
            }
        } else {
            busyIntervals.push({ start: startTime, end: endTime });
        }

        return busyIntervals;
    } catch (error) {
        console.error('Error retrieving busy intervals:', error);
        return [];
    }
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
