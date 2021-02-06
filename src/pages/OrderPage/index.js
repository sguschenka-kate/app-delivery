import { useEffect, useState, useCallback, useMemo } from 'react';
import { Map } from '../../components/Map';

import './style.scss';

function OrderPage() {

  const [marker, setMarker] = useState([]);

  const statusMessages = useMemo(() => [
    'Your order is accepted...',
    'Your order is being prepared...',
    'The courier is on the way...',
    'The order is delivered. Bon appetit! 💛'
  ], []);

  const [isShown, setShown] = useState(statusMessages[0]);

  const orderAccepted = useCallback(function () {
    setTimeout(() => {
      setShown(statusMessages[1]);
    }, 2000);
    setTimeout(() => {
      setShown(statusMessages[2]);

    }, 4000);
    setTimeout(() => {
      setShown(statusMessages[3]);
    }, 6000)
  }, [statusMessages])

  useEffect(() => {
    setMarker({ lat: 50.46425108185003, lng: 30.49979118492588, });
    orderAccepted()
  }, [orderAccepted])

  return (
    <div className="order">
      <div className="order__status">

        {isShown}
      </div>
      <Map marker={marker} />
    </div >
  )
}

export {
  OrderPage
}