import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import orders from './orders';
import products from './products';

export default combineReducers({
  router: routerReducer,
  orders,
  products,
})
