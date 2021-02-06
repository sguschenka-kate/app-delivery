import { makeEndForItem } from '../../lib/makeEndForItem';

import './style.scss';

function Category({ category }) {

  const item = makeEndForItem(category.product_count);

  return (
    <li className="category">
      <div className="category__img-wrapper">

        <img src={category.img} alt={category.name} className="category__img" />
      </div>
      <div className="category__info">
        <h2 className="category__name">{category.name}</h2>
        <span className="category__count">{category.product_count} {item}</span>
      </div>
    </li>
  )
}

export {
  Category
}