// Database interface singleton
// Here, database is only a JSON-object.
// However, all the methods implement promises in order to preserve async nature of the queries.
//
// To start working, first call initDatabase() method to copy data from fixtures.

const fixtures = require('./fixtures');

const orderCollection = {};

/**
 * Initialize database - copy data from the fixtures
 *
 * @returns
 */
const initDatabase = () => {
  if (Object.keys(orderCollection).length !== 0) return Promise.reject('Database already initialized');

  fixtures.forEach(order => addOrder(order));
  return Promise.resolve();
};

/**
 * Get orders. Optional filtering by companyName or customerAddress
 *
 * @param {any} [{ companyName, customerAddress }={}]
 * @returns
 */
const getOrders = ({ companyName, customerAddress } = {}) => {
  let ordersArray = Object.values(orderCollection).filter(order => !order.deleted);

  if (!!companyName) {
    ordersArray = ordersArray
      .filter(order => order.companyName === companyName);
  }

  if (!!customerAddress) {
    ordersArray = ordersArray
      .filter(order => order.customerAddress === customerAddress);
  }

  return Promise.resolve(ordersArray);
};

/**
 * Add order to the database
 *
 * @param {any} order
 */
const addOrder = order => {
  if (!!orderCollection[order.orderId]) return Promise.reject('Order already exists');

  orderCollection[order.orderId] = order;
  return Promise.resolve();
};

/**
 * Edit existing order in the database
 *
 * @param {any} orderId
 * @param {any} order
 */
const editOrder = (orderId, order) => {
  if (!orderCollection[orderId]) return Promise.reject('Order not found');
  const newOrder = Object.assign({}, orderCollection[orderId], order);

  orderCollection[orderId] = newOrder;
  return Promise.resolve();
};

/**
 * Delete existing order in the database
 *
 * @param {any} orderId
 */
const deleteOrder = orderId => {
  if (!orderCollection[orderId]) return Promise.reject('Order not found');

  orderCollection[orderId].deleted = true;
  return Promise.resolve();
};

/**
 * Get products sortered by the number of orders (desc)
 *
 * @returns
 */
const getProducts = () => {
  const ordersArray = Object.values(orderCollection).filter(order => !order.deleted);
  if (ordersArray.length === 0) return [];

  const products = {};

  ordersArray.forEach(order => {
    const productCount = products[order.orderedItem];
    products[order.orderedItem] = !!productCount ? productCount + 1 : 1;
  });

  const _retValue = Object.keys(products)
    .map(key => ({ orderedItem: key, count: products[key] }))
    .sort((a, b) => b.count - a.count);

  return Promise.resolve(_retValue);
};

module.exports = {
  getOrders,
  addOrder,
  editOrder,
  deleteOrder,
  getProducts,
  initDatabase,
};
