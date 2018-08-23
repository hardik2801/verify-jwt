const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-as-promised'));

const app = require('../index.js');
const req_body = {
    headers: {
        authtoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MDE4NzEzZC1mMTk0LTQ4MTktOGQ1MC1kMDcxZDhlY2FmNDgiLCJ1c2VyTmFtZSI6IkhhcmRpayBTaGFoIiwiaWF0IjoxNTM0OTQzMjk1LCJleHAiOjE1MzQ5NzkyOTV9.b6pNay6b3AvfA0bHSLEG1F3ENFbzGMPz8cRdyxnxLxw'
    }
};

it('should return data if token is valid', function(){
    return expect(app.verifyUser(req_body)).to.eventually.be.a('object');
});
