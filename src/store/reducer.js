import * as types from './actions';

function productsReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_PRODUCTS: {
      const products = { ...payload };

      return {
        ...state,
        products
      }
    }

    case types.ADD_TO_CART: {

      if (state.cart.hasOwnProperty(payload.id)) {
        payload.quantity++
      }

      const cart = {
        ...state.cart,
        [payload.id]: payload
      };

      localStorage.setItem('cart', JSON.stringify(cart));

      return {
        ...state,
        cart
      }
    }

    case types.SYNC_FROM_LOCALSTORAGE: {
      console.log(state)
      const data = localStorage.getItem('cart');

      if (!data) {
        return state
      }

      return {
        ...state,
        cart: {
          ...state.cart,
          ...JSON.parse(data)
        }
      }
    }

    default:
      return state
  }
}

export {
  productsReducer
}