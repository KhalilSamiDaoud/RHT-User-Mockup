import * as API from './APIinput.js';
import * as Main from './main.js';

const SETTINGS_facility = document.getElementById('facility_id');
const SETTINGS_listMode = document.getElementById('list_select');
const SETTINGS_save = document.getElementById('save_settings');

SETTINGS_save.addEventListener('click', storeSettingsLocally);

const SETTINGS = {
    desktopMode: 'desktop',
    listMode: 'both',
    facilityID: 0
}

let localCache = window.localStorage;
let isStorageAvaliable = checkStorageAvaliability();

function checkStorageAvaliability() {
    let token = 'test';

    try {
        localCache.setItem(token, token);
        localCache.removeItem(token);

        return true;
    } 
    catch (err) {
        console.warn('Local storage is not enabled.');

        return false;
    }
}

function initSettings() {
    if(isStorageAvaliable) {
        for (const property in SETTINGS) {
            SETTINGS[property] = localCache.getItem(property) ?? SETTINGS[property];
        }

        applyCachedSettings();
    }
}

function applyCachedSettings() {
    if (Main.DISP_VARS.facilityID !== SETTINGS.facilityID) {
        Main.DISP_VARS.facilityID = SETTINGS.facilityID;

        API.updateFacilityTrips();
    }
    Main.DISP_VARS.listMode = SETTINGS.listMode;
    Main.DISP_VARS.desktopMode = SETTINGS.desktopMode;

    SETTINGS_facility.value = SETTINGS.facilityID;
    [...SETTINGS_listMode.options].forEach(opt => {
        if (opt.value == SETTINGS.listMode)
            opt.selected = true;
    });

    if (SETTINGS.desktopMode === 'desktop') {
        Main.setDesktopMode();
        Main.handleDesktopMode();
    }
    else {
        Main.setLobbyMode();
        Main.handleLobbyMode();
    }

    Main.handleListMode();
}

function storeSettingsLocally() {
    SETTINGS.desktopMode = Main.DISP_VARS.desktopMode;
    SETTINGS.listMode = SETTINGS_listMode.options[SETTINGS_listMode.selectedIndex].value;
    SETTINGS.facilityID = SETTINGS_facility.value;

    for (const property in SETTINGS) {
        localCache.setItem(property, SETTINGS[property]);
    }

    applyCachedSettings();
}

export { initSettings };