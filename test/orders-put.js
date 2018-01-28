process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);
chai.should();

describe('Orders', () => {
  describe('/PUT api/orders', () => {
    it('should not update an order with invalid body', (done) => {
      const query = {};
      chai.request(server)
        .put('/api/orders/001')
        .send(query)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('string');
          res.body.should.eql('Invalid data');
          done();
        });
    });

    it('should not update any orders if no id sent', (done) => {
      const query = {
        orderedItem: 'iPhone X',
      };
      chai.request(server)
        .put('/api/orders')
        .send(query)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('should not update an order with a wrong id', (done) => {
      const query = {
        companyName: 'N Company',
      };
      chai.request(server)
        .put('/api/orders/100')
        .send(query)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('string');
          res.body.should.eql('Order not found');
          done();
        });
    });

    it('should update an order with a right input', (done) => {
      const query = {
        companyName: 'N Company',
        customerAddress: 'Schillerstrasse 8',
        orderedItem: 'iPhone 8',
      };
      chai.request(server)
        .put('/api/orders/002')
        .send(query)
        .end((err, res) => {
          res.should.have.status(200);

          chai.request(server)
            .get('/api/orders')
            .end((err, res) => {
              const updatedItem = res.body.find(order => order.orderId === '002');
              updatedItem.companyName.should.eql(query.companyName);
              updatedItem.customerAddress.should.eql(query.customerAddress);
              updatedItem.orderedItem.should.eql(query.orderedItem);
              done();
            });
        });
    });
  });
});
