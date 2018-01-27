// cache DOM elements
const $meter = $('[data-js="meter"]');
const $progress = $meter.find('.meter__progress');
const $amount = $meter.find('.meter__amount');

/**
 * update meter percentage
 *
 * @param {number} integer - percentage
 */
function updateMeter(integer) {

    // avoid above 100 percentage
    const percentage = integer <= 100 ? integer : 100;

    // apply percentage to meter
    $progress.css('width', percentage + '%');

}

// fire update meter
eev.on('update-meter', updateMeter);

// update meter percentage text
eev.on('update-total', function updateAmount(total) {

    $amount.text('\u20ac' + total.toLocaleString('nl', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }));

});