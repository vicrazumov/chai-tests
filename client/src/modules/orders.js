import axios from 'axios';
import qs from 'qs';

import * as apiRequestConstants from './apiConstants';

const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
const GET_ORDERS_ERROR = 'GET_ORDERS_ERROR';

const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
const ADD_ORDER_ERROR = 'ADD_ORDER_ERROR';

const EDIT_ORDER_REQUEST = 'EDIT_ORDER_REQUEST';
const EDIT_ORDER_SUCCESS = 'EDIT_ORDER_SUCCESS';
const EDIT_ORDER_ERROR = 'EDIT_ORDER_ERROR';

const DELETE_ORDER_REQUEST = 'DELETE_ORDER_REQUEST';
const DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS';
const DELETE_ORDER_ERROR = 'DELETE_ORDER_ERROR';

const initialState = {
  orders: [],
  status: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
    case ADD_ORDER_REQUEST:
    case EDIT_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        status: 'request',
      }

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        status: 'success',
        orders: action.payload,
      }

    case ADD_ORDER_SUCCESS:
    case EDIT_ORDER_SUCCESS:
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        status: 'success',
      }

    case GET_ORDERS_ERROR:
    case ADD_ORDER_ERROR:
    case EDIT_ORDER_ERROR:
    case DELETE_ORDER_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.error,
      }

    default:
      return state
  }
}

export const getOrders = (query = {}) => dispatch => {
  dispatch({ type: GET_ORDERS_REQUEST });
  const _query = qs.stringify(query);

  axios.get(`${apiRequestConstants.GET_ORDERS}?${_query}`)
    .then(response => {
      dispatch({
        type: GET_ORDERS_SUCCESS,
        payload: response.data,
      })
    })
    .catch(err => dispatch({
      type: GET_ORDERS_ERROR,
      error: err.message,
    }));
}

export const addOrder = ({ orderId, companyName, customerAddress, orderedItem } = {}) => dispatch => {
  dispatch({ type: ADD_ORDER_REQUEST });

  return new Promise((resolve, reject) => {
    axios.post(
      apiRequestConstants.CREATE_ORDER,
      {
        orderId,
        companyName,
        customerAddress,
        orderedItem,
      }
    )
      .then(response => {
        dispatch({
          type: ADD_ORDER_SUCCESS,
        });
        resolve();
      })
      .catch(err => {
        dispatch({
          type: ADD_ORDER_ERROR,
          error: err.message,
        });
        reject();
      });
  });
}

export const editOrder = (orderId, { companyName, customerAddress, orderedItem } = {}) => dispatch => {
  dispatch({ type: EDIT_ORDER_REQUEST });

  return new Promise((resolve, reject) => {
    axios.put(
      `${apiRequestConstants.UPDATE_ORDER}/${orderId}`,
      {
        ...(companyName && { companyName }),
        ...(customerAddress && { customerAddress }),
        ...(orderedItem && { orderedItem }),
      }
    )
      .then(response => {
        dispatch({
          type: EDIT_ORDER_SUCCESS,
        });
        resolve();
      })
      .catch(err => {
        dispatch({
          type: EDIT_ORDER_ERROR,
          error: err.message,
        });
        reject();
      });
  });
}

export const deleteOrder = (orderId) => dispatch => {
  dispatch({ type: DELETE_ORDER_REQUEST });

  return new Promise((resolve, reject) =>
    axios.delete(`${apiRequestConstants.DELETE_ORDER}/${orderId}`)
      .then(response => {
        dispatch({
          type: DELETE_ORDER_SUCCESS,
        });
        resolve();
      })
      .catch(err => {
        dispatch({
          type: DELETE_ORDER_ERROR,
          error: err.message,
        });
        reject();
      }));
}
