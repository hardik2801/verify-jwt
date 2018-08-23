const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-as-promised'));

const app = require('../index.js');
const req_body = {
    headers: {
        authtoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MDE4NzEzZC1mMTk0LTQ4MTktOGQ1MC1kMDcxZDhlY2FmNDgiLCJ1c2VyTmFtZSI6IkhhcmRpayBTaGFoIiwiaWF0IjoxNTM1MDAzMzM2LCJleHAiOjE1MzUwMzkzMzZ9.M1b4H_XGd3K4Y6LXkk2-T_EMWabEq0znmGnvsurN4bA'
    }
};

it('should return data if token is valid', function(){
    return expect(app.verifyUser(req_body)).to.eventually.be.a('object');
});
