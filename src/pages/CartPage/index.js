import { useContext, useEffect } from 'react';
import { StoreContext } from '../../store';
import { ProductItem } from '../../components/ProductItem';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { ButtonIcon } from '../../components/ButtonIcon';

import { Link } from 'react-router-dom'
import * as types from '../../store/actions';
import './style.scss';

function CartPage({ history }) {
  const { state, dispatch } = useContext(StoreContext);

  const handleDelete = (id) => {
    dispatch({
      type: types.DELETE_FROM_CART,
      payload: {
        id
      }
    })
  }

  const handleClick = (quantity, product) => {
    const { id } = product;
    dispatch({
      type: types.EDIT_QUANTITY,
      payload: {
        quantity, id
      }
    })
  }

  const handleOrder = () => {
    dispatch({
      type: types.CLEAR_CART
    })
  }

  useEffect(() => {
    dispatch({
      type: types.INIT_CART,
    })
    dispatch({
      type: types.SYNC_FROM_LOCALSTORAGE,
    })
  }, [dispatch])

  const moveToProductPage = path => history.push(path)

  // const moveToOrderPage = path => history.push(path);

  return (
    <div className="cart">
      {state.cart !== null &&
        Object.keys(state.cart).length > 0 ?
        <>
          <ul className="cart__list">
            {Object.values(state.cart).map(product =>
              <ProductItem
                key={product.id}
                product={product}
                handleRoute={moveToProductPage}
              >
                <div className="counter">
                  <ButtonPrimary
                    className="counter__button"
                    onClick={() => handleClick(product.quantity - 1, product)}
                  >
                    -
                </ButtonPrimary>
                  <div className="counter__quantity">
                    x{product.quantity}
                  </div>
                  <ButtonPrimary
                    onClick={() => handleClick(product.quantity + 1, product)}
                    className="counter__button"
                  >
                    +
                </ButtonPrimary>
                </div>
                <ButtonIcon className="cart__btn--delete" onClick={() => { handleDelete(product.id) }} />
              </ProductItem>
            )}
          </ul>
          <div className="cart__options">
            <div className="cart__info">
              <span className="cart__info--text">Total amount:</span>
              <span className="cart__info--amount"> &#36; {state.amount}</span>
            </div>

            <Link
              to='/order'
              className="btn-primary cart__button--order"
              onClick={handleOrder}
            >
              Make order
            </Link>
          </div>
        </> :
        <p>here will be rendered the products</p>
      }
    </div >
  )
}

export {
  CartPage
}