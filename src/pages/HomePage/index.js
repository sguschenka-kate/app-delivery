import { useCallback, useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store';


import { ProductItem } from '../../components/ProductItem';
import { Loader } from '../../components/Loader';

import { fetchService } from '../../api/fetchService';
import * as types from '../../store/actions';


import './style.scss';

function HomePage({ history }) {
  const [isLoading, setLoading] = useState(true);
  const { state, dispatch } = useContext(StoreContext);

  const fetchData = useCallback(async () => {
    const products = await fetchService.fetchProducts();
    dispatch({
      type: types.FETCH_PRODUCTS,
      payload: products,
    });
  }, [dispatch]);

  useEffect(() => {
    fetchData();
    setTimeout(() => setLoading(false), 1500)
  }, [fetchData])

  return (
    <div className="main">
      {isLoading && <Loader />}

      {!isLoading && state.products !== null && <>
        {Object.keys(state.products).length > 0 ?
          <ul className="product__list">
            {Object.values(state.products).map((product) =>
              <ProductItem
                product={product}
                key={product.id}
              />
            )}
          </ul> :
          <p>Sorry, there are no products to be ordered...</p>
        }
      </>}


    </div>
  )
}

export {
  HomePage
}