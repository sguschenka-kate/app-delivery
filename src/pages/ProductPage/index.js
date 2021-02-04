import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store';

import './style.scss';

function ProductPage({ match }) {
  const [currentProduct, setCurrentProduct] = useState(null);
  const { state } = useContext(StoreContext);

  const id = match.params.id;

  useEffect(() => {
    setCurrentProduct(state.products[id])
  }, [id, state.products])

  return (
    <>
      {currentProduct !== null &&
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
          <div className="product__description">{currentProduct.description}</div>
        </div>
      }
    </>
  )
}

export {
  ProductPage
}