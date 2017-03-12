/**
 * Created by user on 12.03.2017.
 */
//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var calculator = require('../services/calculator');

chai.use(chaiHttp);

describe('Calculators', function () {
    /*
     * Test the /GET route
     */
    describe('calculate should', function () {
        it('return correct results', function () {
            var amount = 1000;
            var rate = 1.5;
            var months = 12;

            var result = calculator.calculateMorgage(amount,months,rate);

            expect(result.credit).to.exist;
            expect(result.credit).to.equal(84.01196734115257);

        });
    });

});

//Our parent block
// describe('Users', function () {
//     beforeEach(function (done) { //Before each test we empty the database
//         Book.remove({}, function (err) {
//             done();
//         });
//     });
//     /*
//      * Test the /GET route
//      */
//     describe('/GET users', function () {
//         it('it should GET all users', function (done) {
//             chai.request(server)
//                 .get('/book')
//                 .end(function (err, res) {
//                     res.should.have.status(200);
//                     res.body.should.be.a('array');
//                     res.body.length.should.be.eql(0);
//                     done();
//                 });
//         });
//     });
//
// });