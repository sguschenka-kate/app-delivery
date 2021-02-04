import { useContext, useEffect, useCallback } from 'react';
import { StoreContext } from '../../store';
import { Link } from 'react-router-dom';
import { ProductItem } from '../../components/ProductItem';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { ButtonSecondary } from '../../components/ButtonSecondary';

import { fetchService } from '../../api/fetchService';
import * as types from '../../store/actions';
import './style.scss';

function ProductsPage({ history, match }) {

  const { state, dispatch } = useContext(StoreContext);


  const handleClick = (product) => {
    dispatch({
      type: types.ADD_TO_CART,
      payload: {
        product
      }
    })
  }

  const fetchData = useCallback(async () => {
    const id = match.params.id || null;
    let products = id ? await fetchService.fetchProductsByCategory(id) : await fetchService.fetchProducts();
    console.log(products)
    dispatch({
      type: types.FETCH_PRODUCTS,
      payload: products,
    });
  }, [dispatch, match.params.id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const moveToProductPage = path => history.push(path)


  return (
    <div className="products">

      {state.products !== null &&
        Object.keys(state.products).length > 0 ?
        <>


          <ul className="products__list">
            {Object.values(state.products).map((product) =>
              <ProductItem
                product={product}
                key={product.id}
                handleRoute={moveToProductPage}
              >
                {state.cart[product.id] ?
                  <Link to="/cart" className="products__btn">
                    <ButtonSecondary className="products__btn--go-to-cart">
                      go to cart
                  </ButtonSecondary>
                  </Link> :
                  <ButtonPrimary onClick={() => handleClick(product)} className="products__btn">
                    buy
                </ButtonPrimary>
                }

              </ProductItem>
            )}
          </ul>
        </> :
        <p>Sorry, there are no products to be ordered...</p>
      }


    </div >
  )
}

export {
  ProductsPage
}