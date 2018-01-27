// cache DOM elements
const $settings = $('[data-js="settings"]');
const $inputTarget = $settings.find('.amountTarget');
const $buttonTarget = $settings.find('.saveAmountTarget');
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

    setTimeout(function reInit() {

        // recalculate
        eev.emit('action-total');
        eev.emit('update-target', localStorageIdentifier);

    }, 10)

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

/**
 * save the amount to localstorage
 *
 * @function saveAmountTarget
 */
function saveAmountTarget() {

    // get value from input
    const amountTarget = $inputTarget.val() || 0;

    // only set valid numbers
    if (amountTarget === 0) {

        return;

    }

    // set local storage
    localStorage.setItem('amountTarget', amountTarget);

    // recalculate
    eev.emit('action-total');

    eev.emit('update-target', amountTarget);

    // enable close button
    $buttonClose.attr('disabled', false);

    // close settings
    settings({ action: 'close' })

}

// add event to button
$buttonTarget.on('click', saveAmountTarget);

// add event to button
$buttonClose.on('click', function closeSettings() {

    // close settings
    settings({ action: 'close' })

});

// create event handler
eev.on('settings', settings);

export default initialize();
