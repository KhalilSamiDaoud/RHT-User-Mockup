import { getDepartures, getArivals } from './APIinput.js';
import { addDragWindow } from './dragWindow.js';

const ARIVALS = document.getElementById('arivals_list');
const DEPARTURES = document.getElementById('departures_list');

const END_ENTRY_TEMPLATE = '<li class="trip-entry ending-entry"></li>';

const TRIP_TEMPLATE = 
                        '<span class="trip-entry-icon material-icons">account_circle</span>' +
                        '<div class="trip-entry-content">' +
                            '<div class="trip-title-bar">' +
                                '<span class="ttb-name">{{name}}</span>' +
                                '<span class="material-icons ttb-icon">{{icon}}</span>' +
                                '<span class="ttb-id push-right">#{{confirmation}}</span>' +
                            '</div>' +
                            '<div class="trip-status-bar">' +
                                '<span class="tsb-status">' +
                                    '<b>{{status}}</b>' +
                                '</span>' +
                                '<span class="tsb-apt push-right">Driver: {{driver}}</span>' +
                                '<span class="tsb-apt">Apt. {{apt_time}}</span>' +
                                '<span class="tsb-eta">Eta. {{eta}}</span>' +
                            '</div>' +
                            '<div class="trip-progress-bar">' +
                                '<progress class="progress {{prog_class}}" max="100" value="{{progress}}"></progress>' +
                            '</div>' +
                        '</div>';

let tripEntries = new Map();

function initTripLists() {
    getArivals().forEach(trip => {
        tripEntries.set(trip.confirmation, new FacilityTripEntry(trip, ARIVALS));
    });
    ARIVALS.insertAdjacentHTML('beforeend', END_ENTRY_TEMPLATE);

    getDepartures().forEach(trip => {
        tripEntries.set(trip.confirmation, new FacilityTripEntry(trip, DEPARTURES));
    });
    DEPARTURES.insertAdjacentHTML('beforeend', END_ENTRY_TEMPLATE);
}

function updateTripLists() {
    clearTripLists();
    initTripLists();
}

function clearTripLists() {

    tripEntries.forEach(entry => {
        entry.destroy();
    });

    while (ARIVALS.firstChild) {
        ARIVALS.removeChild(ARIVALS.firstChild);
    }
    while (DEPARTURES.firstChild) {
        DEPARTURES.removeChild(DEPARTURES.firstChild);
    }

    tripEntries.clear();
}

class FacilityTripEntry {
    constructor(trip, parent) {
        this.trip = trip;
        this.parent = parent;

        this.#constructElem();
    }

    destroy() {
        this.elem.removeEventListener('click', this.#handleClick.bind(this));

        this.parent.removeChild(this.elem);
    }

    #constructElem() {
        this.elem = document.createElement('li');
        this.elem.classList.add('trip-entry');
        
        if (this.trip.tripStyleClass)
            this.elem.classList.add(this.trip.tripStyleClass);

        this.elem.innerHTML = this.#formatEntry();

        this.elem.addEventListener('click', this.#handleClick.bind(this));

        this.parent.appendChild(this.elem);
    }

    #handleClick() {
        addDragWindow(this.trip);
    }

    #formatEntry() {
        return TRIP_TEMPLATE
            .replace('{{name}}', this.trip.name)
            .replace('{{icon}}', this.trip.statusIcon)
            .replace('{{confirmation}}', this.trip.confirmation)
            .replace('{{status}}', this.trip.statusMsg)
            .replace('{{apt_time}}', this.trip.scheduledPUTime)
            .replace('{{eta}}', this.trip.eta)
            .replace('{{driver}}', this.trip.driverNumber)
            .replace('{{progress}}', this.trip.tripProg)
            .replace('{{prog_class}}', (this.trip.progStyleClass) ? this.trip.progStyleClass : '');
    }
}

export { initTripLists, clearTripLists, updateTripLists };