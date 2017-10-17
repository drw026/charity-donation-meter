import $ from 'jquery';

// cache overlay
const $settings = $('[data-js="settings"]');

// cache input target
const $inputTarget = $settings.find('.amountTarget');

// cache button
const $buttonTarget = $settings.find('.saveAmountTarget');

// create container
let localStorageIdentifier = null;

/**
 * @function initialize
 */
function initialize() {

    // get localstorage identifier
    localStorageIdentifier = localStorage.getItem('amountTarget');

    // check if identifier is set
    if (!localStorageIdentifier) {

        // if not set, initialize setup
        settings({setup: true});

        return;

    }

    console.log('APP ALREADY INITIALIZED');

}

/**
 *
 * @function settings
 * @param setup
 */
function settings(setup) {

    if (setup) {

        $settings.removeClass('settings').addClass('settings--show');

    }

}

function closeSettings() {

    $settings.removeClass('settings--show').addClass('settings');

}

// add event to button
$buttonTarget.on('click', function saveAmountTarget() {

    // get value from input
    const amountTarget = $inputTarget.val() || 0;

    // set local storage
    localStorage.setItem('amountTarget', amountTarget);

});

export { initialize };