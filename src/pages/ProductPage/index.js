import { useEffect, useState, useCallback } from 'react';
import { fetchService } from '../../api/fetchService';

import './style.scss';

function ProductPage({ match }) {
  const [currentProduct, setCurrentProduct] = useState(null);

  const id = match.params.id;
  const fetchData = useCallback(async (id) => {
    const product = await fetchService.fetchProduct(id);
    setCurrentProduct(product)
    return product
  }, [])

  console.log(currentProduct, 'ffff')

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
          // className="product__image"
          />
          <h1 className="product__name" >
            {currentProduct.name}
          </h1>
          <div className="product__rate">{currentProduct.rate}</div>
          <div className="product__time">{currentProduct.time} min</div>
          <div className="product__price">&#36; {currentProduct.price}</div>
          <div id="description" className="product__description" dangerouslySetInnerHTML={{ __html: currentProduct.description }} />
        </div>
      }
    </>
  )
}

export {
  ProductPage
}