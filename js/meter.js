const $meter = $('[data-js="meter"]');

const $progress = $meter.find('.meter__progress');

const $amount = $meter.find('.meter__amount');

function updateMeter(integer) {

    const percentage = integer <= 100 ? integer : 100;

    $progress.css('width', percentage + '%');

}

eev.on('update-meter', updateMeter);

eev.on('update-total', function updateAmount(total) {

    $amount.text('\u20ac' + total.toLocaleString('nl', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }));

});