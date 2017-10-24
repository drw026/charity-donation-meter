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

    const actions = JSON.parse(localStorage.getItem('actions')) || [];

    actions.push(
        { timestamp: new Date(), amount: amount }
    );

    localStorage.setItem('actions', JSON.stringify(actions));

};

eev.on('action-add', actionAdd);

eev.on('action-total', calculate);

function actionController() {};

export default actionController();