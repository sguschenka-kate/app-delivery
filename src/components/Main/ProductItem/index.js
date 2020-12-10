
import "./style.scss";

function ProductItem(props) {
  const { type, id, name, time, rate, price, image } = props;
  

  return (
    <li className="product__item">
      <img src={image} className="product__image" alt={name} />
      <div className="product__info">
        <h3 className="product__name">
          { name }
        </h3>
        <div className="product__meta">
          <span className="product__meta-time">{ time }</span>
          <span className="product__meta-rank">{ rate }</span>
        </div>
        <div className="product__price">{ price }</div>
      </div>
    </li>
  )
}

export {
  ProductItem
}