import { FacilityTrip } from './facilityTrip.js';
import { initTripLists, updateTripLists } from './tripLists.js';

let updateInterval, departures, arivals
departures = arivals = []

async function initFacilityTrips() {
    await fetch('http://192.168.6.10:8082/api/TripReservation/GetFacilityTrips', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ 'FacilityID': 9, 'bArriving': true })
    })
        .then(response => response.json())
        .then(data => {
            updateArivals(data);
        });

    await fetch('http://192.168.6.10:8082/api/TripReservation/GetFacilityTrips', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ 'FacilityID': 9, 'bArriving': false })
    })
        .then(response => response.json())
        .then(data => {
            updateDepartures(data);
            initTripLists();
        });

    updateInterval = setInterval(async () => {
        await fetch('http://192.168.6.10:8082/api/TripReservation/GetFacilityTrips', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ 'FacilityID': 9, 'bArriving': true })
        })
            .then(response => response.json())
            .then(data => {
                updateArivals(data);
            });

        await fetch('http://192.168.6.10:8082/api/TripReservation/GetFacilityTrips', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ 'FacilityID': 9, 'bArriving': false })
        })
            .then(response => response.json())
            .then(data => {
                updateDepartures(data);
                updateTripLists();
            });
    }, 30000);
}

function updateArivals(data) {
    arivals = [];

    data.Logs.forEach(entry => {
        arivals.push(new FacilityTrip(entry, true));
    });
}

function updateDepartures(data) {
    departures = [];

    data.Logs.forEach(entry => {
        departures.push(new FacilityTrip(entry, false));
    });
}

function getDepartures() {
    return departures;
}

function getArivals() {
    return arivals;
}

export { initFacilityTrips, getDepartures, getArivals };