import { useContext } from "react";
import { Link } from 'react-router-dom';
import { StoreContext } from "../../store";
import * as types from '../../store/actions';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { ButtonSecondary } from '../../components/ButtonSecondary';


function ProductItemButtons({ product }) {
  const { state, dispatch } = useContext(StoreContext);

  const handleBuy = (product) => {
    dispatch({
      type: types.ADD_TO_CART,
      payload: {
        product
      }
    })
  }

  return (
    <div>
      {state.cart[product.id] ?
        <Link to="/cart" className="products__btn">
          <ButtonSecondary className="products__btn--go-to-cart">
            go to cart
            </ButtonSecondary>
        </Link> :
        <ButtonPrimary onClick={() => handleBuy(product)} className="products__btn">
          buy
          </ButtonPrimary>
      }
    </div>
  )
}

export {
  ProductItemButtons
}