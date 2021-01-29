
import { useContext } from "react";
import { StoreContext } from "../../store";
import * as types from "../../store/actions";
import "./style.scss";

function ProductItem({ product }) {

  const { dispatch } = useContext(StoreContext);

  const handleClick = () => {
    dispatch({
      type: types.ADD_TO_CART,
      payload: {
        ...product,
        quantity: 1
      }
    })
  }


  return (
    <li className="product__item">
      <img src={product.img} className="product__image" alt={product.name} />
      <div className="product__info">
        <h3 className="product__name">
          {product.name}
        </h3>
        <div className="product__meta">
          <span className="product__meta-time">{product.time} min</span>
          <span className="product__meta-rank">
            <img src="/img/star.svg" alt="Star" className="product__meta-rank-image" aria-hidden="true" />
            {product.rate}
          </span>
        </div>
        <div className="product__price">&#36; {product.price}</div>
      </div>

      <button className="product__btn" onClick={handleClick}>
        BUY
        </button>
    </li>
  )
}

export {
  ProductItem
}