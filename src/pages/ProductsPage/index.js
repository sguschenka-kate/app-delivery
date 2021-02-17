import { useContext, useEffect, useCallback } from 'react';
import { StoreContext } from '../../store';
import { ProductItemButtons } from '../../components/ProductItemButtons';
import { ProductItem } from '../../components/ProductItem';

import { fetchService } from '../../api/fetchService';
import * as types from '../../store/actions';
import './style.scss';

function ProductsPage({ history, match }) {

  const { state, dispatch } = useContext(StoreContext);

  const fetchData = useCallback(async () => {
    const id = match.params.id || null;
    let products = id ? await fetchService.fetchProductsByCategory(id) : await fetchService.fetchProducts();

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
                <ProductItemButtons product={product} />
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