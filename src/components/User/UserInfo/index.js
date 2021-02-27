import { useContext } from 'react';
import { StoreContext } from '../../../store';
import { ButtonPrimary } from '../../ButtonPrimary';

import '../style.scss';

function UserInfo({ handleEditModeOn }) {
  const { state } = useContext(StoreContext);

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

      </div>
    </div>
  )
}

export {
  UserInfo
}