process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiThings = require('chai-things');
const server = require('../index');

chai.use(chaiHttp);
chai.use(chaiThings);
chai.should();

describe('Orders', () => {
  describe('/GET api/orders', () => {
    it('should get all the orders', (done) => {
      chai.request(server)
        .get('/api/orders')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.be.eql(7);
          done();
        });
    });

    it('should get the orders by SuperTrader only', (done) => {
      chai.request(server)
        .get('/api/orders?companyName=SuperTrader')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.all.have.property('companyName', 'SuperTrader');
          done();
        });
    });

    it('should get the orders for Reeperbahn 153 only', (done) => {
      chai.request(server)
        .get('/api/orders?customerAddress=Reeperbahn+153')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.all.have.property('customerAddress', 'Reeperbahn 153');
          done();
        });
    });

    it('should not get any orders for non-existing companies', (done) => {
      chai.request(server)
        .get('/api/orders?companyName=test')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

  });
});
