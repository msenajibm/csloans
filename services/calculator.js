/**
 * Created by user on 12.03.2017.
 */

var annuity = require('./anuity');

var defaultRate = 1.5;

function calculateMorgage( borrowedMoney, months, rate){
    if( !rate ){
        rate = defaultRate;
    }
    borrowedMoney = parseFloat(borrowedMoney);
    months = parseInt(months);
    rate = parseFloat(rate);

    var result = new annuity(borrowedMoney, months, rate, defaultRate);

    return result;
}

exports.calculateMorgage = calculateMorgage;