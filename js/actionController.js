function calculate() {

    // get actions from localstorage
    const actions = JSON.parse(localStorage.getItem('actions')) || [];

    // get amountTarget from localstorage
    const amountTarget = parseInt(localStorage.getItem('amountTarget')) || 0;

    if (actions.length === 0 || amountTarget === 0) {

        console.log('geen actions');

        return;

    }

    function calculateTotal(data) {

        let total = 0;

        $.each(data, function totalSum(key, action) {

            total = total + parseInt(action.amount);

        });

        return total;

    }

    function calculatePercentage(total, target) {

        return Math.round((total / target) * 100);

    }

    eev.emit('update-meter', calculatePercentage(calculateTotal(actions), amountTarget));

};

function actionAdd(amount) {

    // get actions from localStorage
    // create empty array if no actions are set in localStorage
    const actions = JSON.parse(localStorage.getItem('actions')) || [];

    // add new action
    actions.push(
        { timestamp: new Date(), amount: amount }
    );

    // store the new action list in localStorage
    localStorage.setItem('actions', JSON.stringify(actions));

};

// add new action
eev.on('action-add', actionAdd);

// calculate total
eev.on('action-total', calculate);
