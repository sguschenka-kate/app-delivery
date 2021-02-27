import { useCallback, useEffect, useState } from "react";
import { fetchService } from "../../api/fetchService";
import { ProductItem } from '../../components/ProductItem';
import './style.scss';

function OrderPage({ match, history }) {

  const [currentOrder, setCurrentOrder] = useState(null);

  const id = match.params.id;

  const fetchOrder = useCallback(async (id) => {
    const order = await fetchService.fetchOrder(id);
    setCurrentOrder(order);
    return order
  }, [])

  const moveToProductPage = path => history.push(path)

  useEffect(() => {
    fetchOrder(id)
  }, [fetchOrder, id])

  return (
    <div className="order">
      {currentOrder &&
        <>
          <h2 className="order__number">Order # {currentOrder.id} </h2>
          {Object.values(currentOrder.data).map(product =>
            <ProductItem
              product={product}
              key={product.id}
              handleRoute={moveToProductPage}
            />
          )}
          <div className="order__info">
            <div className="order-item__amount">
              <span className="order__colored">Total amount: </span>{currentOrder.amount} грн.
            </div>
            <div className="order-item__amount">
              <span className="order__colored">Created: </span>{currentOrder.created_at}
            </div>
          </div>
        </>
      }

    </div>
  )
}

export {
  OrderPage
}