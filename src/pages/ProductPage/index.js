import { useEffect, useState, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchService } from '../../api/fetchService';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { ButtonSecondary } from '../../components/ButtonSecondary';
import { StoreContext } from '../../store';
import * as types from '../../store/actions';

import './style.scss';

function ProductPage({ match }) {
  const { state, dispatch } = useContext(StoreContext);
  const [currentProduct, setCurrentProduct] = useState(null);

  const id = match.params.id;
  const fetchData = useCallback(async (id) => {
    const product = await fetchService.fetchProduct(id);
    setCurrentProduct(product)
    return product
  }, [])

  const handleClick = (product) => {
    dispatch({
      type: types.ADD_TO_CART,
      payload: {
        product
      }
    })
  }

  useEffect(() => {
    fetchData(id);
  }, [fetchData, id])

  return (
    <>
      {currentProduct &&
        <div className="product">
          <img
            src={currentProduct.img}
            alt={currentProduct.name}
            className="product__image"
          />
          <h1 className="product__name" >
            {currentProduct.name}
          </h1>
          <div className="product__info-container">
            <div className="product__info">
              <div className="product__meta">
                <div className="product__meta--rate">{currentProduct.rate}</div>
                <img src="/img/star.svg" alt="Star" className="product__meta--rate-image" aria-hidden="true" />
              </div>
              <div className="product__time">{currentProduct.time} min</div>
            </div>
            <div className="product__price">&#36; {currentProduct.price}</div>
            {state.cart[currentProduct.id] ?
              <Link to="/cart" className="products__btn">
                <ButtonSecondary className="products__btn--go-to-cart">
                  go to cart
                  </ButtonSecondary>
              </Link> :
              <ButtonPrimary onClick={() => handleClick(currentProduct)} className="products__btn">
                buy
                </ButtonPrimary>}
          </div>
          <div id="description" className="product__description" dangerouslySetInnerHTML={{ __html: currentProduct.description }} />

        </div>

      }
    </>
  )
}

export {
  ProductPage
}