import { useContext } from 'react';
import { StoreContext } from '../../store';
import { ButtonPrimary } from '../ButtonPrimary';
import * as types from '../../store/actions';

import './style.scss';

function Counter({ product }) {
  const { dispatch } = useContext(StoreContext);

  const handleClick = (quantity, product) => {
    const { id } = product;
    dispatch({
      type: types.EDIT_QUANTITY,
      payload: {
        quantity, id
      }
    })
  }
  return (
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
  )
}

export {
  Counter
}