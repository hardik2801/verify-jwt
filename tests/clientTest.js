const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-as-promised'));

const app = require('../index.js');

it('should return data if token is valid', function(){
    const req_body = {
        headers: {
            authtoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MDE4NzEzZC1mMTk0LTQ4MTktOGQ1MC1kMDcxZDhlY2FmNDgiLCJ1c2VyTmFtZSI6IkhhcmRpayBTaGFoIiwiaWF0IjoxNTM0OTM5ODYzLCJleHAiOjE1MzQ5NzU4NjN9.VNRjhz_A_D_3UXH3BgpDvGZOp2LAHbZoyBudjdeLUa4'
        }
    };
    return expect(app.verifyUser(req_body)).to.eventually.be.a('object');
});
