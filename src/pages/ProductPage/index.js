import { useEffect, useState, useCallback } from 'react';
import { fetchService } from '../../api/fetchService';

import { ProductItemButtons } from '../../components/ProductItemButtons';

import './style.scss';

function ProductPage({ match }) {
  const [currentProduct, setCurrentProduct] = useState(null);

  const id = match.params.id;
  const fetchData = useCallback(async (id) => {
    const product = await fetchService.fetchProduct(id);
    setCurrentProduct(product)
    return product
  }, [])

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
            <ProductItemButtons product={currentProduct} />
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