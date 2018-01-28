process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiSorted = require('chai-sorted');
const server = require('../index');

chai.use(chaiHttp);
chai.use(chaiSorted);
chai.should();

describe('Products', () => {
  describe('/GET api/products', () => {
    it('should get all the products sorted by count (desc)', (done) => {
      chai.request(server)
        .get('/api/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.be.sortedBy('count', true);
          done();
        });
    });
  });
});
