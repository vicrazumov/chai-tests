const api = require('./api');
const apiError = require('./api/apiError');

const ERROR_404_MESSAGE = "Unable to resolve the request";

const initRoutes = app => {
  app.use(apiError);

  app.get('/api/orders', (req, res) => api.getOrders(req, res));

  app.post('/api/orders/new', (req, res) => api.addOrder(req, res));

  app.put('/api/orders/:orderId', (req, res) => api.editOrder(req, res));

  app.delete('/api/orders/:orderId', (req, res) => api.deleteOrder(req, res));

  app.get('/api/products', (req, res) => api.getProducts(req, res));

  app.all('*', (req, res) => res.apiError(404, ERROR_404_MESSAGE));
};

module.exports = {
  initRoutes,
};
