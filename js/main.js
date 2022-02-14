import * as API from './APIinput.js';
import * as Modal from './modal.js';
import * as Settings from './settings.js';
import './sideNav.js';

const DESKTOP_MODE_BTN = document.getElementById('desktop_mode');
const LOBBY_MODE_BTN = document.getElementById('lobby_mode');
const MAIN_CONTENT = document.getElementById('main_content');
const ARIVALS_LIST = document.getElementById('arivals');
const DEPARTURES_LIST = document.getElementById('departures');

const DISP_VARS = {
    desktopMode: 'desktop',
    facilityID: 0,
    listMode: 'both'
}

DESKTOP_MODE_BTN.addEventListener('click', setDesktopMode);
LOBBY_MODE_BTN.addEventListener('click', setLobbyMode);

function setDesktopMode() {
    DESKTOP_MODE_BTN.classList.add('active');
    LOBBY_MODE_BTN.classList.remove('active');

    DISP_VARS.desktopMode = 'desktop';
}

function setLobbyMode() {
    DESKTOP_MODE_BTN.classList.remove('active');
    LOBBY_MODE_BTN.classList.add('active');

    DISP_VARS.desktopMode = 'lobby';
}


function handleDesktopMode() {
    let hideables = document.querySelectorAll('.lobby-hide-on');
    let lists = document.querySelectorAll('.trip-list ul.lobby-mode');
    let listContainer = document.getElementById('lists_container');
    listContainer.classList.remove('lobby-mode');

    MAIN_CONTENT.classList.remove('lobby-mode');
    [...hideables].forEach(elem => {
        elem.classList.add('lobby-hide-off');
        elem.classList.remove('lobby-hide-on');
    });
    [...lists].forEach(elem => {
        elem.classList.remove('lobby-mode');
    });
}

function handleLobbyMode() {
    let hideables = document.querySelectorAll('.lobby-hide-off');
    let lists = document.querySelectorAll('.trip-list ul');
    let listContainer = document.getElementById('lists_container');
    listContainer.classList.add('lobby-mode');

    MAIN_CONTENT.classList.add('lobby-mode');
    [...hideables].forEach(elem => {
        elem.classList.remove('lobby-hide-off');
        elem.classList.add('lobby-hide-on');
    });
    [...lists].forEach(elem => {
        elem.classList.add('lobby-mode');
    });
}

function handleListMode() {
    switch (DISP_VARS.listMode) {
        case('both'):
            ARIVALS_LIST.classList.remove('lobby-hide-on', 'full');
            DEPARTURES_LIST.classList.remove('lobby-hide-on', 'full');
            break;
        case('arivals'):
            ARIVALS_LIST.classList.remove('lobby-hide-on');
            ARIVALS_LIST.classList.add('full');
            DEPARTURES_LIST.classList.add('lobby-hide-on');
            DEPARTURES_LIST.classList.remove('full');
            break;
        case('departures'):
            ARIVALS_LIST.classList.add('lobby-hide-on');
            ARIVALS_LIST.classList.remove('full');
            DEPARTURES_LIST.classList.add('full');
            DEPARTURES_LIST.classList.remove('lobby-hide-on');
            break;
    }
}

document.onkeydown = ({ repeat, ctrlKey, key }) => {
    if (repeat) return

    if (key == 'v' && ctrlKey)
        openHiddenOptions();
}

function openHiddenOptions() {
    Modal.modals.get('secret').open();
}

function main() {
    Settings.initSettings();
    Modal.initModals();
    API.initFacilityTrips();
}

main();

export { DISP_VARS, handleDesktopMode, handleLobbyMode, handleListMode, setDesktopMode, setLobbyMode };