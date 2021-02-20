import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { StoreContext } from '../../../store';
import * as types from '../../../store/actions';
import { ButtonPrimary } from '../../ButtonPrimary';
import { ButtonSecondary } from '../../ButtonSecondary';

import '../style.scss';

function UserInfo({ handleEditModeOn }) {
  const { state, dispatch } = useContext(StoreContext);

  const handleLogout = (e) => {
    dispatch({
      type: types.LOGOUT_USER,
    })
    e.preventDefault()
  }

  return (
    <div className="user__container">
      <fieldset className="user__field">
        <label className="user__field-label">Name:</label>
        <span className="user__field-name">{state.user.name}</span>
      </fieldset>
      <fieldset className="user__field">
        <label className="user__field-label">Surname:</label>
        <span className="user__field-surname">{state.user.surname}</span>
      </fieldset>
      <fieldset className="user__field">
        <label className="user__field-label">Address:</label>
        <span className="user__field-address">{state.user.address}</span>
      </fieldset>

      <div className="user__actions">
        <ButtonPrimary
          onClick={handleEditModeOn}
          className="user__field-button">Edit</ButtonPrimary>
        <ButtonSecondary
          onClick={(e) => handleLogout(e) && <Redirect push to='/auth' />}
          className="user__field-button">Logout</ButtonSecondary>
      </div>
    </div>
  )
}

export {
  UserInfo
}