import { ProductItem } from "../ProductItem";
import "./style.scss";

function ProductList() {
  return (
    <ul className="product__list">
      <ProductItem />
    </ul>
  )
}

export {
  ProductList
}