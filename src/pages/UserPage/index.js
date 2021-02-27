import { useContext, useEffect, useState, useCallback } from "react";
import { Redirect } from 'react-router-dom';
import { StoreContext } from '../../store';
import * as types from '../../store/actions';
import { fetchService } from "../../api/fetchService";
import { ButtonSecondary } from '../../components/ButtonSecondary';
import { UserInfo } from '../../components/User/UserInfo';
import { UserForm } from '../../components/User/UserForm';
import { OrderHistory } from '../../components/OrderHistory';

import './style.scss';

function UserPage({ history }) {
  const { state, dispatch } = useContext(StoreContext);

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(state.user.name || '');
  const [surname, setSurname] = useState(state.user.surname || '');
  const [address, setAddress] = useState(state.user.address || null);

  const editUser = async () => {
    const user = await fetchService.editUser({ name, surname, address });

    dispatch({
      type: types.EDIT_USER,
      payload: {
        user
      }
    });
  }

  const handleEditModeOff = (e) => {
    editUser();
    setEditing(false);
    e.preventDefault();
  }

  const handleLogout = (e) => {
    dispatch({
      type: types.LOGOUT_USER,
    })
  }

  const fetchOrders = useCallback(async () => {
    const orders = await fetchService.fetchOrders();
    dispatch({
      type: types.FETCH_ORDERS,
      payload: orders
    })
  }, [dispatch])

  const moveToOrderPage = path => history.push(path);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders])

  return (
    <div>
      <form onSubmit={handleEditModeOff} className="user">

        {!editing
          ?
          <UserInfo handleEditModeOn={() => setEditing(true)} />
          :
          <UserForm
            handleEditModeOff={handleEditModeOff}
            handleName={(v) => setName(v)}
            handleSurname={(v) => setSurname(v)}
            handleAddress={(v) => setAddress(v)}
          />
        }

      </form >

      <OrderHistory
        className="user__order-history"
        moveToOrderPage={moveToOrderPage}
      />

      <ButtonSecondary
        onClick={(e) => handleLogout(e) && <Redirect push to='/auth' />}
        className="user__button--logout">Logout</ButtonSecondary>
    </div>
  )
}

export {
  UserPage
}