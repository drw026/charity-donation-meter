// cache overlay
const $settings = $('[data-js="settings"]');

// cache input target
const $inputTarget = $settings.find('.amountTarget');

// cache button
const $buttonTarget = $settings.find('.saveAmountTarget');

// cache button
const $buttonClose = $settings.find('.closeSettings');

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

        // open settings
        settings({ action: 'open' })

        // disable close button
        $buttonClose.attr('disabled', true);

        return;

    }

}

/**
 * open or close settings menu
 *
 * @function settings
 * @param setup
 */
function settings(data) {

    if (data.action === 'open') {

        $settings.removeClass('settings').addClass('settings--show');

    } else if (data.action === 'close') {

        $settings.removeClass('settings--show').addClass('settings');

    }

}

// add event to button
$buttonTarget.on('click', function saveAmountTarget() {

    // get value from input
    const amountTarget = $inputTarget.val() || 0;

    // set local storage
    localStorage.setItem('amountTarget', amountTarget);

    // enable close button
    $buttonClose.attr('disabled', false);

});

// add event to button
$buttonClose.on('click', function closeSettings() {

    // close settings
    settings({ action: 'close' })

});

// create event handler
eev.on('settings', settings);

export default initialize();
