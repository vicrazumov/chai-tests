process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);
chai.should();

describe('Orders', () => {
  describe('/POST api/orders/new', () => {
    it('should not POST an order with invalid body', (done) => {
      const query = {};
      chai.request(server)
        .post('/api/orders/new')
        .send(query)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('string');
          res.body.should.eql('Invalid data');
          done();
        });
    });

    it('should not POST an order with existing id', (done) => {
      const query = {
        orderId: '001',
        companyName: 'N Company',
        customerAddress: 'Schillerstrasse 8',
        orderedItem: 'iPhone X',
      };
      chai.request(server)
        .post('/api/orders/new')
        .send(query)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('string');
          res.body.should.eql('Order already exists');
          done();
        });
    });

    it('should POST an order with a right input', (done) => {
      const query = {
        orderId: '009',
        companyName: 'N Company',
        customerAddress: 'Schillerstrasse 8',
        orderedItem: 'iPhone X',
      };
      chai.request(server)
        .get('/api/orders')
        .end((err, res) => {
          const itemsCount = res.body.length;

          chai.request(server)
            .post('/api/orders/new')
            .send(query)
            .end((err, res) => {
              res.should.have.status(200);

              chai.request(server)
                .get('/api/orders')
                .end((err, res) => {
                  res.body.length.should.eql(itemsCount + 1);

                  const newItem = res.body[res.body.length - 1];
                  newItem.orderId.should.eql(query.orderId);
                  newItem.companyName.should.eql(query.companyName);
                  newItem.customerAddress.should.eql(query.customerAddress);
                  newItem.orderedItem.should.eql(query.orderedItem);
                  done();
                });
            });
        });
    });
  });
});
