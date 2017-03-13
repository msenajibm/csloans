/**
 * Created by user on 12.03.2017.
 */
var users = require('./coverage/instrumented/models/users');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);
//Our parent block
describe('Users', function () {
    /*
     * Test the /GET route
     */
    describe('/GET users', function () {
        it('it should GET all users', function (done) {
            chai.request(server)
                .get('/users')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.be.eql(11);
                    done();
                });
        });
    });

});