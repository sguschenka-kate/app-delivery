import { useEffect, useState, useCallback, useMemo, useContext } from "react";
import { Map } from "../../components/Map";
import { StoreContext } from "../../store";

import "./style.scss";

function OrderFinalPage() {
  const { state } = useContext(StoreContext);
  const [marker, setMarker] = useState([]);

  const statusMessages = useMemo(
    () => [
      "Your order is accepted...",
      "Your order is being prepared...",
      "The courier is on the way...",
      `The order is delivered to the address "${state.user.address}". Bon appetit! 💛`,
    ],
    [state.user.address]
  );

  const [isShown, setShown] = useState(statusMessages[0]);

  const orderAccepted = useCallback(
    function () {
      setTimeout(() => {
        setShown(statusMessages[1]);
      }, 800);
      setTimeout(() => {
        setShown(statusMessages[2]);
      }, 1600);
      setTimeout(() => {
        setShown(statusMessages[3]);
      }, 3200);
    },
    [statusMessages]
  );

  useEffect(() => {
    setMarker({ lat: 50.46425108185003, lng: 30.49979118492588 });
    orderAccepted();
  }, [orderAccepted]);

  return (
    <div className="order-final">
      <div className="order-final__status">
        <p>Dear, {state.user.name}!</p>
        <p className="order-final__text">{isShown}</p>
      </div>
      <Map marker={marker} />
    </div>
  );
}

export { OrderFinalPage };
