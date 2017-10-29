const $meter = $('[data-js="meter"]');

const $progress = $meter.find('.meter__progress');

function updateMeter(integer) {

    const percentage = integer <= 100 ? integer : 100;

    $progress.css('width', percentage + '%');

}

eev.on('update-meter', updateMeter);