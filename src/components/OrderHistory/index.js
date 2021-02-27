import { useContext } from 'react';
import { OrderItem } from '../../components/OrderItem';
import { StoreContext } from '../../store';

import './style.scss';

function OrderHistory({ className, moveToOrderPage }) {

  const { state } = useContext(StoreContext);
  console.log(state.orders)
  return (
    <div className={`order-history ${className}`}>
      <h3 className="order-history__name">
        My Orders
        </h3>
      <ul className="order-history__list">
        {state.orders && Object.keys(state.orders).length > null ?
          Object.values(state.orders).map(order =>
            <OrderItem
              order={order}
              key={order.id}
              handleRoute={moveToOrderPage}
            />
          ) :
          <p>You don't have any orders yet 🍩</p>
        }


      </ul>
    </div>
  )
}

export {
  OrderHistory
}