import './style.scss';

function Category({ category }) {

  return (
    <li className="category">
      <img src={category.img} alt={category.name} className="category__img" />
      <div className="category__info">
        <h2 className="category__name">{category.name} — </h2>
        <span className="category__count">{category.product_count} Item</span>
      </div>
    </li>
  )
}

export {
  Category
}