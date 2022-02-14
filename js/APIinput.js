import * as FacilityTrip from './facilityTrip.js';
import * as TripLists from './tripLists.js';
import * as Main from './main.js';

let updateInterval, departures, arivals
departures = arivals = []

async function initFacilityTrips() {
    updateFacilityTrips();
    updateInterval = setInterval(updateFacilityTrips, 30000);
}

async function updateFacilityTrips() {
    await fetch('http://192.168.6.10:8082/api/TripReservation/GetFacilityTrips', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ 'FacilityID': Main.DISP_VARS.facilityID, 'bArriving': true })
    })
        .then(response => response.json())
        .then(data => {
            updateArivals(data);
        });

    await fetch('http://192.168.6.10:8082/api/TripReservation/GetFacilityTrips', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ 'FacilityID': Main.DISP_VARS.facilityID, 'bArriving': false })
    })
        .then(response => response.json())
        .then(data => {
            updateDepartures(data);
            TripLists.updateTripLists();
        });
}

function clearUpdateInterval() {
    updateInterval = clearInterval(updateInterval);
}

function updateArivals(data) {
    arivals = [];

    data.Logs.forEach(entry => {
        arivals.push(new FacilityTrip.FacilityTrip(entry, true));
    });
}

function updateDepartures(data) {
    departures = [];

    data.Logs.forEach(entry => {
        departures.push(new FacilityTrip.FacilityTrip(entry, false));
    });
}

function getDepartures() {
    return departures;
}

function getArivals() {
    return arivals;
}

export { initFacilityTrips, updateFacilityTrips, clearUpdateInterval, getDepartures, getArivals };