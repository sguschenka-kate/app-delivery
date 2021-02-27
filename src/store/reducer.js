import * as types from './actions';
import { exclude } from '../lib/exclude';

function productsReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case types.LOGIN_USER: {
      const user = {
        ...payload.user,
      };
      const token = payload.access_token;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));

      return {
        ...state,
        user,
        token
      }
    }

    case types.EDIT_USER: {
      const user = payload.user;

      localStorage.setItem('user', JSON.stringify(user));

      return {
        ...state,
        user
      }
    }

    case types.LOGOUT_USER: {
      const user = {};
      const token = null;
      const orders = [];

      localStorage.setItem('user', JSON.stringify({}));
      localStorage.setItem('token', JSON.stringify(null));


      return {
        ...state,
        user,
        token,
        orders
      }
    }


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

    case types.FETCH_ORDERS: {
      const orders = payload;

      return {
        ...state,
        orders
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

      amount = Object.values(cart).reduce((acc, current) => acc + current.totalAmount, 0);

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
      localStorage.setItem('cart', JSON.stringify(cart))
      localStorage.setItem('amount', JSON.stringify(0))

      return {
        ...state,
        cart
      }
    }

    case types.SYNC_FROM_LOCALSTORAGE: {
      const token = JSON.parse(localStorage.getItem('token'));
      const user = JSON.parse(localStorage.getItem('user'));
      const data = localStorage.getItem('cart');
      let amount = (+JSON.parse(localStorage.getItem('amount'))).toFixed(2);

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
        amount,
        token,
        user
      }
    }

    case types.INIT_CART: {
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

    default:
      return state
  }
}

export {
  productsReducer
}