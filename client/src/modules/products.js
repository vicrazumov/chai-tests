import axios from 'axios';

import { GET_PRODUCTS } from './apiConstants';

const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';

const initialState = {
  products: [],
  status: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        status: 'request',
      }

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        status: 'success',
        products: action.payload,
      }

    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.error,
      }

    default:
      return state
  }
}

export const getProducts = () => dispatch => {
  dispatch({ type: GET_PRODUCTS_REQUEST });

  axios.get(GET_PRODUCTS)
    .then(response => {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: response.data,
      })
    })
    .catch(err => dispatch({
      type: GET_PRODUCTS_ERROR,
      error: err.message,
    }));
}
