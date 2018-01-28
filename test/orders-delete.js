process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);
chai.should();

describe('Orders', () => {
  describe('/DELETE api/orders', () => {
    it('should not DELETE an order with invalid id', (done) => {
      chai.request(server)
        .delete('/api/orders')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('should not delete an order with a wrong id', (done) => {
      chai.request(server)
        .delete('/api/orders/100')
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('string');
          res.body.should.eql('Order not found');
          done();
        });
    });

    it('should DELETE an order with a right id', (done) => {
      chai.request(server)
        .get('/api/orders')
        .end((err, res) => {
          const itemsCount = res.body.length;

          chai.request(server)
            .delete('/api/orders/001')
            .end((err, res) => {
              res.should.have.status(200);

              chai.request(server)
                .get('/api/orders')
                .end((err, res) => {
                  res.body.length.should.eql(itemsCount - 1);
                  done();
                });
            });
        });
    });
  });
});
