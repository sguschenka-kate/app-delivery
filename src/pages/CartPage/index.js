import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store';
import { ProductItem } from '../../components/ProductItem';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { ButtonIcon } from '../../components/ButtonIcon';
import { fetchService } from '../../api/fetchService';
import { Modal } from '../../components/Modal';

import * as types from '../../store/actions';
import './style.scss';

function CartPage({ history }) {
  const { state, dispatch } = useContext(StoreContext);
  const [modal, showModal] = useState(false);

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

  const handleOrder = async (e) => {
    if (state.user.name === null || state.user.surname === null || state.user.address === null) {
      showModal(true)
      return
    }
    await fetchService.makeOrder(state.cart, state.amount);
    dispatch({
      type: types.CLEAR_CART,
    })
    history.push('/order');
    e.preventDefault()
  }

  useEffect(() => {
    dispatch({
      type: types.INIT_CART,
    })
    dispatch({
      type: types.SYNC_FROM_LOCALSTORAGE,
    })
    setTimeout(() => {
      showModal(false)
    }, 4000)
  }, [dispatch, modal])

  const moveToProductPage = path => history.push(path)

  return (
    <div className="cart">
      {state.cart !== null &&
        Object.keys(state.cart).length > 0 ?
        <>
          {modal && <Modal className="cart__message" message="You must fill your profile!" />}
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

            <ButtonPrimary
              type="button"
              className="btn-primary cart__button--order"
              onClick={(e) => handleOrder(e)}
            >
              Make order
            </ButtonPrimary>
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