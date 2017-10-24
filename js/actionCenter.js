// cache overlay
const $actionCenter = $('[data-js="actionCenter"]');

const $amountInput = $actionCenter.find('.amount__input');

const $amountButton = $actionCenter.find('.amount__button');

const $settingsButton = $actionCenter.find('.settings__button');

/**
 * @function addAmount
 */
function addAmount() {

    // emit action
    eev.emit('action-add', $amountInput.val());

    // reset amount input
    $amountInput.val('');

}

$amountButton.on('click', addAmount);

$settingsButton.on('click', function() {

    eev.emit('settings', { action: 'open' });

});
