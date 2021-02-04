import * as types from './actions';
import { exclude } from '../lib/exclude';

function productsReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_CATEGORIES: {
      const categories = payload;


      return {
        ...state,
        categories
      }
    }

    case types.FETCH_PRODUCTS: {
      const products = { ...payload };

      return {
        ...state,
        products
      }
    }

    case types.ADD_TO_CART: {
      const { product } = payload;
      const cart = {
        ...(state.cart || {}),
        [product.id]: {
          ...product,
          quantity: 1,
          totalAmount: +product.price,
        }
      };

      localStorage.setItem('cart', JSON.stringify(cart));

      let amount = +state.amount;
      amount = (+state.amount + +product.price).toFixed(2);
      localStorage.setItem('amount', JSON.stringify(amount))

      return {
        ...state,
        cart,
        amount
      }
    }

    case types.EDIT_QUANTITY: {

      const { quantity, id } = payload;

      let cart = {
        ...state.cart,
      }
      let amount = +state.amount;

      const target = cart[id];

      if (target) {
        target.quantity = quantity
      }

      cart[id] = target

      if (target.quantity === 0) {
        const data = exclude({ source: state.cart, key: id });
        cart = {
          ...data
        }
      } else {
        const totalAmount = +target.price * target.quantity;
        target.totalAmount = totalAmount;
      }

      amount = Object.values(cart).reduce((acc, current) => acc + +(current.totalAmount).toFixed(2), 0);

      localStorage.setItem('cart', JSON.stringify(cart));

      return {
        ...state,
        cart,
        amount
      }
    }

    case types.DELETE_FROM_CART: {
      const { id } = payload;
      const data = exclude({ source: state.cart, key: id });
      const amount = Number(state.amount - (state.cart[id].price * state.cart[id].quantity)).toFixed(2);

      const cart = {
        ...data
      };

      localStorage.setItem('amount', JSON.stringify(amount));

      localStorage.setItem('cart', JSON.stringify(cart));

      return {
        ...state,
        cart,
        amount
      }
    }

    case types.CLEAR_CART: {
      const cart = {}

      return {
        ...state,
        cart
      }
    }

    case types.SYNC_FROM_LOCALSTORAGE: {
      const data = localStorage.getItem('cart');
      let amount = +JSON.parse(localStorage.getItem('amount'));

      if (!data) {
        amount = 0;
        localStorage.setItem('amount', JSON.stringify(0))
        return state
      }

      return {
        ...state,
        cart: {
          ...state.cart,
          ...JSON.parse(data)
        },
        amount
      }
    }

    case types.CALC_AMOUNT: {
      const amount = Object.values(state.cart).reduce((acc, current) => acc + current.totalAmount, 0)
      localStorage.setItem('amount', JSON.stringify(amount));

      return {
        ...state,
        amount
      }
    }

    case types.SET_LOADING: {
      const isLoading = payload;

      return {
        ...state,
        isLoading
      }
    }

    case types.SEARCH_INPUT: {

      // let query = payload;

      return {
        ...state,
      }
    }

    default:
      return state
  }
}

export {
  productsReducer
}