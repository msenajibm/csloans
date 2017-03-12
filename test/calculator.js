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