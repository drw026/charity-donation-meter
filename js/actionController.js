/**
 * calculate all amounts and return percentage
 *
 * @function calculate
 */
function calculate() {

    // get actions from localstorage
    const actions = JSON.parse(localStorage.getItem('actions')) || [];

    // get amountTarget from localstorage
    const amountTarget = parseInt(localStorage.getItem('amountTarget')) || 0;

    // create empty object to store return data
    let returnObject = {};

    // abort calculations if there is no target amount or available actions
    if (actions.length === 0 || amountTarget === 0) {

        return;

    }

    /**
     * calculate total from all actions
     *
     * @param data - all actions
     * @returns {number} - total from all actions
     */
    function calculateTotal(data) {

        // var for saving the total
        let total = 0;

        // iterate array and sum up all amounts from actions
        $.each(data, function totalSum(key, action) {

            total = total + parseFloat(action.amount);

        });

        return total;

    }

    /**
     * calculate percentage
     *
     * @param total - sum of all actions
     * @param target - target amount
     * @returns {number} - percentage
     */
    function calculatePercentage(total, target) {

        return Math.round((total / target) * 100);

    }

    // store all return data in object
    returnObject = {
        totalAmount: calculateTotal(actions),
        percentage: calculatePercentage(calculateTotal(actions), amountTarget)
    };

    // send
    eev.emit('update-meter', returnObject.percentage);
    eev.emit('update-total', returnObject.totalAmount);

};

/**
 * register actions, store them in localstorage and invoke recalculation
 *
 * @param amount
 */
function actionAdd(amount) {

    // get actions from localStorage
    // create empty array if no actions are set in localStorage
    const actions = JSON.parse(localStorage.getItem('actions')) || [];

    // add new action
    actions.push(
        { timestamp: Date.now(), amount: amount }
    );

    // store the new action list in localStorage
    localStorage.setItem('actions', JSON.stringify(actions));

    // calculate
    calculate();

};

// add new action
eev.on('action-add', actionAdd);

// calculate total
eev.on('action-total', calculate);
