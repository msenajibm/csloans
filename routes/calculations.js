/**
 * Created by user on 12.03.2017.
 */

var calculator = require('../services/calculator');

function anuity(req, res) {

    // for post request "Content-Type: application/json"
    // var body = req.body;

    var query = req.query;

    var result = calculator.calculateMorgage(query.money, query.months, query.rate);

    res.send({"monthlyPayment": result.credit});

}

function perform(req, res){
    var array = [];
    for( var i = 0 ; i < 1000000; i++ ){
        array[i] = Math.random();
    }
    setTimeout(function(){
        delete array;
    },5000);

    res.send("done");
}

exports.anuity = anuity;
exports.perform = perform;