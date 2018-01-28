const db = require('../db');

const getOrders = (req, res) => {
  db.getOrders(req.query)
    .then(orders => res.json(orders))
    .catch(err => res.apiError(500, err));
};

const addOrder = (req, res) => {
  if (!_validateOrder(req.body)) {
    return res.apiError(400, 'Invalid data');
  }

  db.addOrder(req.body)
    .then(() => res.end())
    .catch(err => res.apiError(500, err));
};

const editOrder = (req, res) => {
  if (!req.params.orderId || Object.keys(req.body).length === 0) {
    return res.apiError(400, 'Invalid data');
  }

  db.editOrder(req.params.orderId, req.body)
    .then(() => res.end())
    .catch(err => res.apiError(500, err));
};

const deleteOrder = (req, res) => {
  if (!req.params.orderId) {
    return res.apiError(400, 'Invalid data');
  }

  db.deleteOrder(req.params.orderId)
    .then(() => res.end())
    .catch(err => res.apiError(500, err));
};

const getProducts = (req, res) => {
  db.getProducts()
    .then(products => res.json(products))
    .catch(err => res.apiError(500, err));
};

const _validateOrder = order => {
  return !!order && !!order.orderId && !!order.companyName && !!order.customerAddress && !!order.orderedItem;
};

module.exports = {
  getOrders,
  addOrder,
  editOrder,
  deleteOrder,
  getProducts,
};
