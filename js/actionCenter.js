// cache overlay
const $actionCenter = $('[data-js="actionCenter"]');

const $amountInput = $actionCenter.find('.amount__input');

const $amountButton = $actionCenter.find('.amount__button');

const $settingsButton = $actionCenter.find('.settings__button');

const $total = $actionCenter.find('.total');

const $target = $actionCenter.find('.target');

/**
 * @function addAmount
 */
function addAmount() {

    // store input value
    const amount = $amountInput.val();

    // only submit values
    if (amount === '' || amount === 0 ) {

        return;

    }

    // emit action
    eev.emit('action-add', amount);

    // reset amount input
    $amountInput.val('');

}

// add event to amount button
$amountButton.on('click', addAmount);

// add event to settings button
$settingsButton.on('click', function() {

    // emit event to open settings
    eev.emit('settings', { action: 'open' });

});

eev.on('update-target', function updateTarget(target) {

    $target.text('\u20ac' + target);

});

eev.on('update-total', function updateTotal(total) {

    $total.text('\u20ac' + total.toLocaleString('nl', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }));

});
