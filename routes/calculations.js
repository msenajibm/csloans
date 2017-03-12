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

exports.anuity = anuity;