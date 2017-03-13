/*
 * GET users listing.
 */
var Users = require('../models/users');

function getUsers(req, res) {
    //Query the DB and if no errors, send all the books
    Users.getAll().then(function (users) {
        //If no errors, send them back to the client
        res.json(users);
    })
        .catch(function (err) {
            res.send(err);
        });
}

function version( req, res){
    res.send('1.0');
}

exports.list = getUsers;
exports.version = version;