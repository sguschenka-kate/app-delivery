import "./style.scss";

function OrderItem({ order, className, handleRoute }) {

  return (
    <li
      className={`order-item ${className}`}
      onClick={() => handleRoute(`/orders/${order.id}`)}
    >
      <h3 className="order-item__order-id">
        Order # {order.id}
      </h3>
      <div className="order-item__info">
        <div className="order-item__amount">
          <span className="order-item__colored">Amount: </span>{order.amount} грн.
        </div>

        <div className="order-item__date">
          <span className="order-item__colored">Created: </span>{order.created_at}
        </div>
      </div>

    </li>
  )
}

export {
  OrderItem
}