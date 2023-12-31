const { google } = require('googleapis');

const { OAuth2 } = google.auth

const oAuth2Client = new OAuth2(
    'YOUR_CLIENT_ID',
    'YOUR_CLIENT_SECRET'
)

oAuth2Client.setCredentials({
    refresh_token: 'YOUR_REFRESH_TOKEN',
})

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

// Create a new event start date instance for temp uses in our calendar.
const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDay() + 2)

// Create a new event end date instance for temp uses in our calendar.
const eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDay() + 4)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

// Create a dummy event for temp uses in our calendar
const event = {
    summary: `Meeting with David`,
    location: `3595 California St, San Francisco, CA 94118`,
    description: `Meet with David to talk about the new client project and how to integrate the calendar for booking.`,
    colorId: 1,
    start: {
        dateTime: eventStartTime,
        timeZone: 'America/Denver',
    },
    end: {
        dateTime: eventEndTime,
        timeZone: 'America/Denver',
    },
}

calendar.freebusy.query({
    resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZone: 'America/Denver',
        items: [{ id: 'primary' }]
    },
},
    (err, res) => {
        if (err) return console.error('Free Busy Query Error: ', err)
        const eventArr = res.data.calendars.primary.busy
        // Check if event array is empty which means we are not busy
        if (eventArr.length === 0)
            // If we are not busy create a new calendar event.
            return calendar.events.insert(
                { calendarId: 'primary', resource: event },
                err => {
                    // Check for errors and log them if they exist.
                    if (err) return console.error('Error Creating Calender Event:', err)
                    // Else log that the event was created.
                    return console.log('Calendar event successfully created.')
                }
            )

        // If event array is not empty log that we are busy.
        return console.log(eventArr)
    }
)


